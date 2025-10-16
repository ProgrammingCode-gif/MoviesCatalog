import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <header>
          <NavBar />
        </header>
          <AppRoutes />
          
      </Router>
    </QueryClientProvider>
  )
}

export default App
