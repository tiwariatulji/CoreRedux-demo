const {redux ,createStore,combineReducers,applyMiddleware} = require("redux");
// const createStore = redux.createStore;
// const applyMiddleware = redux.applyMiddleware

const iStateBooks = {                 // create spreate State
    numberofBook :10,
}
const iStatePens = {
    numberofpen :15,
}

function BuyBook (){
    return{
        type:"Buy_Book",
        payload: "this is my first code"
    }
}

function BuyPen(){
    return{
        type:"Buy_Pen",
        payload: "this is second Code"
    }
}


  const BookReducer =(state=iStateBooks ,action)=>{

    switch(action.type){
        case "Buy_Book" : return{
            ...state,
            numberofBook:state.numberofBook-1
        }
        default : return state;
         
    }

  }
  const PenReducer =(state=iStatePens ,action)=>{

    switch(action.type){
        case "Buy_Pen" : return{
            ...state,
            numberofpen:state.numberofpen-1
        }
        default : return state;
         
    }

  }


const reducer = combineReducers({         // ye Combinereducer object return karta hai 
    book:BookReducer,
    pen:PenReducer
})

const logger =state=>{
    return next=>{
        return action =>{
            const result =next(action);
            console.log("middleware log",result);
            return result;
            
        }
    }
}


const store = createStore(reducer,applyMiddleware(logger));
console.log("intial State",store.getState())
const subscribe = store.subscribe(() => { console.log("update State value", store.getState()) });
store.dispatch(BuyBook())
store.dispatch(BuyPen())
store.dispatch(BuyPen())

subscribe();