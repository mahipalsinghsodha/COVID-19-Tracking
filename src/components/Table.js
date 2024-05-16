import React from "react";
import "./Table.css"; // Import custom CSS for table styling

const Table = ({ data }) => {
  const { statewise } = data;

  return (
    <div className="table">
      <h2 className="text-center">Current COVID-19 Data Table</h2>
      <table className="table table-hover bg-white mt-5">
        <thead className="thead-dark">
          <tr>
            <th className="text-center">State</th>
            <th className="text-center">Confirmed</th>
            <th className="text-center">Active</th>
            <th className="text-center">Recovered</th>
            <th className="text-center">Deceased</th>
          </tr>
        </thead>
        <tbody>
          {statewise.map((item, i) => (
            <tr key={i} className="text-center">
              <td>{item.state}</td>
              <td>{item.confirmed}</td>
              <td>{item.active}</td>
              <td>{item.recovered}</td>
              <td>{item.deltarecovered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
