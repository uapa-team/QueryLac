export const getGroupBasicDetails = (cod) => {
    return async (dispatch, getState) => {

        dispatch(getGroupBasicDetailsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/grouplac/group/${cod}/basicDetails` :
                `${process.env.REACT_APP_DEV_API_URL}/grouplac/group/${cod}/basicDetails`;
        const options = {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
        };

        try {
            const response = await fetch(apiUrl, options).then(response => {
                if (!response.ok) throw Error(response.status);
                return response;
            });
            const data = await response.json();
            console.log(data);
            return dispatch(getGroupBasicDetailsSuccess(data['basicDetails']));
        }catch(error){
            dispatch(getGroupBasicDetailsFailure(error))
        }
    }
}


export const getGroupBasicDetailsRequest = () => {
    return {
        type: 'GET_GROUP_BASIC_DETAILS_REQUEST',
    }
}

export const getGroupBasicDetailsSuccess = (messages) => {
    return {
        type: 'GET_GROUP_BASIC_DETAILS_SUCCESS',
        payload: messages,
    }
}

export const getGroupBasicDetailsFailure = error => {
    return {
        type: 'GET_GROUP_BASIC_DETAILS_FAILURE',
        payload: error,
    }
}