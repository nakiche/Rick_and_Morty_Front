import axios from 'axios';

//const ADD_FAVORITE= 'ADD_FAVORITE';
//const DELETE_FAVORITE= 'DELETE_FAVORITE';
const FILTER='FILTER';
const ORDER='ORDER';
const GET_FAVORITE='GET_FAVORITE';


export const getFavorites  = () => {
  
  // Completa la funcion
  return async (dispatch)=>{
    
    let response = await axios.get(`rickandmorty/fav/`);
    let data = response.data;
  
  return dispatch({
    type:GET_FAVORITE,
    payload:data
  })
}
};

export const filterCards  = (status) => {
  return{
    type:FILTER,
    payload:status
  }
};

export const orderCards  = (id) => {
 
  return{
    type:ORDER,
    payload:id
  }
};