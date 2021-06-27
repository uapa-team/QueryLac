export const getTeacherCouplesEvaluators = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherCouplesEvaluatorsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/couplesEvaluators` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/couplesEvaluators`;
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
            return dispatch(getTeacherCouplesEvaluatorsSuccess(data['couplesEvaluators']));
        }catch(error){
            dispatch(getTeacherCouplesEvaluatorsFailure(error))
        }
    }
}


export const getTeacherCouplesEvaluatorsRequest = () => {
    return {
        type: 'GET_TEACHER_COUPLES_EVALUATORS_REQUEST',
    }
}

export const getTeacherCouplesEvaluatorsSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_COUPLES_EVALUATORS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherCouplesEvaluatorsFailure = error => {
    return {
        type: 'GET_TEACHER_COUPLES_EVALUATORS_FAILURE',
        payload: error,
    }
}