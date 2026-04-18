# Aegis Asset Vault (AAV)

影视级视觉一致性微服务系统 —— API-First 主数据管理 (MDM)，解决 AI 视频大模型（Veo、Sora 等）“无状态”导致的物理穿帮问题（角色融化、服装突变、空间瞬移、道具形变）。

- **设计哲学**：复刻好莱坞片场美术部门 SOP，将角色特征、服装层级、场景陈设、道具清单转化为**参数化文本基因**与**结构化视觉锚点**。
- **纯粹性原则**：本库**禁止**导入任何 LLM/视频生成/图像生成 SDK，仅为“数据组装工厂”。
- **部署形态**：独立 FastAPI 服务 + `aav-ctl` 命令行客户端，供 Backlot Alpha 等制片管线通过 HTTP 调用。

---

## 安装

```bash
cd aegis_asset_vault
pip install -e .
# 或
pip install -r requirements.txt
```

安装后可使用全局命令 `aav-ctl`（需先启动 AAV 服务）。

---

## 快速开始

### 1. 启动 AAV 服务

```bash
cd aegis_asset_vault
uvicorn aegis_asset_vault.api.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 注入示例资产

```bash
aav-ctl apply -f examples/char_art_v1.yaml
aav-ctl apply -f examples/env_art_bedroom_v1.yaml
```

### 3. 查询资产

```bash
aav-ctl get characters
aav-ctl get environments
aav-ctl get props --env env_art_bedroom_v1
```

### 4. 解析 Prompt（调试）

```bash
aav-ctl resolve --shot CU --chars char_art_v1 --env env_art_bedroom_v1 \
  --action "Art smashes the blue bottle on the nightstand." \
  --cues "jawline tightens, eyes narrow"
```

---

## 核心 API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/assets/character` | 注入角色资产 |
| POST | `/api/v1/assets/environment` | 注入环境资产 |
| POST | `/api/v1/assets/resolve` | **动态 Prompt 裁决**（景别权重、道具碰撞、防火墙合并） |
| GET  | `/api/v1/assets/characters` | 列出角色 |
| GET  | `/api/v1/assets/environments` | 列出环境 |
| GET  | `/api/v1/assets/props?env_id=` | 指定场景道具清单 |

### Resolve 请求体示例

```json
{
  "character_ids": ["char_art_v1"],
  "environment_id": "env_art_bedroom_v1",
  "shot_type": "CU",
  "director_action": "Art smashes the blue bottle on the nightstand.",
  "acting_cues": "jawline tightens, eyes narrow"
}
```

返回：`prompt`（装配后的 Veo 正向 Prompt）、`negative_prompt`（合并排他词）、`reference_image_urls`（当前景别推荐参考图 URL）。

---

## 数据契约（YAML）

- **CharacterAsset**：`metadata`、`base_dna`、`facial_features`、`layered_clothing`、`color_palette`、`hard_negative_prompt`、`visual_anchors`（front_orthographic、expression_sheet 等）。
- **EnvironmentAsset**：`metadata`、`spatial_logic`、`set_dressing`、`props_inventory`（prop_id、description、material、color）、`hard_negative_prompt`、`spatial_anchors`（concept_art、floor_plan、movement_guide）。

详见 `examples/char_art_v1.yaml` 与 `examples/env_art_bedroom_v1.yaml`。

---

## Resolve 引擎规则摘要

1. **景别权重路由**：`CU/ECU` 拉高面部与微表情权重，丢弃鞋裤/环境大轮廓；`WS/ELS` 丢弃面部与 acting_cues，拉满 set_dressing 与 layered_clothing。
2. **道具碰撞检测**：根据 `director_action` 关键词匹配 `props_inventory`，命中则将该道具描述带权重插入 Prompt。
3. **防火墙合并**：角色 + 环境的 `hard_negative_prompt` 取并集。
4. **多角色**：多个 `character_ids` 时使用句法隔离（"Art is ... Meanwhile, Uma is ..."）。

---

## 与 Backlot Alpha 集成

Backlot Alpha 的摄影师（Cinematographer）或下游 Veo 调用方，可将当前镜头的角色 ID、环境 ID、景别、导演动作、表演提示传入 `POST /api/v1/assets/resolve`，将返回的 `prompt` 与 `negative_prompt` 用于 Veo 生成，并用 `reference_image_urls` 选取首帧/参考图，以保持视觉一致性。

---

## V2.0：语义路由与图谱连戏（可选）

在 V1 确定性 YAML 契约之上，V2 引入 **LlamaIndex + Qdrant** 混合检索与 **Neo4j** 图谱连戏引擎。

### 启动 V2 基建（Docker Compose）

```bash
cd aegis_asset_vault
docker-compose up -d
# 设置环境变量后启动 AAV 服务
export QDRANT_URL=http://localhost:6333
export NEO4J_URI=bolt://localhost:7687
export NEO4J_PASSWORD=aav-neo4j-dev
uvicorn aegis_asset_vault.api.main:app --host 0.0.0.0 --port 8000
```

### V2 行为摘要

- **环境注入**：`POST /assets/environment` 时自动将 `props_inventory` 灌入 Qdrant（向量 + metadata 含 `visual_anchor_url`），并在 Neo4j 中初始化环境/道具节点。
- **Resolve 管道**：① **图谱探查**：根据动作中的表面词（如 nightstand）查询 Neo4j，召回「连戏遗留物」并写入 Prompt。② **语义命中**：用混合检索（Dense + 关键词）解析 `director_action`（如 "azure flask" → 锁定 cobalt-blue bottle），提取垫图 URL。③ **景别装配**：与 V1 一致。④ 若动作匹配 "places/puts X on Y"，则更新图谱边 `(prop)-[:located_on]->(surface)`。
- **连戏极限测试**：`tests/test_continuity_v2.py` — 先执行「Art places the blue bottle on the nightstand.」，再执行「The camera pans across the dusty nightstand.»（无道具名），断言 Prompt 中出现瓶子描述。

---

## V2.1：云原生与存算分离

四大存储基建，引擎**绝对无状态**：可随时 `docker kill` 并重启，数据不丢失。

### 四大基建（docker-compose 一键拉起）

本目录下 `docker-compose up -d` 仅启动 AAV + 四大存储。**与 Backlot Alpha 统一编排**（同一网络、Backlot 依赖 AAV 健康后启动）见仓库根目录 **[../docker-compose.yml](../docker-compose.yml)**。

| 组件 | 用途 |
|------|------|
| **MinIO** (S3 兼容) | 4K 垫图、三视图、概念图等二进制重型资产；仅 s3:// URI 或预签名 URL 流通 |
| **PostgreSQL** | 角色/环境 YAML 结构化数据（衣服、硬性防幻觉词、颜色 Hex） |
| **Qdrant** | 道具/环境 Embedding，LlamaIndex 混合检索 |
| **Neo4j** | 实体-空间连戏拓扑图 |

### aav-ctl apply 入库逻辑（V2.1）

1. **本地资源扫描**：解析 YAML，发现 `visual_anchor: ./local_assets/blue_bottle.png` 等本地路径。
2. **直传 MinIO**：CLI 将图片转为字节流，通过 boto3 上传至 `aav-assets` Bucket。
3. **URI 替换**：YAML 内存对象中的本地路径替换为 `s3://aav-assets/props/env_bedroom/blue_bottle_v1.png`。
4. **全量 JSON 下发**：将含 s3:// 的 Payload POST 到 FastAPI，落库 PostgreSQL，并触发 Qdrant/Neo4j 索引。

使用 `--skip-upload` 可跳过上传（仅用已有 s3:// 或本地路径）。CLI 需配置 `MINIO_ENDPOINT`、`MINIO_ACCESS_KEY`、`MINIO_SECRET_KEY`、`MINIO_BUCKET`。

### Resolve 与预签名 URL

- 引擎从 DB/向量/图中取出命中的垫图链接（s3://...）。
- 调用 MinIO SDK 生成** 1 小时有效**的预签名 HTTP URL。
- 返回给下游的 `reference_image_urls` 为可直接喂给 Veo 的 HTTP 链接。

### S3 兼容与性能

- 图片上传/下载与预签名均使用 **boto3** 标准接口，改配置即可切换阿里云 OSS 或 AWS S3。
- `/resolve` 在并发执行图谱查询、向量比对和 S3 签名时，通过连接池与批量预签名控制在 **500ms** 内响应，不拖累 Backlot 主管线。

---

## 验收标准（本库满足）

- 纯粹性：无 LLM/视频/图像生成 SDK。
- 多资产并行：`/resolve` 支持多 `character_ids`，句法隔离。
- 隔离部署：独立 FastAPI 服务，可被其他项目 HTTP 调用。
- **V2.1 无状态**：业务数据仅存于 MinIO / PostgreSQL / Qdrant / Neo4j，重启不丢数据。
- **V2.1 S3 兼容**：boto3 标准接口，可切换 OSS/S3。
- **V2.1 性能**：/resolve 目标 500ms 内（连接池 + 批量预签名）。
