import { createStore } from 'redux';

const name = sessionStorage.getItem("name")
const photo = sessionStorage.getItem("photo")

const initialState = {
    modal: false,
    user: { name: name, photo: photo },
    /*
    fridge: {inputText: '', items: []},
    pantry: {inputText: '', items: []} */
    fridgeInput: '',
    fridgeItems: [],
    pantryInput: '',
    pantryItems: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'TOGGLE_MODAL':
            return Object.assign({}, state, { modal: !state.modal })
        case 'SET_USER':
            return Object.assign({}, state, { user: action.user })
        case 'SIGN_OUT':
            return Object.assign({}, state, { user: {} })
        case 'UPDATE_FRIDGE_INPUT':
            return Object.assign({}, state, { fridgeInput: action.text })
        case 'ADD_FRIDGE_ITEM':
            return Object.assign({}, state, { fridgeItems: state.fridgeItems.concat(state.fridgeInput), fridgeInput: '' })
        case 'UPDATE_PANTRY_INPUT':
            return Object.assign({}, state, { pantryInput: action.text })
        case 'ADD_PANTRY_ITEM':
            return Object.assign({}, state, { pantryItems: state.pantryItems.concat(state.pantryInput), pantryInput: '' })
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store; 