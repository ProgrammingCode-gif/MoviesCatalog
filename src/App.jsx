import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar/NavBar";
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
