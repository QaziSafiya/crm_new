import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import useTheme from './hooks/useTheme.js'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/Settings/MyAccount.jsx'
import ChangePassword from './pages/Settings/ChangePassword.jsx'
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
import GSTR from './pages/gst/gstr/gstr.jsx'
import GSTR1 from './pages/gst/gstr1/gstr1.jsx'
import GSTR2a from './pages/gst/gstr2a/gstr2a.jsx'
import GSTR3b from './pages/gst/gstr3b/gstr3b.jsx'
import FileReturn from './pages/gst/fileReturn/FileReturn'
import { useContext, useEffect } from 'react'
import { StoreContext } from './store/store-context.js'
import { AUTH_FROM_REDIRECT, AUTH_USER, TOGGLE_SIDEBAR } from './store/actions.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import UpdatePost from './pages/blog/UpdatePost.jsx'
import Post from './pages/blog/Post.jsx'
import Ledger from './pages/gst/gstr/ledger.jsx'
import InwardSupplies from './pages/gst/inward.jsx'
import OutwardSupplies from './pages/gst/outward.jsx'
import AllServices from './pages/services/AllServices'
import AddService from './pages/services/add-service.jsx'
import UpdateService from './pages/services/update-service.jsx'
import ProjectReport from './pages/ProjectReport'
import PdfViewer from './components/pdfViewer'
import AllLibrary from './pages/e-library/AllLibrary'
import UpdateLibrary from './pages/e-library/UpdateLibrary'
import CreateLibrary from './pages/e-library/CreateLibrary'
import LoanIndex from './pages/loan/index.jsx'
import ApplyForLoan from './pages/loan/apply.jsx'
import LoanDetails from './pages/loan/details.jsx'
import Applications from './pages/career/index.jsx'
import JobApplicationDetails from './pages/career/application.jsx'
import Orders from './pages/account/Orders.jsx'
import OrderPayments from './pages/account/Payments.jsx'
import OrderDetails from './pages/account/OrderDetails.jsx'
import { useRef } from 'react'

const ITAX_URL = 'https://itaxeasy.com';

export const queryClient = new QueryClient();

function App() {
  useTheme();

  const [state, dispatch] = useContext(StoreContext);

  const resized = useRef();

  const messageHandler = (e) => {
    if(e.origin === ITAX_URL) {
      if(!e.data) {
        return;
      }

      console.log(e.data)

      const { data, token, redirect } = e.data;

      console.log('RECIEVED TOKEN');

      dispatch({
        type: AUTH_FROM_REDIRECT,
        payload: {
          user: data,
          token,
          redirect,
        }
      });
    }
  };

  const handleOnLoad = () => {
    window.opener?.postMessage('loaded', '*');
  };

  useEffect(() => {
    if(!window.opener) {
      return;
    }

    window.addEventListener('message', messageHandler);
    
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  useEffect(() => {
    window.addEventListener('load', handleOnLoad);

    return () => window.removeEventListener('load', handleOnLoad);
  }, []);

  useEffect(() => {
    if(window.innerWidth > 425 || resized.current) {
      return;
    }

    resized.current = true;

    dispatch({
      type: TOGGLE_SIDEBAR,
    });
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
          <Route path='/pdfViewer' element={<PdfViewer />} />
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
          <Route path='/loan' element={
            <PrivateRoute>
              <LoanIndex />
            </PrivateRoute>
          } />
          <Route path='/loan/apply' element={
            <PrivateRoute>
              <ApplyForLoan />
            </PrivateRoute>
          } />
          <Route path='/loan/l/:id' element={
            <PrivateRoute>
              <LoanDetails />
            </PrivateRoute>
          } />
          <Route path='/orders' element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />
          <Route path='/order/:id' element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          } />
          <Route path='/orders/payments' element={
            <PrivateRoute>
              <OrderPayments />
            </PrivateRoute>
          } />
          <Route path='/career' element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          } />
          <Route path='/career/application/:id' element={
            <ProtectedRoute>
              <JobApplicationDetails />
            </ProtectedRoute>
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
          <Route path='/services' element={
            <ProtectedRoute>
              <AllServices/>
            </ProtectedRoute>
          } />
          <Route path='/services/add-service' element={
            <ProtectedRoute>
              <AddService/>
            </ProtectedRoute>
          } />
          <Route path='/services/update-service/:id' element={
            <ProtectedRoute>
              <UpdateService/>
            </ProtectedRoute>
          } />
          <Route path='/e-library' element={
            <ProtectedRoute>
              <AllLibrary />
            </ProtectedRoute>
          } />
          <Route path='/e-library/update-library/:id' element={
            <ProtectedRoute>
              <UpdateLibrary />
            </ProtectedRoute>
          } />
          <Route path='/e-library/add-library' element={
            <ProtectedRoute>
              <CreateLibrary />
            </ProtectedRoute>
          } />
          <Route path='/gst/gstr' element={
            <PrivateRoute>
              <GSTR />
            </PrivateRoute>
          } />
          <Route path='/gst/gstr1' element={
            <PrivateRoute>
              <GSTR1 />
            </PrivateRoute>
          } />
          <Route path='/gst/gstr2a' element={
            <PrivateRoute>
              <GSTR2a />
            </PrivateRoute>
          } />
          <Route path='/gst/gstr3b' element={
            <PrivateRoute>
              <GSTR3b />
            </PrivateRoute>
          } />
          <Route path='/gst/gstr/file-return' element={
            <PrivateRoute>
                <FileReturn />
            </PrivateRoute>
          } />
          <Route path='/gst/gstr/ledger' element={
            <PrivateRoute>
              <Ledger />
            </PrivateRoute>
          } />
          <Route path='/gst/inward-supplies' element={
            <PrivateRoute>
              <InwardSupplies />
            </PrivateRoute>
          } />
          <Route path='/gst/outward-supplies' element={
            <PrivateRoute>
              <OutwardSupplies />
            </PrivateRoute>
          } />
          <Route path='/project-report' element={
            <PrivateRoute>
              <ProjectReport />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
