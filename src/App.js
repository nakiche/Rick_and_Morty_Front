import './App.css'
import Form from './components/Form.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import Detail from './components/Detail.jsx'
import Favorites from './components/Favorites.jsx'
import Cards from './components/Cards.jsx'
import dumbData from './data.js'
import styled from 'styled-components';
import {useState,useEffect} from 'react'; 
import {Routes,Route,useNavigate,useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner'

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
const [characters, setCharacters] = useState([]);
const username = 'ejemplo@gmail.com';
const password = 'Password1';
const [errors, setErrors] = useState('')
const [isLoading, setIsLoading] = useState(false);

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
      setCharacters([]) 
      navigate('/');
}
 
  useEffect(() => {
   !access && navigate('/');
   setCharacters(dumbData)
}, [access,dumbData]);

let cleanState=()=>{
   setErrors('')
 }
 
  const onSearch  = (character) => {
   character = character.trim()
  if (!character) {
    setErrors("Please enter an id number")
    setTimeout(cleanState, 3000);
    return
  }
   setIsLoading(true);
   fetch(`http://localhost:3001/rickandmorty/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
            setIsLoading(false)
            location.pathname !== "/home" && navigate ('/home')
         }else{
            setErrors(data)
            setTimeout(cleanState, 3000);
            setIsLoading(false)
         }
      })
      .catch((err) => {
      	console.log(err)
         window.alert('Error:' + err);
         setIsLoading(false)
      });

  }

  const onClose = (id) => {
     setCharacters(characters.filter(c => c.id !== id))
     console.log(characters)
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
                    <Cards characters ={characters}  onClose={onClose}/> 
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
