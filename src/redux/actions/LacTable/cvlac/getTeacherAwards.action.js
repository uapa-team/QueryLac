export const getTeacherAwards = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherAwardsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/awards` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/awards`;
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
            return dispatch(getTeacherAwardsSuccess(data['awards']));
        }catch(error){
            dispatch(getTeacherAwardsFailure(error))
        }
    }
}


export const getTeacherAwardsRequest = () => {
    return {
        type: 'GET_TEACHER_AWARDS_REQUEST',
    }
}

export const getTeacherAwardsSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_AWARDS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherAwardsFailure = error => {
    return {
        type: 'GET_TEACHER_AWARDS_FAILURE',
        payload: error,
    }
}