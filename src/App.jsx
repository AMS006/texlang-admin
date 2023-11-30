import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/user';
import PrivateRoute from './components/common/PrivateRoute';

import UploadCustomerFiles from './pages/UploadCustomerFiles';
import AddCompany from './pages/company/AddCompany';
import SetCompanyRate from './pages/company/SetCompanyRate';
import PaymentPendingProjects from './pages/company/PaymentPendingProjects';
import UpdatePaidProjects from './pages/company/UpdatePaidProjects';
import CompanyBilling from './pages/company/CompanyBilling';
import AddNewTranslator from './pages/translator/AddNewTranslator';
import AssignTranslator from './pages/translator/AssignTranslator';
import ReAssignTranlator from './pages/translator/ReAssignTranlator';
import GenerateInvoices from './pages/company/GenerateInvoices';
import Invoices from './pages/company/Invoices';
import AddNewUser from './pages/AddNewUser';
import InvoicesStatus from './pages/company/InvoicesStatus';
import RenewExtendContract from './pages/company/RenewExtendContract';
import UpdateWordCountCost from './pages/company/UpdateWordCount&Cost';
import ApproveInvoices from './pages/company/ApproveInvoices';
import ShowInvoicesToSend from './pages/company/ShowInvoicesToSend';
import DownloadFiles from './pages/DownloadFiles';
import InvoiceApprovePage from './pages/InvoiceApprove';
import InvoiceDetailsPage from './pages/InvoiceDetails';
import './App.css';
import CARoute from './components/common/CARoute';
import ApprovePendingInvoices from './pages/companyAdmin/ApprovePendingInvoices';
import ApproveInvoiceDetails from './pages/companyAdmin/ApproveInvoiceDetails';
import InvoiceToSendDetails from './pages/InvoiceToSendDetails';
import PageNotFound from './pages/NotFound/PageNotFound';
import AllTranslators from './pages/translator/AllTranslators';
import TranslatorDetail from './pages/translator/TranslatorDetail';

function App() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setMounted(true);
  }, [])

  useEffect(() => {
    if (localStorage.getItem('authToken'))
      dispatch(getUser())
  }, [dispatch])


  if (!mounted)
    return null;
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='Enterprise' element={<PrivateRoute />}>
          <Route path='AddNewUser' element={<AddNewUser />} />
          <Route path='UploadCustomerFiles' element={<UploadCustomerFiles />} />
          <Route path='DownloadFiles' element={<DownloadFiles />} />
          <Route path='EnterpriseRegistration' element={<AddCompany />} />
          <Route path='SetCompanyRate' element={<SetCompanyRate />} />
          <Route path='PaymentPendingProjects' element={<PaymentPendingProjects />} />
          <Route path='CompanyBilling' element={<CompanyBilling />} />
          <Route path='GenerateInvoices' element={<GenerateInvoices />} />
          {/* <Route path='Invoices' element={<Invoices />} /> */}
          <Route path='InvoicesStatus' element={<InvoicesStatus />} />
          <Route path='ApproveInvoices' element={<ApproveInvoices />} />
          <Route path='RenewExtendContract' element={<RenewExtendContract />} />
          <Route path='UpdatePaidProjects' element={<UpdatePaidProjects />} />
          <Route path='UpdateWordCount&Cost' element={<UpdateWordCountCost />} />
          <Route path='ShowInvoicesToSend' element={<ShowInvoicesToSend />} />
          <Route path='AddNewTranslator' element={<AddNewTranslator />} />
          <Route path='AssignTranslator' element={<AssignTranslator />} />
          <Route path="AllTranslators" element={<AllTranslators />} />
          <Route path="TranslatorDetails/:translatorId" element={<TranslatorDetail />} />
          <Route path='ReAssignTranslator' element={<ReAssignTranlator />} />
          <Route path='InvoiceDetails/:id' element={<InvoiceDetailsPage />} />
          <Route path='InvoiceApprove/:id' element={<InvoiceApprovePage />} />
          <Route path="InvoiceToSendDetails/:id" element={<InvoiceToSendDetails />} />
        </Route>

        <Route path="Invoice" element={<CARoute />}>
          <Route path="ApprovePendingInvoices" element={<ApprovePendingInvoices />} />
          <Route path="InvoiceDetails/:id" element={<ApproveInvoiceDetails />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
