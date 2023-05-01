import { ADD_FAVORITE, FILTER, ORDER, GET_FAVORITE,CLOSE_CARD } from "./actions";
import dumbData from '../data.js'

const initialState = {
  myFavorites: [],
  allCharacters: dumbData,
};

const sortDesc = (key) => (a, b) => a[key] < b[key] ? 1 : -1;
const sortAsc = (key) => (a, b) => a[key] - b[key];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      return {
        ...state,
        myFavorites: action.payload,
      };
    }

    case "GET_FAVORITE": {
      return {
        ...state,
        myFavorites: action.payload,
      };
    }
    case "FILTER": {
      let orderArr = state.myFavorites.filter(
        (element, i) => element.gender === action.payload
      );
      return {
        ...state,
        myFavorites: orderArr,
      };
    }
    case "ORDER": {
      if (action.payload === "Ascendente") {
        return {
          ...state,
          myFavorites: state.myFavorites.slice().sort(sortAsc("id")),
        };
      } else {
        return {
          ...state,
          myFavorites: state.myFavorites.slice().sort(sortDesc("id")),
        };
      }
    }
    case "GET_CHARACTER": {
      return {
        ...state,
        allCharacters: state.allCharacters.concat(action.payload)
      };
    }

    case "CLOSE_CARD": {
      return {
        ...state,
        allCharacters: state.allCharacters.filter(c => c.id !== action.payload)
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
