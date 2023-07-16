import React, { useState, useEffect } from 'react';
// import ExchangeRateChart from '../components/Chart';
import axios from 'axios';
import ApexCharts from 'apexcharts';
const Test = () => {
    // const [chartData, setChartData] = useState({})
      
    // useEffect(() => {
        // const fetchData = async () => {
        //     const options = {
        //         method: 'GET',
        //         url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
        //         params: {
        //             from: 'USD',
        //             to: 'NGN'
        //         },
        //         headers: {
        //             'X-RapidAPI-Key': '8b57bdc3dcmsh8ae267c7ceaff4ep1b9f49jsnf07c663c102b',
        //             'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        //         }
        //     };
    
        //     try {
        //         const response = await axios.request(options);
        //         // console.log(response.data)
        //         const { rates } = response.data;
            
        //         // Format the data for ApexCharts
        //         const chartData = Object.entries(rates).map(([currency, rate]) => ({
        //           x: currency,
        //           y: rate
        //         }));

        //         var option = {
        //             series: [{
        //             name: "Dollar Exchange Rate",
        //             data: chartData
        //           }],
        //             chart: {
        //             type: 'area',
        //             height: 350,
        //             zoom: {
        //               enabled: false
        //             }
        //           },
        //           dataLabels: {
        //             enabled: false
        //           },
        //           stroke: {
        //             curve: 'straight'
        //           },
                  
        //           title: {
        //             text: 'Fundamental Analysis of Stocks',
        //             align: 'left'
        //           },
        //           subtitle: {
        //             text: 'Price Movements',
        //             align: 'left'
        //           },
        //         //   labels: series.monthDataSeries1.dates,
        //           xaxis: {
        //             type: 'datetime',
        //           },
        //           yaxis: {
        //             opposite: true
        //           },
        //           legend: {
        //             horizontalAlign: 'left'
        //           }
        //           };

            
        //         // Create the chart using ApexCharts
        //         const chart = new ApexCharts(document.querySelector('#chart'), option);
            
        //         chart.render();
        //       } 
        //       catch (error) {
        //         console.error(error);
        //       }
        //     };
    
        // fetchData();
    // }, []);
    

    return (
        <div>
            <div className='chart' id='chart'>

            </div>
            {/* <div id="wrapper"
            style={{position: "relative",
                background: "#000524",
                border: "1px solid #000",
                boxShadow:" 0 22px 35px -16px rgba(0, 0, 0, 0.71)",
                maxWidth: "850px",
                margin: "0 auto"}}>
                <div id="chart-area">

                </div>
                <div id="chart-bar"
                style={{position: "relative",
                    marginTop: "-38px"}}>

                </div>

                <a class="link" href="https://apexcharts.com?ref=codepen"
                    style={{ position: "absolute",
                        bottom: "7px",
                        right: "13px",
                        zIndex: "10",
                        color: "#ccc",
                        fontSize: "12px",
                        textDecoration: "none",
                        fontFamily: "Helvetica, Arial"}}>apexcharts.com</a>
            </div> */}
            {/* <ExchangeRateChart /> */}
        </div>);
}

export default Test;