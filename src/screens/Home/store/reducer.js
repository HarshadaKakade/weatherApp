import Action from './action';

const defaultState = {
    loadingData: false,
    loadedData: false,
    weatherData: [],
    currentCityDetails: {},
    currentDeatils: {},
    cityNames: [
        "thane, maharashtra",
        "nagpur, maharashtra",
        "solapur, maharashtra",
        "nashik, maharashtra",
        "new york, usa"],
    cityName: "",
    zipCode: '10001',
    chartData: [],
    showErrorMsg: false
}

export default function HomeReducer(state = defaultState, action) {
    switch (action.type) {
        case Action.ON_LOAD_DATA:
            let _weatherDetails = []
            let _currentDeatils = action.weatherDeatils[0];
            if (action.weatherDeatils && action.weatherDeatils.length > 0) {
                _weatherDetails = action.weatherDeatils.map(details => {
                    if (details.date === _currentDeatils.date) {
                        details.active = true
                    }
                    return details
                })
            }
            return {
                ...state,
                loadingData: action.staus === true ? false : true,
                loadedData: action.staus,
                weatherData: _weatherDetails,
                currentDeatils: _currentDeatils,
                currentCityDetails: action.currentCityDetails,
                chartData: action.chartData
            }
        case Action.ON_CHANGES_CITY_NAME:
            return {
                ...state,
                loadedData: false,
                loadingData: false,
                cityName: action.cityName
            }
        case Action.ON_ADD_CUREENT_CITY_NAME:
            const index = state.cityNames.indexOf(action.cityName);
            const _cityNames = index === -1 ? [`${action.cityName}`, ...state.cityNames] : state.cityNames;
            return {
                ...state,
                cityNames: _cityNames,
                cityName: action.cityName
            }
        case Action.ON_CHANGE_CURRENT_DEATILS:
            let _currentChangeDeatils = action.details;
            let _weatherChangesDetails = []

            _weatherChangesDetails = state.weatherData.map(details => {
                if (details.date === _currentChangeDeatils.date) {
                    details.active = true
                } else {
                    details.active = false
                }
                return details
            })

            return {
                ...state,
                currentDeatils: _currentChangeDeatils,
                weatherData: _weatherChangesDetails
            }

        case Action.ON_CHANGE_ZIP_CODE:
            return {
                ...state,
                zipCode: action.code
            }
        case Action.ON_CLICK_SEARCH:
            return {
                ...state,
                loadedData: false,
                loadingData: false,
                showErrorMsg: false
            }
        case Action.ON_ERROR_MSG_SHOW:
            console.log(action)
            return {
                ...state,
                loadingData: action.status === true ? false : true,
                loadedData: action.status,
                showErrorMsg: true

            }

        default:
            return {
                ...state
            }
    }
}