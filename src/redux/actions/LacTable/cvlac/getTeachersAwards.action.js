import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_AWARDS_REQUEST,
 GET_TEACHERS_AWARDS_SUCCESS,
 GET_TEACHERS_AWARDS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersAwards = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersAwardsRequest());
        const data = await requestTeachersData(ids, "awards").catch(e => {
            dispatch(getTeachersAwardsFailure(e));
        });
        return dispatch(getTeachersAwardsSuccess(data));
    }
}


export const getTeachersAwardsRequest = () => {
    return {
        type: GET_TEACHERS_AWARDS_REQUEST,
    }
}

export const getTeachersAwardsSuccess = (messages) => {
    return {
        type: GET_TEACHERS_AWARDS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersAwardsFailure = error => {
    return {
        type: GET_TEACHERS_AWARDS_FAILURE,
        payload: error,
    }
}