import React, { useState } from 'react'
import { connect } from 'react-redux';
import Cloud from '../../assets/images/cloud.png';
import Rain from '../../assets/images/rain.png';
import Sun from '../../assets/images/sun.png';
import Weather from '../../assets/images/weather.png'
import SnowFall from '../../assets/images/snowfall.png'
import { onChangeCurrentDetails } from '../../screens/Home/store/dispatcher'
import './index.scss';

const Weekdays = ({
    weatherData,
    currentDeatils,
    currentCityDetails,
    onChangeCurrentDetails
}) => {
    const [showMore, setShowMoreDetails] = useState(false)
    let sunriseTime = currentCityDetails ? new Date(currentCityDetails.sunrise * 1000) : "";
    let sunsetTime = currentCityDetails ? new Date(currentCityDetails.sunset * 1000) : "";
    sunriseTime = `${sunriseTime.getUTCHours()}:${sunriseTime.getUTCMinutes()}`;
    sunsetTime = `${sunsetTime.getUTCHours()}:${sunsetTime.getUTCMinutes()}`;
    function onClickParticulerDay(data) {
        onChangeCurrentDetails(data)
    }
    const weekDayName = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    return (
        <React.Fragment>
            <div className="city-details">

                <div className="current-title">
                    <span>
                        {currentCityDetails.name}, {currentCityDetails.country}
                    </span>

                </div>
                <div className="current-weather-details">
                    <div>
                        <span>
                            current weather: {currentDeatils.details[0].weather[0].description}
                        </span>
                    </div>
                    <div>
                        <span>Current temperature: {currentDeatils.details[0].details.temp} <span>&deg;</span></span>
                    </div>
                    <div>
                        <span>Today's high temperature: {currentDeatils.details[0].details.temp_max} <span>&deg;</span></span>
                    </div>
                    <div>
                        <span>Today's low temperature: {currentDeatils.details[0].details.temp_min} <span>&deg;</span></span>
                    </div>
                </div>

                {
                    showMore ? <div className="current-weather-details">
                        <div>
                            <span>Wind Speed: {currentDeatils.details[0].details.temp_kf} km/h</span>
                        </div>
                        <div>
                            <span>Humidity: {currentDeatils.details[0].details.humidity}%</span>
                        </div>
                        <div>
                            <span>Pressure: {currentDeatils.details[0].details.pressure} </span>
                        </div>
                        <div>
                            <span>Sunrise Time (UTC Format Time): {sunriseTime} </span>
                        </div>
                        <div>
                            <span>Sunset Time (UTC Format Time): {sunsetTime}</span>
                        </div>
                    </div> :
                        null
                }


                <div className="more-less-details" onClick={e => setShowMoreDetails(!showMore)}>
                    {
                        showMore ? <span>&#8593; Less Details</span> : <span> &#8595; More Details </span>
                    }
                </div>

            </div>
            <div className="week-days">
                {
                    weatherData.map((data, index) => {
                        const _day = weekDayName[data.date.getDay()];
                        const imgSrc = data.details[0].weather[0].main === "Rain" ? Rain :
                            data.details[0].weather[0].main === "Clouds" ? Cloud :
                                data.details[0].weather[0].main === "Sunny" ? Sun :
                                    data.details[0].weather[0].main === "Snow" ? SnowFall : Weather
                        return (
                            <div key={index} onClick={e => onClickParticulerDay(data)} className={data.active === true ? "active days" : "days"}>
                                <span className="day-name">{_day}</span>
                                <div className="temp">
                                    <span>{parseInt(data.details[0].details.temp_min)}<span>&deg;</span></span>
                                    <span>{parseInt(data.details[0].details.temp_max)}<span>&deg;</span></span>
                                </div>
                                <div className="temp-img">
                                    <img width="20" src={imgSrc} alt="temp" />
                                </div>
                                <div className="weather-name">{data.details[0].weather[0].main}</div>
                            </div>
                        )
                    })
                }

            </div>
        </React.Fragment >
    )
}

const mapStateToProps = ({ home }) => {
    return {
        weatherData: home.weatherData,
        currentCityDetails: home.currentCityDetails,
        currentDeatils: home.currentDeatils
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeCurrentDetails: (data) => dispatch(onChangeCurrentDetails(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Weekdays)