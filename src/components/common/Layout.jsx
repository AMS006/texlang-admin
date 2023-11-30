import Navbar from './Navbar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <>
            <Navbar />
            <main>
                <Component {...props} />
            </main>
            <footer className='flex items-center justify-center text-gray-600 py-2.5 no-print'>
                <span className='no-print'>Copyright © Megdap Innovation Labs</span>
            </footer>
        </>
    )
}

export default Layout
