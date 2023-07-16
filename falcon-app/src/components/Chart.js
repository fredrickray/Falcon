import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const ExchangeRateChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Fundamental Analysis of Stocks",
      align: "left",
    },
    subtitle: {
      text: "Price Movements",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  });

  const [series, setSeries] = useState([
    {
      name: "USD",
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const response = await axios.get(
        "https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID&base=USD&symbols=EUR,GBP,JPY"
      );
      const { rates } = response.data;
      const data = Object.keys(rates).map((date) => [new Date(date).getTime(), rates[date]]);
      setSeries([{ name: "USD", data }]);
    };
    fetchExchangeRates();
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="500" />
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateChart;