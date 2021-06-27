export const getTeacherProjects = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherProjectsRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teacher/${id}/projects` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teacher/${id}/projects`;
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
            return dispatch(getTeacherProjectsSuccess(data['projects']));
        }catch(error){
            dispatch(getTeacherProjectsFailure(error))
        }
    }
}


export const getTeacherProjectsRequest = () => {
    return {
        type: 'GET_TEACHER_PROJECTS_REQUEST',
    }
}

export const getTeacherProjectsSuccess = (messages) => {
    return {
        type: 'GET_TEACHER_PROJECTS_SUCCESS',
        payload: messages,
    }
}

export const getTeacherProjectsFailure = error => {
    return {
        type: 'GET_TEACHER_PROJECTS_FAILURE',
        payload: error,
    }
}