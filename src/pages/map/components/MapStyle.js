export const zonesStyle = {
  id: "zones",
  type: "line",
  source: "zones",
  paint: {
    "line-color": "black",
    "line-width": 2,
  },
};

export const restrictionsStyle = {
  id: "lineLayer",
  type: "line",
  source: "restrictions",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "rgba(3, 170, 238, 0.5)",
    "line-width": 5,
  },
};

export const restrictionsTextStyle = {
  id: "symbols",
  type: "symbol",
  source: "restrictions",
  layout: {
    "symbol-placement": "line",
    "text-font": ["Open Sans Regular"],
    "text-field": "{restriktionstekst}",
    "text-size": 20,
    "text-allow-overlap": true,
  },
};
