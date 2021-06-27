export const getTeacherBooks = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherBooksRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/books` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/books`;
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

            return dispatch(getTeacherBooksSuccess(data['books']));
        }catch(error){
            dispatch(getTeacherBooksFailure(error));
        }
    }
}


export const getTeacherBooksRequest = () => {
    return {
        type: 'GET_TEACHER_BOOKS_REQUEST',
    }
}

export const getTeacherBooksSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_BOOKS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherBooksFailure = error => {
    return {
        type: 'GET_TEACHER_BOOKS_FAILURE',
        payload: error,
    }
}