import {requestTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_NETWORKS_REQUEST,
 GET_TEACHERS_NETWORKS_SUCCESS,
 GET_TEACHERS_NETWORKS_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersNetworks = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersNetworksRequest());
        const data = await requestTeachersData(ids, "networks").catch(e => {
            dispatch(getTeachersNetworksFailure(e));
        });
        return dispatch(getTeachersNetworksSuccess(data));
    }
}


export const getTeachersNetworksRequest = () => {
    return {
        type: GET_TEACHERS_NETWORKS_REQUEST,
    }
}

export const getTeachersNetworksSuccess = (messages) => {
    return {
        type: GET_TEACHERS_NETWORKS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersNetworksFailure = error => {
    return {
        type: GET_TEACHERS_NETWORKS_FAILURE,
        payload: error,
    }
}