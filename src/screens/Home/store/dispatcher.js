import Action from './action'

export function onWeatherDeatilsLoaded(staus, weatherDeatils=[], currentCityDetails={}, chartData=[]){
    return {
        type: Action.ON_LOAD_DATA,
        staus,
        weatherDeatils,
        currentCityDetails,
        chartData
    }
}

export function onCityNameChange(cityName){
    return {
        type: Action.ON_CHANGES_CITY_NAME,
        cityName
    }
}

export function onAddCurrentCityName(cityName){
    return {
        type: Action.ON_ADD_CUREENT_CITY_NAME,
        cityName
    }
}
export function onChangeCurrentDetails(details){
    return {
        type: Action.ON_CHANGE_CURRENT_DEATILS,
        details
    }

}

export function onChangeZipCode(code) {
    return {
        type: Action.ON_CHANGE_ZIP_CODE,
        code
    }
}

export function onSearch(){
    return {
        type: Action.ON_CLICK_SEARCH,
    }
}

export function onCityNotFound(status){
    return {
        type: Action.ON_ERROR_MSG_SHOW,
        status
    }
}