import {ADD_FAVORITE,FILTER,ORDER,GET_FAVORITE} from './actions';

const initialState = {
   myFavorites: [],
   allCharacters:[]
};

const sortDesc = key => (a, b) => a[key] < b[key] ? 1 : -1;
const sortAsc = key => (a, b) => a[key] - b[key];


const rootReducer = (state=initialState,action) => {
	switch (action.type) {
	
   case 'ADD_FAVORITE': {
      return {
         ...state,
        //myFavorites: [...state.allCharacters,action.payload],
        myFavorites: action.payload,
        allCharacters: [...state.allCharacters,action.payload]

            }
     } 
   //  case 'DELETE_FAVORITE':{
   //    return {
   //       ...state,
   //      myFavorites:state.myFavorites //.filter((element, i) => element.id !== action.payload),

   //    }
   // }
    case 'GET_FAVORITE':{
    
      return {
         ...state,
        myFavorites: action.payload
      }  
      
   }
   case 'FILTER':{
      //let {allCharacters} = state
      //let defaulArr = state.myFavorites
      //console.log ('defaulArr ',defaulArr )
      let orderArr = state.myFavorites.filter((element, i) => element.gender === action.payload)
      return {
         ...state,
        //myFavorites:state.myFavorites.filter((element, i) => element.gender === action.payload),
        myFavorites: orderArr,
       }
      }
    case 'ORDER':{
      if (action.payload==='Ascendente'){
      return {
         ...state,
       myFavorites:state.myFavorites.slice().sort(sortAsc('id')),}}
       else { 
       return {
         ...state,myFavorites:state.myFavorites.slice().sort(sortDesc('id')),
              }
        //myFavorites:state.myFavorites.slice().sort(sortAsc('id')),
        }
}
   default:
      return {...state}
  }
};

export default rootReducer;

