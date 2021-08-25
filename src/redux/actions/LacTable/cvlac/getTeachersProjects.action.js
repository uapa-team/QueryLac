import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_PROJECTS_REQUEST,
 GET_TEACHERS_PROJECTS_SUCCESS,
 GET_TEACHERS_PROJECTS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersProjects = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersProjectsRequest());
        const data = await requestTeachersData(ids, "proyects").catch(e => {
            dispatch(getTeachersProjectsFailure(e));
        });
        return dispatch(getTeachersProjectsSuccess(data));
    }
}


export const getTeachersProjectsRequest = () => {
    return {
        type: GET_TEACHERS_PROJECTS_REQUEST,
    }
}

export const getTeachersProjectsSuccess = (proyects) => {
    return {
        type: GET_TEACHERS_PROJECTS_SUCCESS,
        payload: proyects,
    }
}

export const getTeachersProjectsFailure = error => {
    return {
        type: GET_TEACHERS_PROJECTS_FAILURE,
        payload: error,
    }
}