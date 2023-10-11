import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Experience } from './pages/Experience/Experience';
import { ExperienceRoutes } from './shared/enums/routes.enum';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ExperienceRoutes.Login} element={<Login/>}/>
        <Route path={ExperienceRoutes.Experience} element={<Experience/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
