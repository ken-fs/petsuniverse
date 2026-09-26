// Adsterra ad units — single source of truth.
//
// The dashboard's "GET CODE" hands you a classic Banner snippet:
//   atOptions = { key: '…', format: 'iframe', height: 90, width: 728, params: {} }
//   <script src="//bauval.org/…/invoke.js"></script>
// Only the key and the size matter here; the component rebuilds the rest.
//
// A slot with an empty key renders nothing, so this file is safe to ship before
// a unit is approved — ads appear only once the key is filled in.

export type AdSlot = {
  key: string;
  width: number;
  height: number;
};

/** Adsterra's invoke.js host. Taken from the GET CODE snippet verbatim. */
export const INVOKE_HOST = "bauval.org";

/** 728×90 leaderboard. Desktop only — it overflows phones. */
export const LEADERBOARD: AdSlot = {
  key: "13f5f745de353b152721e5703a240997",
  width: 728,
  height: 90,
};

/** 300×250 rectangle. Fits every viewport. */
export const RECTANGLE: AdSlot = {
  key: "64d70ba5acc490f105359e59521a4244",
  width: 300,
  height: 250,
};
