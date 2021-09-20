import {requestSingleTeachersData} from '../../../utils/getTeachersData.utils';
import {
 GET_TEACHERS_BOOK_CHAPTERS_REQUEST,
 GET_TEACHERS_BOOK_CHAPTERS_SUCCESS,
 GET_TEACHERS_BOOK_CHAPTERS_FAILURE,
} from '../../../constants/cvlac.actionTypes';

export const getTeachersBookChapters = (ids) => {
    return async (dispatch, getState) => {
        dispatch(getTeachersBookChaptersRequest());
        const data = await requestSingleTeachersData(ids, "bookChapters").catch(e => {
            dispatch(getTeachersBookChaptersFailure(e));
        });
        return dispatch(getTeachersBookChaptersSuccess(data));
    }
}


export const getTeachersBookChaptersRequest = () => {
    return {
        type: GET_TEACHERS_BOOK_CHAPTERS_REQUEST,
    }
}

export const getTeachersBookChaptersSuccess = (messages) => {
    return {
        type: GET_TEACHERS_BOOK_CHAPTERS_SUCCESS,
        payload: messages,
    }
}

export const getTeachersBookChaptersFailure = error => {
    return {
        type: GET_TEACHERS_BOOK_CHAPTERS_FAILURE,
        payload: error,
    }
}