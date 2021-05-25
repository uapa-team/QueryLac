const initialState = {
    data: {
        basicDetails: [],
        members: [],
        institutions: [],
    },
    loading: null,
    error: ''
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case 'RESET_GROUPS_DATA':
            return initialState;

        case 'GET_GROUP_BASIC_DETAILS_REQUEST':
            return {...state, loading: true};
        case 'GET_GROUP_BASIC_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    basicDetails: [...state.data.basicDetails, payload]
                }
            };
        case 'GET_GROUP_BASIC_DETAILS_FAILURE':
            return {...state, loading: false, error: payload};

    }

}

export default reducer;