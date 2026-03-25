import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { PINNED, HIDDEN, LANG_COLORS } from './pinnedRepos';
import styles from './ProjectsPanel.module.css';

const GH_USER = 'AJun01';
const GH_API  = 'https://api.github.com';

// Fix relative image/link paths in README markdown to use raw GitHub URLs
function fixMarkdownUrls(markdown, repoName, branch = 'main') {
  const rawBase = `https://raw.githubusercontent.com/${GH_USER}/${repoName}/${branch}`;
  const htmlBase = `https://github.com/${GH_USER}/${repoName}/blob/${branch}`;
  return markdown
    // ![alt](relative/path)
    .replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_, alt, path) =>
      `![${alt}](${rawBase}/${path.replace(/^\.?\//, '')})`)
    // [text](relative/path) — non-image links → github blob
    .replace(/\[([^\]]*)\]\((?!https?:\/\/)(?!!)(#[^)]+|[^)]+)\)/g, (_, text, path) => {
      if (path.startsWith('#')) return `[${text}](${path})`; // anchor links stay
      return `[${text}](${htmlBase}/${path.replace(/^\.?\//, '')})`;
    });
}

// Inline GitHub SVG icon
function GhIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.ghIcon} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-1.93c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.06.78 2.13v3.17c0 .3.2.66.79.55C20.21 21.41 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

// Sort: PINNED first (in order), then rest by updated_at desc
function sortRepos(repos) {
  const pinnedSet = new Set(PINNED);
  const pinned = PINNED
    .map((name) => repos.find((r) => r.name === name))
    .filter(Boolean);
  const rest = repos
    .filter((r) => !pinnedSet.has(r.name))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  return [...pinned, ...rest];
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'today';
  if (d < 30) return `${d}d ago`;
  const m = Math.floor(d / 30);
  if (m < 12) return `${m}mo ago`;
  return `${Math.floor(m / 12)}y ago`;
}

export default function ProjectsPanel({ isVisible, panelStyle }) {
  const [repos,       setRepos]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [selected,    setSelected]    = useState(null);  // repo object
  const [readme,      setReadme]      = useState('');
  const [readmeLoad,  setReadmeLoad]  = useState(false);
  const [readmeFade,  setReadmeFade]  = useState(true);
  const readmeCache = useRef(new Map());

  // Fetch repo list on mount
  useEffect(() => {
    fetch(`${GH_API}/users/${GH_USER}/repos?per_page=100&sort=updated`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = Array.isArray(data)
          ? data.filter((r) => !HIDDEN.has(r.name))
          : [];
        const sorted = sortRepos(filtered);
        setRepos(sorted);
        setLoading(false);
        if (sorted.length > 0) setSelected(sorted[0]);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch README when selected repo changes
  const loadReadme = useCallback(async (repo) => {
    if (!repo) return;
    if (readmeCache.current.has(repo.name)) {
      setReadmeFade(false);
      setTimeout(() => {
        setReadme(readmeCache.current.get(repo.name));
        setReadmeFade(true);
      }, 120);
      return;
    }
    setReadmeLoad(true);
    setReadmeFade(false);
    try {
      // Try main branch first, fallback to master
      let res = await fetch(`${GH_API}/repos/${GH_USER}/${repo.name}/readme`);
      if (!res.ok) {
        res = await fetch(`${GH_API}/repos/${GH_USER}/${repo.name}/readme?ref=master`);
      }
      if (!res.ok) throw new Error('no readme');
      const json = await res.json();
      // Properly decode UTF-8 (atob alone mangles multi-byte chars like Chinese)
      const binaryStr = atob(json.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      const raw = new TextDecoder('utf-8').decode(bytes);
      const branch = json.url.includes('/master/') ? 'master' : 'main';
      const fixed  = fixMarkdownUrls(raw, repo.name, branch);
      readmeCache.current.set(repo.name, fixed);
      setTimeout(() => {
        setReadme(fixed);
        setReadmeFade(true);
        setReadmeLoad(false);
      }, 120);
    } catch {
      const placeholder = `# ${repo.name}\n\n> [ NO README FOUND ]`;
      readmeCache.current.set(repo.name, placeholder);
      setTimeout(() => {
        setReadme(placeholder);
        setReadmeFade(true);
        setReadmeLoad(false);
      }, 120);
    }
  }, []);

  useEffect(() => { loadReadme(selected); }, [selected, loadReadme]);

  const isPinned = (name) => PINNED.includes(name);

  return (
    <section className={styles.panel} style={panelStyle} aria-label="Projects">

      {/* ── LEFT: project list ──────────────────────────────────── */}
      <div className={`${styles.leftCol}${isVisible ? ` ${styles.leftColActive}` : ''}`}>
        <div className={styles.listHeader}>
          <span className={styles.listTitle}>[ MISSION ARCHIVE ]</span>
          <span className={styles.listCount}>
            {loading ? '…' : `${repos.length} REPOS`}
          </span>
        </div>

        <div className={styles.repoList}>
          {loading && (
            <p className={styles.loadingMsg}>FETCHING REPOSITORIES…</p>
          )}
          {repos.map((repo, idx) => {
            const isActive = selected?.name === repo.name;
            const langColor = LANG_COLORS[repo.language] ?? LANG_COLORS.default;
            return (
              <button
                key={repo.name}
                className={`${styles.repoCard}${isActive ? ` ${styles.repoCardActive}` : ''}${
                  isVisible ? ` ${styles.repoCardVisible}` : ''
                }`}
                style={{ transitionDelay: isVisible ? `${idx * 0.04}s` : '0s' }}
                onClick={() => setSelected(repo)}
                aria-pressed={isActive}
              >
                <div className={styles.repoTop}>
                  <span className={styles.repoName}>
                    {isPinned(repo.name) && (
                      <span className={styles.pinStar} aria-label="pinned">★</span>
                    )}
                    {repo.name}
                  </span>
                  {repo.stargazers_count > 0 && (
                    <span className={styles.repoStars}>⭐ {repo.stargazers_count}</span>
                  )}
                </div>
                {repo.description && (
                  <p className={styles.repoDesc}>{repo.description}</p>
                )}
                <div className={styles.repoMeta}>
                  {repo.language && (
                    <span className={styles.repoLang}>
                      <span
                        className={styles.langDot}
                        style={{ background: langColor }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.repoDate}>{timeAgo(repo.updated_at)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: README viewer ────────────────────────────────── */}
      <div className={`${styles.rightCol}${isVisible ? ` ${styles.rightColActive}` : ''}`}>
        {selected && (
          <div className={styles.readmeHeader}>
            <span className={styles.readmeTitle}>{selected.name}</span>
            <a
              href={selected.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghLink}
              aria-label={`Open ${selected.name} on GitHub`}
            >
              <GhIcon /> GITHUB
            </a>
          </div>
        )}

        <div
          className={`${styles.readmeScroll} ${readmeFade ? styles.readmeFadeIn : styles.readmeFadeOut}`}
        >
          {readmeLoad && (
            <p className={styles.loadingMsg}>LOADING README…</p>
          )}
          {!readmeLoad && readme && (
            <div className={styles.markdownBody}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {readme}
              </ReactMarkdown>
            </div>
          )}
          {!readmeLoad && !readme && !loading && (
            <p className={styles.loadingMsg}>SELECT A PROJECT</p>
          )}
        </div>
      </div>

      {/* Label strip */}
      <div className={styles.labelStrip}>
        <span className={styles.labelText}>[ RECORD 05 · PROJECTS ]</span>
      </div>
    </section>
  );
}
