import axios from 'axios';

const FILTER='FILTER';
const ORDER='ORDER';
const GET_FAVORITE='GET_FAVORITE';
const GET_CHARACTER='GET_CHARACTER';
const CLOSE_CARD='CLOSE_CARD'


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

export const getCharacter  = (character) => {
  // Completa la funcion
  return async (dispatch)=>{
    let response = await axios.get(`rickandmorty/character/${character}`)
    let data = response.data;
    console.log(data)
  return dispatch({
    type:GET_CHARACTER,
    payload:data
  })
}
};

export const closeCard  = (id) => {
  return{
    type:CLOSE_CARD,
    payload:id
  }
};