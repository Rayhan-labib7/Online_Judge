
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import { Context } from "./context/Context";
import AddProblem from "./pages/addProblem/AddProblem";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Problemset from "./pages/problemset/Problemset";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
//  import SingleProblem from "./pages/singleProblem/SingleProblem";
import SingleProblem from './pages/singleProblem/SingleProblem.jsx'
function App() {

  const {user} = useContext(Context);
  return (
    <>
    <Router>
    <TopBar /> 
    
    <Routes> 
      <Route path="/" element={ <Home/> } />
      <Route path="/register" element={ user ? <Home/> : <Register/> }/>
      <Route path="/login" element={ user ? <Home/> : <Login/> }/>
      <Route path="/addproblem" element={ user ? <AddProblem/> : <Register /> }/>
      <Route path="/problemset" element={ user ? <Problemset/> : <Register/> } />
      <Route path="/settings" element={ user ? <Settings/> : <Register/> } />
     <Route path="/problem/:problemId" element= { <SingleProblem/> }/>
    </Routes>
    </Router>
    </>
    
  );
}

export default App;
