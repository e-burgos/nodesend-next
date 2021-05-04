import React from 'react';
import Link from 'next/link';

const Footer = () => {
 
    return ( 
        <footer className="w-full bg-gray-200 fixed bottom-0 left-0">
            <div className="py-4 flex items-center justify-center">
                <Link target="blank" href="https://estebanburgos.com.ar/">
                    <a className="text-gray-600 text-md hover:text-red-700">Desarrollado por Esteban Burgos</a>
                </Link>
            </div>
        </footer>
     );
}
 
export default Footer;