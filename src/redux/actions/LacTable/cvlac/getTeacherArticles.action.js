export const getTeacherArticles = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherArticlesRequest());

        const url = `http://localhost:4000/api/cvlac/teacher/${id}/articles`;
        const options = {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
            },
        };

        try {
            const response = await fetch(url, options).then(response => {
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