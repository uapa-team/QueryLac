export const getTeacherBasicDetails = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherBasicDetailsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/basicDetails` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/basicDetails`;
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

            const data = await response.json()
            return dispatch(getTeacherBasicDetailsSuccess(data["basicDetails"]));

        }catch(error){
            dispatch(getTeacherBasicDetailsFailure(error))
        }


    }
}


export const getTeacherBasicDetailsRequest = () => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_REQUEST',
    }
}

export const getTeacherBasicDetailsSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherBasicDetailsFailure = error => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_FAILURE',
        payload: error,
    }
}