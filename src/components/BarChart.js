import React from "react";
import Plot from "react-plotly.js";

function BarChart({ data, category, titleCategory }) {
  return (
    <Plot
      data={[
        {
          x: data.map((item) => item.name),

          y: data.map((item) => {
            return item[category] !== "unknown" ? item[category] : "0";
          }),
          type: "bar",
        },
      ]}
      layout={{ title: "Planet " + titleCategory, width: "1000" }}
    />
  );
}

export default BarChart;
