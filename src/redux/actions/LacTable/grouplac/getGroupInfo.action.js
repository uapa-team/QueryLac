export const getGroupInfo = (cod) => {
    return async (dispatch, getState) => {

        dispatch(getGroupInfoRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/grouplac/group/${cod}` :
                `${process.env.REACT_APP_DEV_API_URL}/grouplac/group/${cod}`;
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
            return dispatch(getGroupInfoSuccess(data));
        }catch(error){
            dispatch(getGroupInfoFailure(error))
        }
    }
}


export const getGroupInfoRequest = () => {
    return {
        type: 'GET_GROUP_INFO_REQUEST',
    }
}

export const getGroupInfoSuccess = (messages) => {
    return {
        type: 'GET_GROUP_INFO_SUCCESS',
        payload: messages,
    }
}

export const getGroupInfoFailure = error => {
    return {
        type: 'GET_GROUP_INFO_FAILURE',
        payload: error,
    }
}