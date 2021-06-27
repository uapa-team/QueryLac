export const getTeacherSoftwares = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherSoftwaresRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/softwares` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/softwares`;
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
            return dispatch(getTeacherSoftwaresSuccess(data['softwares']));
        }catch(error){
            dispatch(getTeacherSoftwaresFailure(error))
        }
    }
}


export const getTeacherSoftwaresRequest = () => {
    return {
        type: 'GET_TEACHER_SOFTWARES_REQUEST',
    }
}

export const getTeacherSoftwaresSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_SOFTWARES_SUCCESS',
        payload: messages,
    }
}

export const getTeacherSoftwaresFailure = error => {
    return {
        type: 'GET_TEACHER_SOFTWARES_FAILURE',
        payload: error,
    }
}