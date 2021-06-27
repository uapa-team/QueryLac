export const getTeacherEvents = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherEventsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/events` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/events`;
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
            return dispatch(getTeacherEventsSuccess(data['events']));
        }catch(error){
            dispatch(getTeacherEventsFailure(error))
        }
    }
}


export const getTeacherEventsRequest = () => {
    return {
        type: 'GET_TEACHER_EVENTS_REQUEST',
    }
}

export const getTeacherEventsSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_EVENTS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherEventsFailure = error => {
    return {
        type: 'GET_TEACHER_EVENTS_FAILURE',
        payload: error,
    }
}