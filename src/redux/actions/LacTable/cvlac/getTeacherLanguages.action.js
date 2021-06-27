export const getTeacherLanguages = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherLanguagesRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/languages` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/languages`;
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
            return dispatch(getTeacherLanguagesSuccess(data['languages']));
        }catch(error){
            dispatch(getTeacherLanguagesFailure(error))
        }
    }
}


export const getTeacherLanguagesRequest = () => {
    return {
        type: 'GET_TEACHER_LANGUAGES_REQUEST',
    }
}

export const getTeacherLanguagesSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_LANGUAGES_SUCCESS',
        payload: messages,
    }
}

export const getTeacherLanguagesFailure = error => {
    return {
        type: 'GET_TEACHER_LANGUAGES_FAILURE',
        payload: error,
    }
}