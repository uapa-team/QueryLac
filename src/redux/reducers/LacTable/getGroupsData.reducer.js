const initialState = {
    data: {
        basicDetails: [],
        institutions: [],
        investigationAreas: [],
        members: [],
    },
    loading: null,
    error: null
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case 'RESET_GROUPS_DATA':
            return initialState;
        case 'GET_GROUP_INFO_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_GROUP_INFO_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...payload
                }
            };

        case 'GET_GROUP_INFO_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_GROUP_BASIC_DETAILS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_GROUP_BASIC_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    basicDetails: payload
                }
            };

        case 'GET_GROUP_BASIC_DETAILS_FAILURE':
            return {...state, loading: false, error: payload};

        default:
            return state;

    }

}

export default reducer;