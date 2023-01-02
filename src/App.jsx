import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/MyAccount.jsx'
import Users from './pages/Users.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/users' element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        <Route path='/my-account' element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
