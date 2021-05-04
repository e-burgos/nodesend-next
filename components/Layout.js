import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
    return ( 
        <>
            <Head>
                <title>React NodeSend</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" content-type="text/css" />
            </Head>

            <div className="bg-gray-100 layout-bg min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}
                    </main>
                </div>
                <Footer/>
            </div>  
        </>
     );
}
 
export default Layout;