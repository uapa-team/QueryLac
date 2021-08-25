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
} from "../../constants/LacTable/cvlac.actionTypes"

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
            return {
                ...state,
                loading: false,
                data: {
                    basicDetails: [...state.data.basicDetails],
                    articles: [...state.data.articles, ...payload['articles']],
                    bookChapters: [...state.data.bookChapters, ...payload['bookChapters']],
                    awards: [...state.data.awards, ...payload['awards']],
                    events: [...state.data.events, ...payload['events']],
                    languages: [...state.data.languages, ...payload['languages']],
                    books: [...state.data.books, ...payload['books']],
                    networks: [...state.data.networks, ...payload['networks']],
                    softwares: [...state.data.softwares, ...payload['softwares']],
                    titles: [...state.data.titles, ...payload['titles']],
                    judges: [...state.data.judges, ...payload['judges']],
                    projects: [...state.data.projects, ...payload['projects']],
                    couplesEvaluators: [...state.data.couplesEvaluators, ...payload['couplesEvaluators']],
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
                    basicDetails: [...state.data.basicDetails, ...payload['basicDetails']],
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
                    articles: [...state.data.articles, ...payload['articles']],
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
                    bookChapters: [...state.data.bookChapters, ...payload['bookChapters']],
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
                    awards: [...state.data.awards, ...payload['awards']],
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
                    events: [...state.data.events, ...payload['events']],
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
                    languages: [...state.data.languages, ...payload['languages']],
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
                    books: [...state.data.books, ...payload['books']],
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
                    networks: [...state.data.networks, ...payload['networks']],
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
                    softwares: [...state.data.softwares, ...payload['softwares']],
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
                    titles: [...state.data.titles, ...payload['titles']],
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
                    judges: [...state.data.judges, ...payload['judges']],
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
                    projects: [...state.data.projects, ...payload['projects']],
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
                    couplesEvaluators: [...state.data.couplesEvaluators, ...payload['couplesEvaluators']],
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