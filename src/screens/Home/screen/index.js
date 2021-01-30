import React from 'react';
import { connect } from 'react-redux';
import ZipCodeSearch from '../../../components/ZipCodeSearch/index';
import GetWeatherDetails from '../compoents/GetWeatherDeatils';
import Weekdays from '../../../components/Weekdays';
import { onAddCurrentCityName } from '../store/dispatcher';
import DataInChart from '../../../components/DataInChart/index'
import { Spinner } from 'reactstrap'


const Home = ({
    loadingData,
    loadedData,
    showErrorMsg,
}) => {

    // useEffect(
    //     _ => {
    //         if (!cityName) {
    //             fetch('http://ip-api.com/json')
    //                 .then(response => response.json())
    //                 .then(response => {
    //                     let currentCityName = `${response.city}, ${response.regionName}`;
    //                     console.log("currentCityName", currentCityName)
    //                     onAddCurrentCityName(currentCityName)
    //                 })
    //         }
    //     }, [cityName]);

    return (

        <div>
            {/* <Customserach /> */}
            <ZipCodeSearch />
            {
                loadingData === false && loadedData === false ?
                    <GetWeatherDetails /> : null
            }
            {
                loadedData ?
                    showErrorMsg ?
                        <div className="display-validation-msg">
                            <span>
                                Please enter valid zip code(only India, US)
                            </span>
                        </div>
                        :
                        <div>
                            <Weekdays />
                            <DataInChart />
                        </div>
                    : <div className="loader"><Spinner
                        className="text-center"
                        color="info"
                        style={{ width: "4rem", height: "4rem" }}
                    /> </div>
            }
        </div>

    )
}
const mapStateToProps = ({ home }) => {
    return {
        loadingData: home.loadingData,
        loadedData: home.loadedData,
        showErrorMsg: home.showErrorMsg,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCurrentCityName: (cityName) => dispatch(onAddCurrentCityName(cityName))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)