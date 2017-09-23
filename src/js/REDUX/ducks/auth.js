/*Constants*/
const MODAL_VIEW = 'MODAL_VIEW';
const TAKE_REQUEST_DATA = 'TAKE_REQUEST_DATA';
const TAKE_LECTION = 'TAKE_LECTION';
const TAKE_SUBJECT =  'TAKE_SUBJECT';
const TAKE_URL = 'TAKE_URL';


/*Actions*/
export function modal_view(view, type) {
    return {
        type: MODAL_VIEW,
        payload: {
            view: view,
            type: type,
        }
    }
}



export function take_req_data( val ) {
    return {
        type: TAKE_REQUEST_DATA,
        payload: val
    }
}

export function take_lection( val ) {
    return {
        type: TAKE_LECTION,
        payload: val
    }
}

export function take_subject( val ) {
    return {
        type: TAKE_SUBJECT,
        payload: val
    }
}

export function take_url( val ) {
    return {
        type: TAKE_URL,
        payload: val
    }
}


/*Initial State*/
const initialState = {
    view: false,
    modalType: '',

    allReqData: '',
    lections: '',
    subj: '',
    telegraphUrl: ''
};

/*Reducer*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_VIEW:
            return { ...state, view: action.payload.view, modalType: action.payload.type };

        case TAKE_REQUEST_DATA:
            return { ...state, allReqData: action.payload };

        case TAKE_LECTION:
            return { ...state, lections: action.payload };

        case TAKE_SUBJECT:
            return { ...state, subj: action.payload };

        case TAKE_URL:
            return { ...state, telegraphUrl: action.payload };

        default:
            return state;
    }
}