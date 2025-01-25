import Container from "./components/Container/Container"
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import api from "./services/api";
function App() {

  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <AppRoutes />
    </Router>
  )
}

export default App
