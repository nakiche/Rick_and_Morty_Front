import './App.css'
import Form from './components/Form.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import Detail from './components/Detail.jsx'
import Favorites from './components/Favorites.jsx'
import Cards from './components/Cards.jsx'
import styled from 'styled-components';
import {useState,useEffect} from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import {Routes,Route,useNavigate,useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner'
import {getCharacter,closeCard} from "./redux/actions";

const DivGral = styled.div`
   //display: flex;
   background-color:location.pathname !== '/' ? grey: red;
   margin: 0 auto;
`;

const DivCards = styled.div`
   display: flex;
   flex-wrap:wrap;
   justify-content :space-around;
`;

const DivError = styled.div`
   border-radius:5px;
   display:inline-block;
   background-color:#F5293A;
   width:auto;
   margin:0;
   color: white;
   font-size:1rem;
`;

function App () {
const location = useLocation()    
const navigate = useNavigate();
const [access, setAccess] = useState(false);
const username = 'ejemplo@gmail.com';
const password = 'Password1';
const [errors, setErrors] = useState('')
const [isLoading, setIsLoading] = useState(false);
const dispatch = useDispatch();
const allCharacters = useSelector((state) => state.allCharacters);
//const [characters, setCharacters] = useState([allCharacters]);

 function login(userData) {
   if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate('/home');   
   }else{
      window.alert('Wrong password or username')
   }
}

 function logout() {
      setAccess(false);
      //setCharacters([]) 
      navigate('/');
}
 
  useEffect(() => {
   !access && navigate('/');
   async function fetchData() {
      try {
         //setCharacters([characters.concat(dumbData)])
      } catch (error) {
         console.log(error)
      }
   }
   fetchData();
}, [access,navigate]);

console.log(allCharacters)

let cleanState=()=>{
   setErrors('')
 }
 
  const onSearch  = async (character) => {
   character = character.trim()
  if (!character) {
    setErrors("Please enter an id number")
    setTimeout(cleanState, 3000);
    return
  }
 
  if (allCharacters.some(e=>e.id===Number(character))) {
   setErrors(`Character with id: ${character} already on screen`)
   setTimeout(cleanState, 3000);
   return
 }
   setIsLoading(true);
   //fetch(`http://localhost:3001/rickandmorty/character/${character}`)
   try {
   let data = await dispatch(getCharacter(character))
   //let response = await axios.get(`rickandmorty/character/${character}`)
   //let data = response.data;
   //console.log(data)
     
         //if (data.name) {
         if (data) {
           // setCharacters((oldChars) => [...oldChars, data]);
            setIsLoading(false)
            location.pathname !== "/home" && navigate ('/home')
         }else{
            setErrors(data)
            setTimeout(cleanState, 3000);
            setIsLoading(false)
         }
   } catch (error) {
         setErrors(error.response.data)
         setTimeout(cleanState, 3000);
         setIsLoading(false)
   }
  }

  const onClose = (id) => {
     //setCharacters(characters.filter(c => c.id !== id))
     dispatch(closeCard(id))
    }

  return (
   
<DivGral className={location.pathname !== '/' ? 'App': 'AppNotLogged'}>   
   <div>{location.pathname !== '/' && <Nav onSearch={onSearch} isLoading={isLoading} logout={logout}/>}</div>    
      {errors && <DivError ><p>{errors}</p></DivError>}     
      {location.pathname !== '/' && <hr />}
      {isLoading && <LoadingSpinner /> }
      <Routes>     
            <Route path='/' element={<Form login={login} />}/>     
            <Route path='/home' element={ 
               <DivCards>
                    <Cards characters ={allCharacters && allCharacters}  onClose={onClose}/> 
               </DivCards>         
                                        }/>            
            <Route path='/about' element={<About />}/>
            <Route path='/favorites' element={<Favorites />}/>
            <Route path='/detail/:id' element={<Detail />}/>
      </Routes>
      {location.pathname !== '/' && <hr />}
    </DivGral>    
  )
}

export default App
