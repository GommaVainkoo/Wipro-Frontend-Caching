
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRouter'
import {AuthProvider} from './context/AuthContext'
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
        
        

        <Routes>
                <Route path="/login" element={<LoginPage />} />  
                <Route path='/register' element={<Register/>}/>
                
                  <Route element={<PrivateRoute/>}>

                    <Route element={<HomePage/>} path='/'exact/>

                  </Route>
                
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
