import { connect } from 'react-redux';
import { onWeatherDeatilsLoaded, onCityNotFound } from '../store/dispatcher';


const GetWeatherDetails = ({
    cityName,
    onCityNotFound,
    zipCode = "10001",
    onWeatherDeatilsLoaded
}) => {

    const countyCode = zipCode.length === 6 ? 'IN' : zipCode.length === 5 ? 'US' : 'US';

    // const _request = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=651a45b15264bc21e6fe79689eede235`;
    const _request1 = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countyCode}&units=metric&appid=651a45b15264bc21e6fe79689eede235`;

    fetch(_request1)
        .then(response => response.json())
        .then(response => {
            if (response.message === "city not found") {
                onCityNotFound(true)
            } else {
                let weatherDetails = [];
                let chartData = [];
                const weekDayName = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
                response.list.map(listData => {
                    let _date1 = new Date(listData.dt_txt)
                    let _date = _date1.getDate();

                    const index = weatherDetails.find(data => data.date.getDate() === _date)
                    if (!index) {
                        const details = {
                            date: new Date(listData.dt_txt),
                            details: [{
                                date: listData.dt_txt,
                                details: listData.main,
                                weather: listData.weather
                            }]
                        }
                        weatherDetails.push(details)
                    } else {
                        weatherDetails = weatherDetails.map((details) => {
                            if (details.date.getDate() === _date) {
                                let dayDetails = {
                                    date: listData.dt_txt,
                                    details: listData.main,
                                    weather: listData.weather
                                }
                                details.details.push(dayDetails)
                            }
                            return details
                        })

                    }
                    return ""
                })
                weatherDetails = weatherDetails.map((data) => {
                    data.active = false
                    return data
                })

                chartData = weatherDetails.map(weater => {

                    let name = weekDayName[weater.date.getDay()];

                    let data = weater.details.map(temp => {
                        return parseInt(temp.details.temp)
                    })
                    const details = {
                        name,
                        data
                    }
                    return details
                })
                onWeatherDeatilsLoaded(true, weatherDetails, response.city, chartData)

            }

        })
        .catch(err => {
            console.log("err", err)
        })

    return "";
}

const mapStateToProps = ({ home }) => {
    return {
        zipCode: home.zipCode
    };
};



const mapDispatchToProps = dispatch => {
    return {
        onWeatherDeatilsLoaded: (status, response, cityDetails, chartData) => dispatch(onWeatherDeatilsLoaded(status, response, cityDetails, chartData)),
        onCityNotFound: (status) => dispatch(onCityNotFound(status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetWeatherDetails);
