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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
