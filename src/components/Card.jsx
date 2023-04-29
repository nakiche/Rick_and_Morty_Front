import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { connect,useDispatch } from "react-redux";
import {  getFavorites } from "../redux/actions";
import axios from "axios";
const DivCard = styled.div`
  border-radius: 25px;
  border: solid 2px;
  display: inline-block;
  padding: 5px;
  background-color: white;
  box-shadow: 0 0 0 0.1rem black;
  position: relative;
`;

const InsideCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Data = styled.div`
  display: flex;
  justify-content: space-around;
`;

const H2 = styled.h2`
  background-color: grey;
  margin: 0;
  //color:white;
  width: 70%;
  font-size: 1.5em;
  position: absolute;
  left: 10px;
  top: 300px;
`;

const DivButton = styled.div`
  display: flex;
  //flex-direction:row-reverse;
  justify-content: space-between;
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color: red;
  color: white;
`;

const FavButton = styled.button`
  background-color: transparent;
  border: none;
`;

export function Card({
  myFavorites,
  allCharacters,
  id,
  name,
  species,
  gender,
  image,
  onClose,

}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isFav, setIsFav] = React.useState(false);

  const handleFavorite = async () => {
    let props = {
      id: id,
      name: name,
      species: species,
      gender: gender,
      image: image,
    };
    if (isFav) {
      try {
        let response = await axios.delete(`http://localhost:3001/rickandmorty/fav/${id}`);
        window.alert(response.data)
        setIsFav(false);
      } catch (error) {
        window.alert(error.message)
      }
      dispatch(getFavorites());
    } else {
      try {
        let response = await axios.post('http://localhost:3001/rickandmorty/fav',props);
        setIsFav(true);
        window.alert(response.data)
      } catch (error) {
        window.alert(error.message)
      }
    }
  };

  React.useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites,id]);

  return (
    <DivCard>
      <DivButton>
        {isFav ? (
          <FavButton onClick={handleFavorite}>❤️</FavButton>
        ) : (
          <FavButton onClick={handleFavorite}>🤍</FavButton>
        )}
        <>
          {location.pathname !== "/favorites" && (
            <Buttons
              onClick={(e) => {
                e.preventDefault();
                onClose(id);
              }}
            >
              X
            </Buttons>
          )}
        </>
      </DivButton>
      <InsideCard>
        <Link to={`/detail/${id}`}>
          <H2>{name}</H2>
        </Link>
        <Data>
          <h2>{species}</h2>
          <h2>{gender}</h2>
        </Data>
        <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
        </Link>
      </InsideCard>
    </DivCard>
  );
}

function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
    allCharacters: state.allCharacters,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    // deleteFavorite: function (id) {
    //   dispatch(deleteFavorite(id));
    // },
    // addFavorite: function (personaje) {
    //   dispatch(addFavorite(personaje));
    // },
    getFavorites: function () {
      dispatch(getFavorites());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
