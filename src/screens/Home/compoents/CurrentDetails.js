import React from 'react';
import { connect } from 'react-redux';
import Cloud from '../../../assets/images/cloud.png';
import Rain from '../../../assets/images/rain.png';
import Sun from '../../../assets/images/sun.png';
import Weather from '../../../assets/images/weather.png';
import WeatherGrapgh from '../../../assets/images/line_chart.png';
import './CurrentDeatils.scss';

const CurrentDeatils = ({
    currentDeatils
}) => {
    const temp = currentDeatils ? currentDeatils.details[0].details.temp : "";
    const imgSrc = currentDeatils && currentDeatils.hasOwnProperty('date') ? currentDeatils.details[0].weather[0].main === "Rain" ? Rain :
        currentDeatils.details[0].weather[0].main === "Clouds" ? Cloud :
            currentDeatils.details[0].weather[0].main === "Sunny" ? Sun : Weather : Weather
    const _pressure = currentDeatils && currentDeatils.hasOwnProperty('date') ? currentDeatils.details[0].details.pressure : "";
    const _humidity = currentDeatils && currentDeatils.hasOwnProperty('date') ? currentDeatils.details[0].details.humidity : ""
    return (
        <div className="current">
            <div className="current-details">
                <div className="current-details__graph-section">
                    <div className="current-details__graph-section__title">
                        <div className="temp">{temp} &#8451;</div>
                        <div><img width="50" src={imgSrc} alt="temp img" /></div>
                    </div>
                    <div className="weather">
                        <img className="weather-img" src={WeatherGrapgh} alt="weather grapgh" />
                    </div>
                </div>
                <div className="current-details__details">
                    <div className="pressure">
                        <div><span>Pressure</span></div>
                        <div><span>{_pressure}</span></div>
                    </div>
                    <div className="humidity">
                        <div><span>Humidity</span></div>
                        <div><span>{_humidity} %</span></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = ({ home }) => {
    return {
        currentDeatils: home.currentDeatils
    };
};

export default connect(mapStateToProps, null)(CurrentDeatils)