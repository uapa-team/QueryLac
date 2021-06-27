export const getTeacherNetworks = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherNetworksRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/networks` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/networks`;
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
            return dispatch(getTeacherNetworksSuccess(data['networks']));
        }catch(error){
            dispatch(getTeacherNetworksFailure(error))
        }
    }
}


export const getTeacherNetworksRequest = () => {
    return {
        type: 'GET_TEACHER_NETWORKS_REQUEST',
    }
}

export const getTeacherNetworksSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_NETWORKS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherNetworksFailure = error => {
    return {
        type: 'GET_TEACHER_NETWORKS_FAILURE',
        payload: error,
    }
}