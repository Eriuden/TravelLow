
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ConnexionForm from './pages/ConnexionForm';
import InscriptionForm from './pages/InscriptionForm';
import Home from './pages/Home';
import TravelPage from './pages/TravelPage';
import UserProfile from './pages/UserProfile';

function App() {
  //TravelPage est la version grand écran de TravelPost
  //D'ou pourquoi l'un est une page et l'autre un component
  return (
    <div className="App">
      <Header/>
      <Routes>
      
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/travelPage/:id" element={<TravelPage/>}/>
        <Route exact path="/userProfile" element={<UserProfile/>}/>
        <Route exact path="/connexion" element={<ConnexionForm/>}/>
        <Route exact path="/inscription" element={<InscriptionForm/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
