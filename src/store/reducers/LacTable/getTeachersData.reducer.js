import {
    RESET_TEACHERS_DATA,
    GET_TEACHERS_INFO_REQUEST,
    GET_TEACHERS_INFO_SUCCESS,
    GET_TEACHERS_INFO_FAILURE,
    GET_TEACHER_BASIC_DETAILS_REQUEST,
    GET_TEACHER_BASIC_DETAILS_SUCCESS,
    GET_TEACHER_BASIC_DETAILS_FAILURE,
    GET_TEACHERS_ARTICLES_REQUEST,
    GET_TEACHERS_ARTICLES_SUCCESS,
    GET_TEACHERS_ARTICLES_FAILURE,
    GET_TEACHERS_BOOK_CHAPTERS_REQUEST,
    GET_TEACHERS_BOOK_CHAPTERS_SUCCESS,
    GET_TEACHERS_BOOK_CHAPTERS_FAILURE,
    GET_TEACHERS_AWARDS_REQUEST,
    GET_TEACHERS_AWARDS_SUCCESS,
    GET_TEACHERS_AWARDS_FAILURE,
    GET_TEACHERS_EVENTS_REQUEST,
    GET_TEACHERS_EVENTS_SUCCESS,
    GET_TEACHERS_EVENTS_FAILURE,
    GET_TEACHERS_LANGUAGES_REQUEST,
    GET_TEACHERS_LANGUAGES_SUCCESS,
    GET_TEACHERS_LANGUAGES_FAILURE,
    GET_TEACHERS_BOOKS_REQUEST,
    GET_TEACHERS_BOOKS_SUCCESS,
    GET_TEACHERS_BOOKS_FAILURE,
    GET_TEACHERS_NETWORKS_REQUEST,
    GET_TEACHERS_NETWORKS_SUCCESS,
    GET_TEACHERS_NETWORKS_FAILURE,
    GET_TEACHERS_SOFTWARES_REQUEST,
    GET_TEACHERS_SOFTWARES_SUCCESS,
    GET_TEACHERS_SOFTWARES_FAILURE,
    GET_TEACHERS_TITLES_REQUEST,
    GET_TEACHERS_TITLES_SUCCESS,
    GET_TEACHERS_TITLES_FAILURE,
    GET_TEACHERS_JUDGES_REQUEST,
    GET_TEACHERS_JUDGES_SUCCESS,
    GET_TEACHERS_JUDGES_FAILURE,
    GET_TEACHERS_PROJECTS_REQUEST,
    GET_TEACHERS_PROJECTS_SUCCESS,
    GET_TEACHERS_PROJECTS_FAILURE,
    GET_TEACHERS_COUPLES_EVALUATORS_REQUEST,
    GET_TEACHERS_COUPLES_EVALUATORS_SUCCESS,
    GET_TEACHERS_COUPLES_EVALUATORS_FAILURE,
} from "../../constants/cvlac.actionTypes"

const initialState = {
    data: {
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
        notFound: []
    },
    loading: null,
    error: null
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case RESET_TEACHERS_DATA:
            return initialState;
        case GET_TEACHERS_INFO_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_INFO_SUCCESS:
            console.log(payload)
            return {
                ...state,
                loading: false,
                data: {
                    basicDetails: [...payload['basicDetails']],
                    articles: [...payload['articles']],
                    bookChapters: [...payload['bookChapters']],
                    awards: [...payload['awards']],
                    events: [...payload['events']],
                    languages: [...payload['languages']],
                    books: [...payload['books']],
                    networks: [...payload['networks']],
                    softwares: [...payload['softwares']],
                    titles: [...payload['titles']],
                    judges: [...payload['judges']],
                    projects: [...payload['projects']],
                    couplesEvaluators: [...payload['couplesEvaluators']],
                    notFound: [...payload['notFound']]
                }
            };

        case GET_TEACHERS_INFO_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHER_BASIC_DETAILS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_TEACHER_BASIC_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    basicDetails: [...payload['basicDetails']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHER_BASIC_DETAILS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_ARTICLES_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    articles: [...payload['articles']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_ARTICLES_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_BOOK_CHAPTERS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_BOOK_CHAPTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    bookChapters: [...payload['bookChapters']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_BOOK_CHAPTERS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_AWARDS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_AWARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    awards: [...payload['awards']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_AWARDS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_EVENTS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    events: [...payload['events']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_EVENTS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_LANGUAGES_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_LANGUAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    languages: [...payload['languages']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_LANGUAGES_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_BOOKS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    books: [...payload['books']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_BOOKS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_NETWORKS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_NETWORKS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    networks: [...payload['networks']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_NETWORKS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_SOFTWARES_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_SOFTWARES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...payload['softwares']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_SOFTWARES_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_TITLES_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_TITLES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    titles: [...payload['titles']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_TITLES_FAILURE:
            return {...state, loading: false, error: payload};


        case GET_TEACHERS_JUDGES_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_JUDGES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    judges: [...payload['judges']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_JUDGES_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_PROJECTS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    projects: [...payload['projects']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_PROJECTS_FAILURE:
            return {...state, loading: false, error: payload};

        case GET_TEACHERS_COUPLES_EVALUATORS_REQUEST:
            return {...state, loading: true, error: null};

        case GET_TEACHERS_COUPLES_EVALUATORS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    couplesEvaluators: [...payload['couplesEvaluators']],
                    notFound: [...payload['notFound']]
                }
            };
        case GET_TEACHERS_COUPLES_EVALUATORS_FAILURE:
            return {...state, loading: false, error: payload};

        default:
            return state;

    }

}

export default reducer;