import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import Signup from './components/Signup';
import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={<Notes/>}/>
      </Routes>
    </div>
  );
}

export default App;
