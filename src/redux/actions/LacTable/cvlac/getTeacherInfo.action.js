export const getTeacherInfo = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherInfoRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}`;
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
            return dispatch(getTeacherInfoSuccess(data));
        }catch(error){
            dispatch(getTeacherInfoFailure(error))
        }
    }
}


export const getTeacherInfoRequest = () => {
    return {
        type: 'GET_TEACHER_INFO_REQUEST',
    }
}

export const getTeacherInfoSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_INFO_SUCCESS',
        payload: messages,
    }
}

export const getTeacherInfoFailure = error => {
    return {
        type: 'GET_TEACHER_INFO_FAILURE',
        payload: error,
    }
}