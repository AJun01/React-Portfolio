/**
 * ALPHA-B34-PROD-001 — "For That Bottle of Sparkling Water"
 *
 * Structured storyboard sourced from `src/assets/noir/ALPHA-B34-PROD-001/view_storyboard.html`.
 * Consumed by the AAV feature card's filmstrip component to demonstrate Bible × AAV
 * canon continuity across a real production's scenes × shots.
 *
 * @typedef {{
 *   id: number,
 *   file: string,          // relative path inside ALPHA-B34-PROD-001/
 *   framing: string,       // shot size, e.g. WS / MS / MCU / CU / ECU
 *   move: string,          // camera move, e.g. Static / Dolly / Pan / Tilt / Handheld / Truck
 * }} Shot
 *
 * @typedef {{
 *   id: string,
 *   slugline: string,
 *   continuity: "cut" | "continuous",
 *   shots: Shot[]
 * }} Scene
 */

// Webpack context loader — resolves every shot_XX.png under ALPHA-B34-PROD-001/
// and exposes them as a `{ "SC_01/shot_01.png": <hashed-url>, ... }` map.
/* eslint-disable-next-line no-undef */
const shotsContext = require.context(
  "../../assets/noir/ALPHA-B34-PROD-001",
  true,
  /shot_\d+\.png$/
);

/** @type {Record<string, string>} */
export const SHOT_SRC = Object.fromEntries(
  shotsContext.keys().map((k) => [k.replace(/^\.\//, ""), shotsContext(k)])
);

/** @type {{ id: string, title: string, scenes: Scene[] }} */
export const storyboard = {
  id: "ALPHA-B34-PROD-001",
  title: "For That Bottle of Sparkling Water",
  scenes: [
    {
      id: "SC_01",
      slugline: "INT. ART'S BEDROOM — DAY",
      continuity: "cut",
      shots: [
        { id: 1, file: "SC_01/shot_01.png", framing: "WS", move: "Dolly" },
        { id: 2, file: "SC_01/shot_02.png", framing: "CU", move: "Static" },
        { id: 3, file: "SC_01/shot_03.png", framing: "MS", move: "Tilt" },
        { id: 4, file: "SC_01/shot_04.png", framing: "MCU", move: "Handheld" },
      ],
    },
    {
      id: "SC_02",
      slugline: "EXT. FARMLAND ROAD — DAY",
      continuity: "cut",
      shots: [
        { id: 1, file: "SC_02/shot_01.png", framing: "WS", move: "Dolly" },
        { id: 2, file: "SC_02/shot_02.png", framing: "MS", move: "Static" },
        { id: 3, file: "SC_02/shot_03.png", framing: "CU", move: "Truck" },
      ],
    },
    {
      id: "SC_03",
      slugline: "EXT. TOWN CENTER — HANDCRAFT SHOP — DAY",
      continuity: "continuous",
      shots: [
        { id: 1, file: "SC_03/shot_01.png", framing: "WS", move: "Dolly" },
        { id: 2, file: "SC_03/shot_02.png", framing: "MS", move: "Pan" },
        { id: 3, file: "SC_03/shot_03.png", framing: "CU", move: "Handheld" },
        { id: 4, file: "SC_03/shot_04.png", framing: "MCU", move: "Static" },
      ],
    },
    {
      id: "SC_04",
      slugline: "EXT. TOWN CENTER — LIQUOR STORE — DAY",
      continuity: "continuous",
      shots: [
        { id: 1, file: "SC_04/shot_01.png", framing: "WS", move: "Static" },
        { id: 2, file: "SC_04/shot_02.png", framing: "MS", move: "Dolly" },
        { id: 3, file: "SC_04/shot_03.png", framing: "MCU", move: "Tilt" },
        { id: 4, file: "SC_04/shot_04.png", framing: "CU", move: "Static" },
      ],
    },
    {
      id: "SC_05",
      slugline: "EXT. FARMLAND ROAD — LATER",
      continuity: "cut",
      shots: [
        { id: 1, file: "SC_05/shot_01.png", framing: "WS", move: "Dolly" },
        { id: 2, file: "SC_05/shot_02.png", framing: "MS", move: "Static" },
        { id: 3, file: "SC_05/shot_03.png", framing: "CU", move: "Static" },
        { id: 4, file: "SC_05/shot_04.png", framing: "WS", move: "Handheld" },
        { id: 5, file: "SC_05/shot_05.png", framing: "MCU", move: "Static" },
        { id: 6, file: "SC_05/shot_06.png", framing: "MS", move: "Static" },
      ],
    },
    {
      id: "SC_06",
      slugline: "INT. ART'S BEDROOM — AFTERNOON",
      continuity: "cut",
      shots: [
        { id: 1, file: "SC_06/shot_01.png", framing: "WS", move: "Static" },
        { id: 2, file: "SC_06/shot_02.png", framing: "MCU", move: "Dolly" },
        { id: 3, file: "SC_06/shot_03.png", framing: "MS", move: "Handheld" },
        { id: 4, file: "SC_06/shot_04.png", framing: "CU", move: "Static" },
        { id: 5, file: "SC_06/shot_05.png", framing: "MS", move: "Dolly" },
        { id: 6, file: "SC_06/shot_06.png", framing: "ECU", move: "Static" },
      ],
    },
  ],
};

export default storyboard;
