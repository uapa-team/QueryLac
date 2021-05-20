const initialState = {
    teachers: {
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

        case 'GET_TEACHER_BASIC_DETAILS_REQUEST':
            return {...state, loading: true};
        case 'GET_TEACHER_BASIC_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                teachers: {
                    ...state.teachers,
                    basicDetails: [...state.teachers.basicDetails, payload]
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
                teachers: {
                    ...state.teachers,
                    articles: [...state.teachers.articles, ...payload]
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
                teachers: {
                    ...state.teachers,
                    bookChapters: [...state.teachers.bookChapters, ...payload]
                }
            };
        case 'GET_TEACHER_BOOK_CHAPTERS_FAILURE':
            return {...state, loading: false, error: payload};
        default:
            return state;
    }

}

export default reducer;