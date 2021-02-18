import * as actionTypes from './actions';

const initialState = {
    appCurrentLanguage: localStorage.getItem('appLanguage')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            localStorage.setItem("appLanguage", action.languageName)
            return {
                ...state,
                appCurrentLanguage: action.languageName
            };
        default:
            return state
    }

}

export default reducer;
