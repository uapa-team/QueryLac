export const getTeacherBookChapters = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherBookChaptersRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/bookChapters` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/bookChapters`;
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
            return dispatch(getTeacherBookChaptersSuccess(data['bookChapters']));
        }catch(error){
            dispatch(getTeacherBookChaptersFailure(error))
        }
    }
}


export const getTeacherBookChaptersRequest = () => {
    return {
        type: 'GET_TEACHER_BOOK_CHAPTERS_REQUEST',
    }
}

export const getTeacherBookChaptersSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_BOOK_CHAPTERS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherBookChaptersFailure = error => {
    return {
        type: 'GET_TEACHER_BOOK_CHAPTERS_FAILURE',
        payload: error,
    }
}