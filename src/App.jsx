import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import useTheme from './hooks/useTheme.js'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/Settings/MyAccount.jsx'
import ChangePassword from './pages/Settings/ChangePassword.jsx'
// import UpdateHomepage from './pages/update/UpdateHomepage.jsx'
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
// import UpdateFooter from './pages/update/UpdateFooter.jsx'
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
// import InwardSupplies from './pages/gst/inward.jsx'
import InwardSupplies from './pages/gst-new/InwardSupplies'
// import OutwardSupplies from './pages/gst/outward.jsx'
import OutwardSupplies from './pages/gst-new/OutwardSupplies'
import AllServices from './pages/services/AllServices'
// import AllServices from './pages/services1/AllServices'

import AddService from './pages/services/add-service.jsx'
// import AddService from './pages/services1/add-service.jsx'

import UpdateService from './pages/services/update-service.jsx'
// import UpdateService from './pages/services1/update-service.jsx'

import ProjectReport from './pages/ProjectReport'
import PdfViewer from './components/pdfViewer'
import AllLibrary from './pages/e-library/AllLibrary'
import UpdateLibrary from './pages/e-library/UpdateLibrary'
// import CreateLibrary from './pages/e-library/CreateLibrary'
import LoanIndex from './pages/loan/index.jsx'
import ApplyForLoan from './pages/loan/apply.jsx'
import LoanDetails from './pages/loan/details.jsx'
import Applications from './pages/career/index.jsx'
import JobApplicationDetails from './pages/career/application.jsx'
import Orders from './pages/account/Orders.jsx'
import OrderPayments from './pages/account/Payments.jsx'
import OrderDetails from './pages/account/OrderDetails.jsx'
import { useRef } from 'react'
import CreateLoan from './pages/loan/CreateLoan'
import ApplyLoan from './pages/loan/ApplyLoan'
import AllApplicant from './pages/loan/AllApplicant'
import ChooseInsurance from './pages/Insurance/ChooseInsurance'
import InsForm from './pages/Insurance/InsForm'
import InsuranceData from './pages/Admin/InsuranceData'
import Gstr from './pages/gst-new/Gstr'
import HomeInvoice from './pages/Invoice/home.jsx'
import AddParty from './pages/Invoice/add-party'
import AddItem from './pages/Invoice/add-item'
import PartyDetails from './pages/Invoice/Lists/PartyDetails'
import PartyDetailsPage from './pages/Invoice/Lists/PartyDetailsPage'
import ItemDetailsPage from './pages/Invoice/Lists/ItemDetailsPage'
import InvoiceDetailsPage from './pages/Invoice/Lists/InvoiceDetailsPage'
import InvoiceForm from './pages/Invoice/forms/InvoiceForm'
import PartyForm from './pages/Invoice/forms/PartyForm'
import ItemForm from './pages/Invoice/forms/ItemForm'
import Show from './pages/Invoice/download/Show'
// import Invoice from './pages/Invoice/download/Invoice'
import Purchase from './pages/Invoice/Purchase'
import Sales from './pages/Invoice/Sales'
import CreatePurchase from './pages/Invoice/CreatePurchase'
import CreateSales from './pages/Invoice/CreateSales'
import Library from './pages/e-library/new-lib/library1'
import CreateLibrary1 from './pages/e-library/new-lib/CreateLibrary1'
import IndividualLibraryPage from './pages/e-library/new-lib/IndividualLibraryPage'
import CareerForm from './pages/career/career-form'
import NewOrderForm from './pages/account/NewOrderForm'
import OTPPage from './pages/gst-new/login-page'
import TaxableSuppliesForm from './pages/gst-new/supplies/taxable-supplies'
import NonTaxableSuppliesForm from './pages/gst-new/supplies/non-taxable-supplies'
import DebitCreditNotes from './pages/gst-new/supplies/debit-credit-notes'
import IsdTdsTcsForm from './pages/gst-new/supplies/isd-tds-tcs'
import InwardAttractReverse from './pages/gst-new/supplies/inward-attract-reverse-charge'
import AdvancePaid from './pages/gst-new/supplies/advance-paid'
import AdvanceAdjusted from './pages/gst-new/supplies/advance-adjusted'
import ReversalOfCredit from './pages/gst-new/supplies/reversal-of-credit'
import MismatchAdjustment from './pages/gst-new/supplies/mismatch-adjusted'
import CarLoan from './pages/loan/loan-types/car-loan'
import BusinessLoan from './pages/loan/loan-types/business-loan'
import HomeLoan from './pages/loan/loan-types/home-loan'
import PersonalLoan from './pages/loan/loan-types/personal-loan'
import PropertyLoan from './pages/loan/loan-types/property-loan'
import LoanApplication from './pages/loan/loan-types/loan-application'
import BajajCapital from './pages/Insurance/BajajCapital'
import BajajBasicDetails from './pages/Insurance/BajajComponents/BajajBasicDetails'
import BajajVehicleDetails from './pages/Insurance/BajajComponents/BajajVehicleDetails'
import BajajCarInsurancePage from './pages/Insurance/BajajComponents/BajajCarInsurancePage'

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
           <Route path='/invoice' element={
            <PrivateRoute>
              <HomeInvoice />
            </PrivateRoute>
          } />
           <Route path='/invoice/form' element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          } />

           <Route path='/invoice/invoices/:id' element={
            <PrivateRoute>
              <InvoiceDetailsPage />
            </PrivateRoute>
          } />
           <Route path='/invoice/addparty' element={
            <PrivateRoute>
              <AddParty  />
            </PrivateRoute>
          } />
           <Route path='/invoice/addparty/form' element={
            <PrivateRoute>
              <PartyForm  />
            </PrivateRoute>
          } />
          <Route path='/invoice/addparty/:id' element={
            <PrivateRoute>
              <PartyDetailsPage />
            </PrivateRoute>
          } />
           <Route path='/invoice/createitem' element={
            <PrivateRoute>
              <AddItem />
            </PrivateRoute>
          } />
          <Route path='/invoice/createitem/form' element={
            <PrivateRoute>
              <ItemForm />
            </PrivateRoute>
          } />
           <Route path='/invoice/purchase' element={
            <PrivateRoute>
              <Purchase />
            </PrivateRoute>
          } />
          <Route path='/invoice/create/purchase' element={
            <PrivateRoute>
              <CreatePurchase />
            </PrivateRoute>
          } />
          <Route path='/invoice/create/sales' element={
            <PrivateRoute>
              <CreateSales />
            </PrivateRoute>
          } />
          <Route path='/invoice/sales' element={
            <PrivateRoute>
              <Sales />
            </PrivateRoute>
          } />
          <Route path='/invoice/pdf' element={
            <PrivateRoute>
             {/* <Invoice /> */}
             <Show />
            </PrivateRoute>
          } />
          <Route path='/invoice/createitem/:id' element={
            <PrivateRoute>
              <ItemDetailsPage />
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
          <Route path='/loan/apply-loan' element={
            <PrivateRoute>
              <ApplyLoan />
            </PrivateRoute>
          } />
          <Route path='/loan/all' element={
            <PrivateRoute>
              <AllApplicant />
            </PrivateRoute>
          } />
           <Route path='/loan/create' element={
            <PrivateRoute>
              <CreateLoan />
            </PrivateRoute>
          } />
          <Route path='/loan/l/:id' element={
            <PrivateRoute>
              <LoanDetails />
            </PrivateRoute>
          } />
           <Route path='/loan/car' element={
            <PrivateRoute>
              <CarLoan  />
            </PrivateRoute>
          } />
           <Route path='/loan/business' element={
            <PrivateRoute>
              <BusinessLoan  />
            </PrivateRoute>
          } />
          <Route path='/loan/home' element={
            <PrivateRoute>
              <HomeLoan  />
            </PrivateRoute>
          } />
          <Route path='/loan/personal' element={
            <PrivateRoute>
              <PersonalLoan  />
            </PrivateRoute>
          } />
          <Route path='/loan/property' element={
            <PrivateRoute>
              <PropertyLoan  />
            </PrivateRoute>
          } />
           <Route path='/loan/application' element={
            <PrivateRoute>
              <LoanApplication />
            </PrivateRoute>
          } />
          <Route path='/orders' element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />
           <Route path='/orders/create' element={
            <PrivateRoute>
              <NewOrderForm  />
            </PrivateRoute>
          } />
          <Route
            path="/insurance"
            element={
              <PrivateRoute>
                <ChooseInsurance />
              </PrivateRoute>
            }
          />
          <Route
            path="/insurance/form"
            element={
              <PrivateRoute>
                <InsForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/insurance/bajajCapital"
            element={
              <PrivateRoute>
                <BajajCapital />
              </PrivateRoute>
            }
          />
          <Route
            path='/insurance/bajajCapital/basicDetails'
            element={
              <PrivateRoute>
                <BajajBasicDetails />
              </PrivateRoute>
            }
          />
          <Route
            path='/insurance/bajajCapital/vehicleDetails'
            element={
              <PrivateRoute>
                <BajajVehicleDetails />
              </PrivateRoute>
            }
          />
          <Route
            path='/insurance/bajajCapital/carInsurance'
            element={
              <PrivateRoute>
                <BajajCarInsurancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/insurance"
            element={
              <PrivateRoute>
                <InsuranceData />
              </PrivateRoute>
            }
          />
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
           <Route path='/career/create' element={
            <ProtectedRoute>
              <CareerForm />
            </ProtectedRoute>
          } />
          <Route path='/career/application/:id' element={
            <ProtectedRoute>
              <JobApplicationDetails />
            </ProtectedRoute>
          } />
          <Route path='/update/homepage' element={
            // <ProtectedRoute>
            //   <UpdateHomepage />
            // </ProtectedRoute>
            <UpdateHomepage />
          } />
          <Route path='/update/footer' element={
            // <ProtectedRoute>
            //   <UpdateFooter />
            // </ProtectedRoute>
            <UpdateFooter />
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
          {/* <Route path='/services' element={
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
          } /> */}

           <Route path='/services' element={
            // <ProtectedRoute>
            //   <AllServices/>
            // </ProtectedRoute>
            <AllServices  />
          } />
          <Route path='/services/add-service' element={
            // <ProtectedRoute>
              <AddService/>
            // </ProtectedRoute>
          } />
          <Route path='/services/update-service/:id' element={
            // <ProtectedRoute>
              <UpdateService/>
            // </ProtectedRoute>
          } />
          <Route path='/e-library' element={
            // <ProtectedRoute>
            // <Library />
            // </ProtectedRoute>
            <Library />
          } />
          <Route path='/e-library/update-library/:id' element={
          //    <ProtectedRoute>
          //   <IndividualLibraryPage  />
          //  </ProtectedRoute>
              // <UpdateLibrary />
              <IndividualLibraryPage  />
          } />
          <Route path='/e-library/add-library' element={
            //  <ProtectedRoute>
           
            // <CreateLibrary1 />
            //  </ProtectedRoute>
              <CreateLibrary1 />
          } />
         
          <Route path='/gst/gstr' element={
            <PrivateRoute>
              {/* <GSTR /> */}
              <Gstr />
            </PrivateRoute>
          } />

          <Route path='/gst/login' element={
            <PrivateRoute>
             <OTPPage  />
            </PrivateRoute>
          } />

          <Route path='/gst/taxable-supplies' element={
            <PrivateRoute>
             <TaxableSuppliesForm />
            </PrivateRoute>
          } />

          <Route path='/gst/non-taxable-supplies' element={
            <PrivateRoute>
             <NonTaxableSuppliesForm/>
            </PrivateRoute>
          } />

          <Route path='/gst/debit-credit' element={
            <PrivateRoute>
             <DebitCreditNotes/>
            </PrivateRoute>
          } />

           <Route path='/gst/isd-tds' element={
            <PrivateRoute>
             <IsdTdsTcsForm/>
            </PrivateRoute>
          } />

          <Route path='/gst/iarc' element={
            <PrivateRoute>
             <InwardAttractReverse/>
            </PrivateRoute>
          } />

          <Route path='/gst/advance-paid' element={
            <PrivateRoute>
             <AdvancePaid/>
            </PrivateRoute>
          } />

          <Route path='/gst/advances-adjusted' element={
            <PrivateRoute>
             <AdvanceAdjusted/>
            </PrivateRoute>
          } />
          
          <Route path='/gst/roc' element={
            <PrivateRoute>
             <ReversalOfCredit/>
            </PrivateRoute>
          } />

          <Route path='/gst/mismatch-adjustments' element={
            <PrivateRoute>
             <MismatchAdjustment/>
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

          <Route index path='/gst/gstr/file-return' element={
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
              {/* <InwardSupplies /> */}
              <InwardSupplies />
            </PrivateRoute>
          } />
          <Route path='/gst/outward-supplies' element={
            <PrivateRoute>
              <OutwardSupplies />
              {/* <OutwardSupplies /> */}
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
