import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts";

const LineCharts = ({ data }) => {
  const { cases_time_series } = data;
  const [selectedDate, setSelectedDate] = useState(cases_time_series[0].date);

  // Extracting necessary data for Line Chart
  const chartData = cases_time_series.map(
    ({ date, dailyconfirmed, dailydeceased, dailyrecovered }) => ({
      date: date,
      confirmed: parseInt(dailyconfirmed),
      recovered: parseInt(dailyrecovered),
      deceased: parseInt(dailydeceased),
    })
  );

  // Filter data to get the selected date and the following six days
  const selectedAndFollowingDaysData = chartData.slice(
    chartData.findIndex((entry) => entry.date === selectedDate),
    chartData.findIndex((entry) => entry.date === selectedDate) + 7
  );

  // Function to handle date selection
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="line-chart-container w-75">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={selectedAndFollowingDaysData}>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="confirmed"
            stroke="#8884d8"
            name="Total Confirmed Cases"
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#82ca9d"
            name="Total Recovered Cases"
          />
          <Line
            type="monotone"
            dataKey="deceased"
            stroke="#ff0000"
            name="Total Deceased Cases"
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center">
        Line chart for the selected date and the following six days
      </p>
      <div className="text-center">
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="form-select"
        >
          {cases_time_series.map(({ date }) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LineCharts;
