import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/actions/user'
import { NavLink } from 'react-router-dom'
import { BsChevronDown } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Roles } from '../../data/constants'

const companyNavbarData = [
    { name: 'Add New Company', link: '/Enterprise/EnterpriseRegistration' },
    { name: 'Set Rate', link: '/Enterprise/SetCompanyRate' },
    { name: 'Payment Pending Projects', link: '/Enterprise/PaymentPendingProjects' },
    { name: 'Company Billing', link: '/Enterprise/CompanyBilling' },
    { name: 'Update Word Count & Cost', link: '/Enterprise/UpdateWordCount&Cost' },
    { name: 'Update Paid Projects', link: '/Enterprise/UpdatePaidProjects' },
    { name: 'Renew/Extend Contract', link: '/Enterprise/RenewExtendContract' },
    { name: 'Generate Invoices', link: '/Enterprise/GenerateInvoices' },
    { name: 'Approve Invoices', link: '/Enterprise/ApproveInvoices' },
    { name: 'Show Invoices to Send', link: '/Enterprise/ShowInvoicesToSend' },
    // { name: 'Invoices', link: '/Enterprise/Invoices' },
    { name: 'Invoices Status', link: '/Enterprise/InvoicesStatus' }
]
const translatorNavbarData = [
    { name: 'Add New Translator', link: '/Enterprise/AddNewTranslator' },
    { name: 'Assign Translator', link: '/Enterprise/AssignTranslator' },
    { name: 'Re-Assign Translator', link: '/Enterprise/ReAssignTranslator' },
]

const NavbarSm = ({ open, setOpen }) => {
    const [companyNavbarOpen, setCompanyNavbarOpen] = useState(false)
    const [translatorNavbarOpen, setTranslatorNavbarOpen] = useState(false)
    return (
        <SlidingPane isOpen={open} onRequestClose={() => setOpen(false)} className='lg:hidden flex' from='left' width='300px'>
            <nav className={`lg:hidden h-full  flex flex-col gap-2.5 font-semibold font-sans max-w-[300px] transition-all duration-200 ease-in-out no-print`}>
                <NavLink to='/EnterPrise/UploadCustomerFiles' onClick={() => setOpen(false)} className='hover:bg-[#c6c9cc75] w-full px-2  py-1.5 rounded'>Upload Customer Files</NavLink>
                <div className='relative w-full' >
                    <button className='flex items-center justify-between w-full px-2 gap-1.5 select-none' onClick={() => setCompanyNavbarOpen((prev) => !prev)}>
                        <span>Company</span>
                        <BsChevronDown />
                    </button>
                    <div className={`${companyNavbarOpen ? 'h-auto py-2' : 'h-0 overflow-hidden'} transition-height flex flex-col gap-1.5 items-start w-full `}>
                        {companyNavbarData.map((item, index) => (
                            <NavLink key={index} className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded w-full' onClick={() => setOpen(false)} to={item.link}>{item.name}</NavLink>
                        ))}
                    </div>
                </div>
                <NavLink to={'/Enterprise/AddNewUser'} onClick={() => setOpen(false)} className='hover:bg-[#c6c9cc75] w-full px-2  py-1.5 rounded'>Add New User</NavLink>
                <div className='relative w-full' >
                    <button className='flex items-center justify-between w-full gap-1.5 px-2 select-none' onClick={() => setTranslatorNavbarOpen((prev) => !prev)}>
                        <span>Translator</span>
                        <BsChevronDown />
                    </button>
                    <div className={`${!translatorNavbarOpen ? 'h-0 overflow-hidden' : 'h-auto'} flex flex-col gap-1.5 px-2.5 py-1.5 p-1.5`}>
                        {translatorNavbarData.map((item, index) => (
                            <NavLink key={index} className='hover:bg-[#c6c9cc75] p-1.5 rounded' to={item.link} onClick={() => setOpen(false)}>{item.name}</NavLink>
                        ))}
                    </div>
                </div>
                <NavLink to={'/Enterprise/DownloadFiles'} onClick={() => setOpen(false)} className='hover:bg-[#c6c9cc75] w-full px-2  py-1.5 rounded'>Download Files</NavLink>
            </nav>
        </SlidingPane>
    )
}
const NavbarLg = () => {
    const [companyNavbarOpen, setCompanyNavbarOpen] = useState(false)
    const [translatorNavbarOpen, setTranslatorNavbarOpen] = useState(false)
    return (
        <nav className='lg:flex hidden justify-between items-center gap-6 font-semibold font-sans'>
            <NavLink to='/EnterPrise/UploadCustomerFiles' className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded'>Upload Customer Files</NavLink>
            <div className='relative' onMouseOver={() => setCompanyNavbarOpen(true)} onMouseOut={() => setCompanyNavbarOpen(false)}>
                <div className='flex items-center gap-1.5'>
                    <span>Company</span>
                    <BsChevronDown />
                </div>
                <div className={`${companyNavbarOpen ? 'flex' : 'hidden'} flex-col gap-1 absolute z-20 top-[24px] -left-4 bg-white shadow border p-1.5 min-w-[240px]`}>
                    {companyNavbarData.map((item, index) => (
                        <NavLink key={index} className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded' to={item.link}>{item.name}</NavLink>
                    ))}
                </div>
            </div>
            <NavLink to={'/Enterprise/AddNewUser'} className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded'>Add New User</NavLink>
            <div className='relative' onMouseOver={() => setTranslatorNavbarOpen(true)} onMouseOut={() => setTranslatorNavbarOpen(false)}>
                <div className='flex items-center gap-1.5'>
                    <span>Translator</span>
                    <BsChevronDown />
                </div>
                <div className={`${translatorNavbarOpen ? 'flex' : 'hidden'} flex-col gap-1.5 absolute z-20 top-[24px] -left-4 bg-white shadow border px-2.5 py-1.5 p-1.5 min-w-[240px]`}>
                    {translatorNavbarData.map((item, index) => (
                        <NavLink key={index} className='hover:bg-[#c6c9cc75] p-1.5 rounded' to={item.link}>{item.name}</NavLink>
                    ))}
                </div>
            </div>
            <NavLink to={'/Enterprise/DownloadFiles'} className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded'>Download Files</NavLink>
        </nav>
    )
}
const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <div className='flex justify-between items-center px-4 p-2 no-print shadow-xl  border-b bg-[#f8f8f8]'>
            <div className='no-print'>
                <img src={logo} alt="TexLang" />
            </div>
            {user?.role === Roles.MEGDAP_ADMIN &&
                <>
                    <NavbarLg />
                    <NavbarSm open={navbarOpen} setOpen={setNavbarOpen} />
                </>}
            {user?.role === Roles.COMPANY_ADMIN &&
                <nav className='flex'>
                    <NavLink to={'/Invoice/ApprovePendingInvoices'} className='hover:bg-[#c6c9cc75] px-2.5 py-1.5 rounded font-semibold'>Approve Pending Invoices</NavLink>
                </nav>
            }
            <div className='flex items-center gap-1.5 no-print'>
                <button className='bg-blue-700 px-2.5 py-1.5 text-white no-print rounded font-semibold hover:bg-opacity-90' onClick={handleLogout}>
                    Logout
                </button>
                <button className='lg:hidden block no-print'>
                    <FaBars size={24} onClick={() => setNavbarOpen((prev) => !prev)} className='no-print' />
                </button>
            </div>
        </div>
    )
}

export default Navbar
