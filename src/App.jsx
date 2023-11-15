import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import { useEffect, useState } from 'react';
import { getUser } from './redux/actions/user';
import { useDispatch } from 'react-redux';
import AddCompany from './pages/company/AddCompany';
import PrivateRoute from './components/common/PrivateRoute';
import AddNewUser from './pages/AddNewUser';
import UploadCustomerFiles from './pages/UploadCustomerFiles';
import DownloadFiles from './pages/DownloadFiles';
import SetCompanyRate from './pages/company/SetCompanyRate';
import PaymentPendingProjects from './pages/company/PaymentPendingProjects';
import CompanyBilling from './pages/company/CompanyBilling';
import AddNewTranslator from './pages/translator/AddNewTranslator';
import AssignTranslator from './pages/translator/AssignTranslator';
import ReAssignTranlator from './pages/translator/ReAssignTranlator';
import GenerateInvoices from './pages/company/GenerateInvoices';
import Invoices from './pages/company/Invoices';
import InvoicesStatus from './pages/company/InvoicesStatus';
import RenewExtendContract from './pages/company/RenewExtendContract';
import UpdatePaidProjects from './pages/company/UpdatePaidProjects';
import UpdateWordCountCost from './pages/company/UpdateWordCount&Cost';
import ApproveInvoices from './pages/company/ApproveInvoices';
import ShowInvoicesToSend from './pages/company/ShowInvoicesToSend';
import InvoicePage from './pages/Invoice';

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
          <Route path='Invoice/:id' element={<InvoicePage />} />
          <Route path='EnterpriseRegistration' element={<AddCompany />} />
          <Route path='SetCompanyRate' element={<SetCompanyRate />} />
          <Route path='PaymentPendingProjects' element={<PaymentPendingProjects />} />
          <Route path='CompanyBilling' element={<CompanyBilling />} />
          <Route path='GenerateInvoices' element={<GenerateInvoices />} />
          <Route path='Invoices' element={<Invoices />} />
          <Route path='InvoicesStatus' element={<InvoicesStatus />} />
          <Route path='ApproveInvoices' element={<ApproveInvoices />} />
          <Route path='RenewExtendContract' element={<RenewExtendContract />} />
          <Route path='UpdatePaidProjects' element={<UpdatePaidProjects />} />
          <Route path='UpdateWordCount&Cost' element={<UpdateWordCountCost />} />
          <Route path='ShowInvoicesToSend' element={<ShowInvoicesToSend />} />
          <Route path='AddNewTranslator' element={<AddNewTranslator />} />
          <Route path='AssignTranslator' element={<AssignTranslator />} />
          <Route path='ReAssignTranslator' element={<ReAssignTranlator />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
