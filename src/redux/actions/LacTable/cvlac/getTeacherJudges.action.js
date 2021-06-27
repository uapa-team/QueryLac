export const getTeacherJudges = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherJudgesRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/judges` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/judges`;
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
            return dispatch(getTeacherJudgesSuccess(data['judges']));
        }catch(error){
            dispatch(getTeacherJudgesFailure(error))
        }
    }
}


export const getTeacherJudgesRequest = () => {
    return {
        type: 'GET_TEACHER_JUDGES_REQUEST',
    }
}

export const getTeacherJudgesSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_JUDGES_SUCCESS',
        payload: messages,
    }
}

export const getTeacherJudgesFailure = error => {
    return {
        type: 'GET_TEACHER_JUDGES_FAILURE',
        payload: error,
    }
}