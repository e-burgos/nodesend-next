import React, {useContext, useEffect} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router'

const Header = () => {

    // Routing
    const router = useRouter();

    // Hacemos disponible el context de auth
    const authenticateContext = useContext(authContext);
    const { user, authenticateUser, logoutUser, accountLinks } = authenticateContext;

    // Hacemos disponible el context de app
    const AppContext = useContext(appContext);
    const { clearState } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            authenticateUser();
        };
    }, [])

    const backHome = () => {
        router.push('/');
        clearState();
    }

    const getAccountLinks = () => {
        accountLinks(user.id)
        router.push('/account-links');
        clearState();
    }
    
    return ( 
        <header className="py-4 bg-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
       
            <div className="lg:ml-40 md:ml-10">
                <img
                    onClick={() => backHome()} 
                    className="w-64 md-8 md:mb-0 pb-2 cursor-pointer" src="/logo.svg" 
                />
            </div>
            <div className="lg:mr-40 md:mr-10">
                { user ? ( 
                    <div className="flex items-center border-2 border-black rounded p-1 text-gray-700 uppercase ">
                        <p className="px-2"> Hola {user.name}</p>

                        <button
                            className="text-red-500 pointer-cursor font-bold border-2 rounded-full p-1 hover:bg-black hover:text-white hover:rounded-full hover:border-white"
                            onClick={() => getAccountLinks()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </button>

                        <button
                            className="text-red-500 pointer-cursor font-bold border-2 rounded-full p-1 hover:bg-black hover:text-white hover:rounded-full hover:border-white"
                            onClick={() => logoutUser()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>

                    </div>
                    ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-4 py-2 mx-1 text-white uppercase font-bold rounded">Iniciar Sesión</a>
                        </Link>
                        <Link href="/new-account">
                            <a className="bg-black px-4 py-2 mx-1 text-white uppercase font-bold rounded">Crear Cuenta</a>
                        </Link>
                    </>
                    )
                }
            </div>
            </div>
        </header>
     );
}
 
export default Header;