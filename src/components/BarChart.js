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
      layout={{
        title: {
          text: "Planet " + titleCategory,
          font: {
            color: "#fff",
          },
        },
        width: "1200",
        paper_bgcolor: "rgba(0,0,0,0.5)",
        plot_bgcolor: "rgba(0,0,0,0.5)",
        margin: {
          l: 40,
          r: 10,
          b: 100,
          t: 80,
        },
        font: {
          color: "#fff",
        },
      }}
    />
  );
}

export default BarChart;
