const initialState = {
    contacts: [],
    loading: null,
    error: ''
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case 'GET_CONTACTS_REQUEST':
            return {...state, loading: true};
        case 'GET_CONTACTS_SUCCESS':
            return {...state, loading: false, contacts: payload};
        case 'GET_CONTACTS_FAILURE':
            return {...state, loading: false, error: payload};
        default:
            return state;
    }

}

export default reducer;