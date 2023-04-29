import styled from 'styled-components';
import SearchBar from './SearchBar.jsx'
import { Link } from 'react-router-dom';


const Bloque = styled.div`
  background-color:#3D5656;
  margin-bottom:15px;
  display:flex;
  justify-content:flex-end;
`;

const H4 =styled.h4`
  margin-right: 10px;
  margin-top:15px;
  padding:0px;
  color:white;  
  font-size:1.1rem;
  font-family:cursive;
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:red;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

export default function Nav({onSearch,logout,isLoading}) {
   return (
      <Bloque>
      <Link to='/home'>
        <H4>Home</H4>
      </Link>
      <Link to='/about'>
        <H4>About</H4>
      </Link>   
      <Link to='/favorites'>
        <H4>Favorites</H4>
      </Link>
      <Buttons onClick={logout}>Logout</Buttons>
      <SearchBar
         onSearch={onSearch}
         isLoading={isLoading}
        />
      </Bloque>
   );
}