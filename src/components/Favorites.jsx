import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { orderCards, filterCards, getFavorites } from "../redux/actions";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

const DivCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`;

export function Favorites() {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function fetchData() {
      //setIsLoading(true);
      try {
        dispatch(getFavorites());
        setIsLoading(false);
      } catch (error) {
        window.alert(error.message);
      }
    }
    fetchData();
  }, [dispatch]);
  
  const handleOrder = (e) => {
    dispatch(orderCards(e.target.value));
  };

  const handleGender = (e) => {
    dispatch(filterCards(e.target.value));
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <select
        name=""
        id=""
        onChange={(e) => {
          e.preventDefault();
          handleOrder(e);
        }}
      >
        <option value="">--Order by--</option>
        <option value="Ascendente">Asc id</option>
        <option value="Descendente">Desc id</option>
      </select>

      <select
        name=""
        id=""
        onChange={(e) => {
          e.preventDefault();
          handleGender(e);
        }}
      >
        <option value="">--Filter by--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
      <DivCards>
        {myFavorites.length > 0 ? (
          myFavorites.map((c, b) => (
            <Card
              key={b}
              id={c.id}
              name={c.name}
              species={c.species}
              gender={c.gender}
              image={c.image}
            />
          ))
        ) : (
          <h2>There are no favorites</h2>
        )}
      </DivCards>
    </div>
  );
}

export default Favorites;
