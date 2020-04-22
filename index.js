
const redux = require("redux");
const createStore = redux.createStore;

const Buy_book = "Buy_book"               //create a action
const Buy_pen = "Buy_pen"

const intialState = {                       // Create  a state
    numberOfBookes: 10,
    numberOfPens: 15,

    wish: ["atul", "code"]
}

// const action ={
//     // type:Buy_book,
//     // info:"my first redux code"
// }

// Action creators     wrapping the action in single function
function buyBook() {
    // action                    action function jo ki action object return karta hai
    return {
        type:Buy_book,
        payload: "my first redux code"
    }
}

function buyPen() {
    // action                   
    return {
        type:Buy_pen,
        payload: "my second redux code"
    }
}

// reducer jo do parameter leta hai (prevState,action)=>newState

const Reducer = (state = intialState, action) => {

    switch (action.type) {

        case "Buy_book": return {
            ...state,
            numberOfBookes: state.numberOfBookes - 1
        }

        case "Buy_pen": return {
            ...state,
            numberOfPens: state.numberOfPens - 2
        }
        default: return state;

    }

}

const store = createStore(Reducer);
console.log("intial State", store.getState());

const unsubscribe = store.subscribe(() => { console.log("update State value", store.getState()) });

store.dispatch(buyBook())
store.dispatch(buyPen())  
store.dispatch(buyPen())                  // second process
unsubscribe();