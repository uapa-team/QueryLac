export const getTeacherBasicDetails = (id) => {
    return async (dispatch, getState) => {

        dispatch(getTeacherBasicDetailsRequest());

        const url = `http://localhost:4000/api/cvlac/teacher/${id}/basicDetails`;
        console.log(url)
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

            const data = await response.json()
            return dispatch(getTeacherBasicDetailsSuccess(data["basicDetails"], "basicDetails"));

        }catch(error){
            dispatch(getTeacherBasicDetailsFailure(error))
        }


    }
}


export const getTeacherBasicDetailsRequest = () => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_REQUEST',
    }
}

export const getTeacherBasicDetailsSuccess = (messages, category) => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_SUCCESS',
        payload: messages,
        category: category
    }
}

export const getTeacherBasicDetailsFailure = error => {
    return {
        type: 'GET_TEACHER_BASIC_DETAILS_FAILURE',
        payload: error,
    }
}