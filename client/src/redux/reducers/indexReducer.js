import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import allusersReducer from './allUsers.reducer';
import travelReducer from './travel.reducer';
import errorReducer from './error.reducer'
import allTravelsReducer from './allTravels.reducer';



//l'appel du reducer est TOUJOURS sous forme de const, 
//il s'est pas mis à la page l'ami redux
// Les reducers ont toujours une sorte de QG, une page qui les regroupe
//Ensuite, grace au provider, on les "distribue", en index de react
// Voir là bas pour l'écriture

//Rappel de comment ça fonctionne
/*
  Un reducer dispose d'un initialstate et d'action
  il a une fonction switch qui prend en paramètre action.type
  où les cases sont les actions qui retournent un payload
  on lui décrit la marche à suivre pour chaque case
  les cases sont importés des fichiers d'actions
  Voire là bas pour les explications sur ce qu'on met chez elles


*/

const reducers = combineReducers({
  userReducer,
  allusersReducer,
  travelReducer,
  errorReducer,
  allTravelsReducer,
  
  
});

export default reducers