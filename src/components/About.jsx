import React from "react";
import styled from 'styled-components';

const DivCard = styled.div`
   border-radius: 25px;
   border: solid 2px;
   display:inline-block;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.1rem black;
   position:relative;
`;

const InsideCard = styled.div`
   display:flex;
   flex-direction:column-reverse;
   `;

const Data = styled.div`
   display:flex;
   justify-content:space-around; 
   `;

const H2 = styled.h2`
   background-color : grey;
   margin:0;
   color:white;
   width: 70%;
   font-size: 1.5em;
   position: absolute; left: 10px; top: 300px;
`;

const DivButton = styled.div`
 display:flex;
 flex-direction:row-reverse;
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:red;
  color:white;  
`;

const IMG = styled.img`
  border-radius: 5px;
  margin:5px;
`;

export default function About() {
 
  return (

      
      <DivCard>
        
        <InsideCard>   
            <H2>Thomas Naquiche</H2>
          <Data> 
            <h2>Human</h2>
            <h2>Male</h2>
          </Data>  
            <IMG  src="https://rickandmortyapi.com/api/character/avatar/121.jpeg" alt="" />
        </InsideCard>
        

      </DivCard>
      
  );
}
