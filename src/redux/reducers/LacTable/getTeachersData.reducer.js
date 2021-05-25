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
    error: ''
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case 'RESET_TEACHERS_DATA':
            return initialState;

        case 'GET_TEACHER_BASIC_DETAILS_REQUEST':
            return {...state, loading: true};
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
            return {...state, loading: true};

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
            return {...state, loading: true};

        case 'GET_TEACHER_BOOK_CHAPTERS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    bookChapters: [...state.data.bookChapters, ...payload]
                }
            };
        case 'GET_TEACHER_BOOK_CHAPTERS_FAILURE':
            return {...state, loading: false, error: payload};
        default:
            return state;
    }

}

export default reducer;