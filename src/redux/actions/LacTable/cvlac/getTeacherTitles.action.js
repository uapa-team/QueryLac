export const getTeacherTitles = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherTitlesRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/titles` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/titles`;
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
            return dispatch(getTeacherTitlesSuccess(data['titles']));
        }catch(error){
            dispatch(getTeacherTitlesFailure(error))
        }
    }
}


export const getTeacherTitlesRequest = () => {
    return {
        type: 'GET_TEACHER_TITLES_REQUEST',
    }
}

export const getTeacherTitlesSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_TITLES_SUCCESS',
        payload: messages,
    }
}

export const getTeacherTitlesFailure = error => {
    return {
        type: 'GET_TEACHER_TITLES_FAILURE',
        payload: error,
    }
}