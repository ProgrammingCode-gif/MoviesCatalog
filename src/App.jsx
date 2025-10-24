import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
function App() {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <header>
            <NavBar />
          </header>
            <AppRoutes />
            
        </Router>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
