/*Constants*/
const MODAL_VIEW = 'MODAL_VIEW';
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

/*Initial State*/
const initialState = {
    view: false,
    modalType: '',
};

/*Reducer*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_VIEW:
            return {...state, view: action.payload.view, modalType: action.payload.type};

        default:
            return state;
    }
}