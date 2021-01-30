import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';
import './index.scss';

const DataInChart = ({
    chartData
}) => {
    function chartXAxisData() {
        let _data = chartData.map(data => {
            return data.name
        })
        return _data
    }
    const options = {
        chart: {
            type: "line",
        },
        title: {
            text: 'Next 6 Days Weather Information'
        },
        xAxis: {
            categories: chartXAxisData()
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        series: chartData
    }
    return (
        <div className="data-in-chart">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )

}


const mapStateToProps = ({ home }) => {
    return {
        chartData: home.chartData
    };
};



export default connect(mapStateToProps, null)(DataInChart)
