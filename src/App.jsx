import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import useTheme from './hooks/useTheme.js'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/Settings/MyAccount.jsx'
import ChangePassword from './pages/Settings/ChangePassword.jsx'
import ChangeTheme from './pages/Settings/ChangeTheme.jsx'
import UpdateHomepage from './pages/update/UpdateHomepage.jsx'
import Users from './pages/Users.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import User from './pages/User/Layout.jsx'
import PersonalInfo from './pages/User/CustomerPersonalInfo.jsx'
import BankDetails from './pages/User/BankDetails.jsx'
import CompanyDetails from './pages/User/CompanyDetails.jsx'
import Payments from './pages/Payments.jsx'
import Payment from './pages/Payment.jsx'
import Customers from './pages/customers/index.jsx'
import CustomerLayout from './pages/customers/CustomerLayout.jsx'
import CustomerPersonalInfo from './pages/User/CustomerPersonalInfo.jsx'
import CustomerCompanyDetails from './pages/customers/CompanyDetails.jsx'
import CustomerBankDetails from './pages/customers/BankDetails.jsx'
import AddCustomer from './pages/AddCustomer.jsx'
import UpdateCustomer from './pages/UpdateCustomer.jsx'
import UpdateFooter from './pages/update/UpdateFooter.jsx'
import Blog from './pages/blog/index.jsx'
import NewPost from './pages/blog/NewPost.jsx'
import GSTR1 from './pages/gst/gstr1.jsx'
import { useContext, useEffect } from 'react'
import { StoreContext } from './store/store-context.js'
import { AUTH_USER } from './store/actions.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import UpdatePost from './pages/blog/UpdatePost.jsx'
import Post from './pages/blog/Post.jsx'

const ITAX_URL = 'http://localhost:3000';

export const queryClient = new QueryClient();

function App() {
  useTheme();

  const [state, dispatch] = useContext(StoreContext);

  const messageHandler = (e) => {
    if(e.origin === ITAX_URL) {
      if(!e.data) {
        return;
      }

      const { data, token } = e.data;

      dispatch({
        type: AUTH_USER,
        payload: {
          user: data,
          token
        }
      });
    }
  };

  const handleOnLoad = () => {
    window.opener.postMessage('loaded', '*');
  };

  useEffect(() => {
    window.addEventListener('message', messageHandler);
    
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  useEffect(() => {
    window.addEventListener('load', handleOnLoad);

    return () => window.removeEventListener('load', handleOnLoad);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path='/users' element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path='/user'>
            <Route path=':id' element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }>
              <Route index element={<PersonalInfo />} />
              <Route path='bank' element={<BankDetails />} />
              <Route path='company' element={<CompanyDetails />} />
            </Route>
          </Route>
          <Route path='/customers' element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
          } />
          <Route path='/customer'>
            <Route path=':id' element={
              <PrivateRoute>
                <CustomerLayout />
              </PrivateRoute>
            }>
              <Route index element={<CustomerPersonalInfo />} />
              <Route path='company' element={<CustomerCompanyDetails />} />
              <Route path='bank' element={<CustomerBankDetails />} />
            </Route>
          </Route>
          <Route path='/add-customer' element={
            <PrivateRoute>
              <AddCustomer />
            </PrivateRoute>
          } />
          <Route path='/update-customer/:id' element={
            <PrivateRoute>
              <UpdateCustomer />
            </PrivateRoute>
          } />
          <Route path='/payments' element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          } />
          <Route path='/payment/:id' element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          } />
          <Route path='/settings/my-account' element={
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
            <ProtectedRoute>
              <UpdateHomepage />
            </ProtectedRoute>
          } />
          <Route path='/update/footer' element={
            <ProtectedRoute>
              <UpdateFooter />
            </ProtectedRoute>
          } />
          <Route path='/blog' element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          } />
          <Route path='/blog/new-post' element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          } />
          <Route path='/blog/update-post/:id' element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          } />
          <Route path='/blog/update-post/:id' element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          } />
          <Route path='/blog/post/:id' element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          } />
          <Route path='/gst/gstr1' element={
            <PrivateRoute>
              <GSTR1 />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
