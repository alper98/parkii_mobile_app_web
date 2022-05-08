export const zonesStyle = {
  id: "zones",
  type: "line",
  source: "zones",
  paint: {
    "line-color": "black",
    "line-width": 0.75,
  },
};

export const zonesTextStyle = {
  id: "symbols",
  type: "symbol",
  source: "zones",
  layout: {
    "text-field": ["get", "beskrivelse"],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": 0.5,
    "text-justify": "auto",
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
  id: "restrictions",
  type: "symbol",
  source: "restrictions",
  layout: {
    "symbol-placement": "line",
    "text-font": ["Open Sans Regular"],
    "text-field": ["get", "restriktionstekst"],
    "text-size": 20,
    "text-allow-overlap": true,
  },
};
