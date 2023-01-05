import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import useTheme from './hooks/useTheme.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/MyAccount.jsx'
import ChangePassword from './pages/Settings/ChangePassword.jsx'
import ChangeTheme from './pages/Settings/ChangeTheme.jsx'
import UpdateHomepage from './pages/update/UpdateHomepage.jsx'
import Users from './pages/Users.jsx'

function App() {
  useTheme();

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
        <Route path='/settings/change-password' element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        } />
        <Route path='/settings/change-theme' element={
          <PrivateRoute>
            <ChangeTheme />
          </PrivateRoute>
        } />
        <Route path='/update/homepage' element={
          <PrivateRoute>
            <UpdateHomepage />
          </PrivateRoute>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
