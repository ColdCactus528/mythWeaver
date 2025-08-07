import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CharactersPage from './pages/CharactersPage';
import './App.css'
import OAuthCallbackPage from './pages/OAuthCallbackPage';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<LoginPage />} />
      <Route path = "/characters/" element = {<CharactersPage />} />
      <Route path = "/oauth-callback" element = {<OAuthCallbackPage/>} />
    </Routes>
  )
}
export default App
