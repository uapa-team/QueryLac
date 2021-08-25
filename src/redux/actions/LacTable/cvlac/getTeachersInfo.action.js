import {
 GET_TEACHERS_INFO_REQUEST,
 GET_TEACHERS_INFO_SUCCESS,
 GET_TEACHERS_INFO_FAILURE,
} from '../../../constants/LacTable/cvlac.actionTypes';

export const getTeachersInfo = (ids, items = "") => {
    return async (dispatch, getState) => {

        dispatch(getTeachersInfoRequest());
        const apiUrl =
            process.env.NODE_ENV === 'production' ?
                `${process.env.REACT_APP_PROD_API_URL}/cvlac/teachers/${items}` :
                `${process.env.REACT_APP_DEV_API_URL}/cvlac/teachers/${items}`;
        const options = {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dnis: ids
            })
        };

        try {
            const response = await fetch(apiUrl, options).then(response => {
                if (!response.ok) throw Error(response.status);
                return response;
            });
            const {data,errors} = await response.json();
            const dataMerged = {
                basicDetails: [],
                articles: [],
                bookChapters: [],
                awards: [],
                events: [],
                languages: [],
                books: [],
                networks: [],
                softwares: [],
                titles: [],
                judges: [],
                projects: [],
                couplesEvaluators: [],
                notFound:[],
            }
            //Flat info
            data.forEach(teacher => {
                dataMerged.basicDetails.push(teacher['basicDetails']);
                dataMerged.articles.push(...teacher['articles']);
                dataMerged.bookChapters.push(...teacher['bookChapters'])
                dataMerged.awards.push(...teacher['awards'])
                dataMerged.events.push(...teacher['events'])
                dataMerged.languages.push(...teacher['languages'])
                dataMerged.books.push(...teacher['books'])
                dataMerged.networks.push(...teacher['networks'])
                dataMerged.softwares.push(...teacher['softwares'])
                dataMerged.titles.push(...teacher['titles'])
                dataMerged.judges.push(...teacher['judges'])
                dataMerged.projects.push(...teacher['projects'])
                dataMerged.couplesEvaluators.push(...teacher['couplesEvaluators'])
            })
            dataMerged.notFound = errors;

            return dispatch(getTeachersInfoSuccess(dataMerged));
        } catch (error) {
            dispatch(getTeachersInfoFailure(error))
        }
    }
}


export const getTeachersInfoRequest = () => {
    return {
        type: GET_TEACHERS_INFO_REQUEST,
    }
}

export const getTeachersInfoSuccess = (data) => {
    return {
        type: GET_TEACHERS_INFO_SUCCESS,
        payload: data,
    }
}

export const getTeachersInfoFailure = error => {
    return {
        type: GET_TEACHERS_INFO_FAILURE,
        payload: error,
    }
}