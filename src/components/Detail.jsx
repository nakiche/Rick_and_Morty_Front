
import {useState,useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from "./LoadingSpinner";

const DivDetail = styled.div`
   
   display:flex;
   flex-direction:row;
   justify-content:space-evenly; 
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:green;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

const IMG = styled.img`
  border-radius: 5px;
`;

export default function Detail() {

const navigate = useNavigate();
const {id} = useParams()

const [character, setCharacter] = useState({}); 
const [isLoading, setIsLoading] = useState(false);

const backToHome = () => {
  navigate("/home");
}

useEffect(() => {
   //fetch(`https://rickandmortyapi.com/api/character/${id}`)
   setIsLoading(true);
   fetch(`http://localhost:3001/rickandmorty/detail/${id}`)
      .then((response) => response.json())
      .then((char) => {
         if (char.name) {
            setCharacter(char);
            setIsLoading(false)
         } else {
            window.alert('No hay personajes con ese ID');
         }
      })
      .catch((err) => {
      	console.log(err)
         window.alert('Error:' + err);
         setIsLoading(false)
      });
   return setCharacter({});
	}, [id]);
  
  

  return (

      <div>
       {isLoading && <LoadingSpinner /> }
       {
       character.name && 
       <DivDetail>
         <div> 
          <h1>NOMBRE: {character.name}</h1>
          <h3>STATUS: {character.status}</h3>
          <h3>ESPECIE: {character.species}</h3>
          <h3>GÉNERO: {character.gender}</h3>
          <h3>ORIGEN:{character.origin?.name}</h3>
         </div>

         <div>
          <IMG src={character.image} alt=""/>
          
         </div>            
       </DivDetail>
      }
      <Buttons onClick={backToHome}>Go Back</Buttons>
      </div>
  );

}