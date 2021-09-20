import {requestSingleTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_ARTICLES_REQUEST,
 GET_TEACHERS_ARTICLES_SUCCESS,
 GET_TEACHERS_ARTICLES_FAILURE,
} from '../../../constants/cvlac.actionTypes';

export const getTeachersArticles = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersArticlesRequest());
        const data = await requestSingleTeachersData(ids, "articles").catch(e => {
            dispatch(getTeachersArticlesFailure(e));
        });
        return dispatch(getTeachersArticlesSuccess(data));
    }
}


export const getTeachersArticlesRequest = () => {
    return {
        type: GET_TEACHERS_ARTICLES_REQUEST,
    }
}

export const getTeachersArticlesSuccess = (messages) => {
    return {
        type: GET_TEACHERS_ARTICLES_SUCCESS,
        payload: messages,
    }
}

export const getTeachersArticlesFailure = error => {
    return {
        type: GET_TEACHERS_ARTICLES_FAILURE,
        payload: error,
    }
}