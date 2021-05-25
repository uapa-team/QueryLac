export const getTeacherArticles = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherArticlesRequest());
        const apiUrl = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/articles` : `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/articles`;
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
            return dispatch(getTeacherArticlesSuccess(data['articles']));
        }catch(error){
            dispatch(getTeacherArticlesFailure(error))
        }
    }
}


export const getTeacherArticlesRequest = () => {
    return {
        type: 'GET_TEACHER_ARTICLES_REQUEST',
    }
}

export const getTeacherArticlesSuccess = (messages, category) => {
    return {
        type: 'GET_TEACHER_ARTICLES_SUCCESS',
        payload: messages,
        category: category
    }
}

export const getTeacherArticlesFailure = error => {
    return {
        type: 'GET_TEACHER_ARTICLES_FAILURE',
        payload: error,
    }
}