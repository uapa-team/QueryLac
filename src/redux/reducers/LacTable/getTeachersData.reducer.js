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
    },
    loading: null,
    error: null
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case 'RESET_TEACHERS_DATA':
            return initialState;
        case 'GET_TEACHER_INFO_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_INFO_SUCCESS':
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
                    couplesEvaluators: [...state.data.couplesEvaluators, ...payload['couplesEvaluators']]

                }
            };

        case 'GET_TEACHER_INFO_FAILURE':
            return {...state, loading: false, error: payload};

        default:
            return state;

        case 'GET_TEACHER_BASIC_DETAILS_REQUEST':
            return {...state, loading: true, error: null};
        case 'GET_TEACHER_BASIC_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    basicDetails: [...state.data.basicDetails, payload]
                }
            };
        case 'GET_TEACHER_BASIC_DETAILS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_ARTICLES_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_ARTICLES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    articles: [...state.data.articles, ...payload]
                }
            };
        case 'GET_TEACHER_ARTICLES_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_BOOK_CHAPTERS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_BOOK_CHAPTERS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    articles: [...state.data.articles, ...payload]
                }
            };
        case 'GET_TEACHER_BOOK_CHAPTERS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_AWARDS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_AWARDS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    awards: [...state.data.awards, ...payload]
                }
            };
        case 'GET_TEACHER_AWARDS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_EVENTS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_EVENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    events: [...state.data.events, ...payload]
                }
            };
        case 'GET_TEACHER_EVENTS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_LANGUAGES_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_LANGUAGES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    languages: [...state.data.languages, ...payload]
                }
            };
        case 'GET_TEACHER_LANGUAGES_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_BOOKS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_BOOKS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    books: [...state.data.books, ...payload]
                }
            };
        case 'GET_TEACHER_BOOKS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_NETWORKS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_NETWORKS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    networks: [...state.data.networks, ...payload]
                }
            };
        case 'GET_TEACHER_NETWORKS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_SOFTWARES_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_SOFTWARES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...state.data.softwares, ...payload]
                }
            };
        case 'GET_TEACHER_SOFTWARES_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_TITLES_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_TITLES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...state.data.softwares, ...payload]
                }
            };
        case 'GET_TEACHER_TITLES_FAILURE':
            return {...state, loading: false, error: payload};


        case 'GET_TEACHER_JUDGES_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_JUDGES_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...state.data.softwares, ...payload]
                }
            };
        case 'GET_TEACHER_JUDGES_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_PROJECTS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_PROJECTS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...state.data.softwares, ...payload]
                }
            };
        case 'GET_TEACHER_PROJECTS_FAILURE':
            return {...state, loading: false, error: payload};

        case 'GET_TEACHER_COUPLES_EVALUATORS_REQUEST':
            return {...state, loading: true, error: null};

        case 'GET_TEACHER_COUPLES_EVALUATORS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    softwares: [...state.data.softwares, ...payload]
                }
            };
        case 'GET_TEACHER_COUPLES_EVALUATORS_FAILURE':
            return {...state, loading: false, error: payload};

    }

}

export default reducer;