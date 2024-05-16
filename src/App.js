import React, { useState, useEffect } from "react";
import DonutChart from "./components/DonutChart";
import "./App.css";
import Table from "./components/Table";
import LineCharts from "./components/LineChart";
import IndiaMap from "./components/IndiaMap";

const App = () => {
  const [covidData, setCovidData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://data.covid19india.org/data.json"
        ).then((res) => res.json());
        setCovidData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">INDIA COVID-19 Tracker</h1>
      {covidData && (
        <>
          <div className="headerSection row border border-black  p-3 d-flex justify-content-center align-items-centor">
            <div className="col-md-6 col-sm-12 mt-5 ">
              <DonutChart data={covidData} />
            </div>
            <div className="col-md-6 col-sm-12 mt-5 ">
              <LineCharts data={covidData} />
            </div>
          </div>
          <div className=" col-12 ">
            <IndiaMap data={covidData} />
          </div>
          <div className="table-box col-12 mt-4 d-flex justify-content-center">
            <Table data={covidData} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
