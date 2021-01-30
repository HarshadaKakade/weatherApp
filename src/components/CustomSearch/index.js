import React from 'react';
import Location from '../../assets/images/location.png';
import Search from '../../assets/images/search.png';
import { connect } from 'react-redux';
import './index.scss'
import { onCityNameChange } from '../../screens/Home/store/dispatcher';


const Customserach = ({
    cityNames,
    onCityNameChange,
}) => {
    function changeCityName(e) {
        onCityNameChange(e.target.value)
    }
    return (
        <div className="custom-search">
            <div className="custom-search__location-img"><img width="20" src={Location} alt="location" /> </div>
            <div className="custom-search__location-input">
                <select name="city" id="city" onChange={e => changeCityName(e)}>
                    {
                        cityNames.map((city, index) => {
                            return (
                                <option key={index} value={city} className="city-name">{city}</option>
                            )
                        })
                    }

                </select>
            </div>
            <div className="custom-search__search-img"> <img width="20" src={Search} alt="search" /> </div>
        </div>
    )
}
const mapStateToProps = ({ home }) => {
    return {
        cityName: home.cityName,
        cityNames: home.cityNames
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onCityNameChange: (cityName) => dispatch(onCityNameChange(cityName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customserach)