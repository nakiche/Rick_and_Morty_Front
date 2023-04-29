import React from "react";
import styled from 'styled-components';
import Validate from './Validate.js';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 2px;
   display:inline-block;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.1rem black;
   position:relative;
   margin-top:20px;
`;

const InsideCard = styled.div`
   display:flex;
   flex-direction:column;
   padding:20px
   `;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:grey;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;


export default function Form({login}) {


const [errors, setErrors] = React.useState({
   username: '',
   password: ''
});

const [userData, setUserData] = React.useState({ 
  username: '', 
  password: '' 
});

const handleSubmit = (userData) =>{
  login(userData);
}

const handleInputChange  = (evento) =>{
  setUserData({
      ...userData,
     [evento.target.name]: evento.target.value, // Sintaxis ES6 para actualizar la key correspondiente
    });

  setErrors(
   Validate({
      ...userData,
      [evento.target.name]: evento.target.value,
   })
  );

 }

  return (
      <DivCard>
        
        <InsideCard>   
            <label htmlFor="">Username:</label>
            <input 
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="Escribe tu email..."
            />
            <p style={{fontSize: '15px',
                       color: 'red'}}>{errors.username}
            </p>
            <label htmlFor="">Password:</label>
            <input 
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Escribe tu password..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.password}</p>

            <Buttons disabled={userData.username.length > 4 && userData.password.length> 6 && !errors.username && !errors.password ? false : true} onClick={(e)=>{
              e.preventDefault();
              handleSubmit(userData);
            }}>LOGIN</Buttons>
        </InsideCard>
        

      </DivCard>
      
  );
}