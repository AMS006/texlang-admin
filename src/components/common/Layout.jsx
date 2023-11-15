import React from 'react'
import Navbar from './Navbar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <>
            <Navbar />
            <main>
                <Component {...props} />
            </main>
        </>
    )
}

export default Layout
