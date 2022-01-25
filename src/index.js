import { json, scaleBand, scaleLinear, max } from "d3";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const width = 980;
const height = 1000;

const jsonUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  //make a dataArray to hold the "data" key values in json file
  const dataArray = data.data;

  // const yearArray = dataArray.map((year) => year[0]).flat();

  // const gdpArray = dataArray.map((gdp) => gdp[1]).flat();
  // console.log(gdpArray[0]);
  // console.log(yearArray[0]);

  //
  const xScale = scaleBand()
    .domain(dataArray.map((d) => d[0]))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(dataArray, (d) => d[1])])
    .range([0, height]);

  return (
    <svg width={width} height={height}>
      {dataArray.map((d) => (
        <rect
          // x={0}
          // y={yScale(d[0])}
          // width={xScale(d[1])}
          // height={yScale.bandwidth()}
          x={xScale(d[0])}
          y={height - yScale(d[1])}
          width={xScale.bandwidth()}
          height={yScale(d[1])}
        ></rect>
      ))}
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
