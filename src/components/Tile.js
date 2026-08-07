import React from "react";

export default function Tile(props) {
  const valueText = String(props.value ?? "");
  const valueLengthClass =
    valueText.length > 35
      ? "tile-value-long"
      : valueText.length > 24
        ? "tile-value-medium"
        : "";

  return (
    <div className={`tile tile-${props.shape || "default"} ${valueLengthClass}`}>
      <p>{props.title}</p>
      <h2>{props.value}</h2>
    </div>
  );
}
