import React from 'react';
import Link from 'next/link';

const Header = () => {
    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <div>
                <Link href="/">
                    <img className="w-64 md-8 md:mb-0" src="logo.svg" />
                </Link>
            </div>
            <div>
                <Link href="/login">
                    <a className="bg-red-500 px-4 py-2 mx-1 text-white uppercase font-bold rounded">Iniciar Sesión</a>
                </Link>
                <Link href="/new-account">
                    <a className="bg-black px-4 py-2 mx-1 text-white uppercase font-bold rounded">Crear Cuenta</a>
                </Link>
            </div>
        </header>
     );
}
 
export default Header;