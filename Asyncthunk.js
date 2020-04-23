const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const ThunkMiddleware = require('redux-thunk').default;
const axios = require("axios");

const iState = {                             // create intialState
    loading:false,
    users:[], 
    error:""
}
const USER_REQUEST = "USER_REQUEST";              // create action
const USER_SUCCESS = "USER_SUCCESS";
const USER_ERROR = "USER_ERROR";

const userRequest =()=>{               //Action creator 
    return{
    type:USER_REQUEST
    }
}
const userSuccess =(users)=>{               //Action creator 
    return{
    type:USER_SUCCESS,
     payload:users 
    }
    
}
const userError =(error)=>{                  //Action creator 
    return{
        type:USER_ERROR,
        payload:error
    }
}

const Reducer =(state=iState,action)=>{
    switch(action.type){
        case "USER_REQUEST" : return{
            ...state,
            loading:true
        }

          case "USER_SUCCESS" : return{
              loading:false ,users:action.payload ,error:""
          }
          case "USER_ERROR ": return{
              loading:false ,user:[],error:action.payload
            
        }


    }

}
// ye thunk middleware function return karta h jo dispatch ko return karega
const fecthUser =()=>{                        
    return function(dispatch){
        dispatch(userRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response=>{
            //response.data
            const users = response.data.map(user=>user.name)
            dispatch(userSuccess(users))
        })
        .catch(error=>{
            // error message
            dispatch(userError(error.message))
        })
        
    }
}

const store = createStore(Reducer,applyMiddleware(ThunkMiddleware));

const unsubscribe =store.subscribe(()=>{console.log(store.getState());})

store.dispatch(fecthUser())