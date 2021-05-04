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
    const { user, authenticateUser, logoutUser } = authenticateContext;

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
    
    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <div>
                <img
                    onClick={() => backHome()} 
                    className="w-64 md-8 md:mb-0 pb-2 cursor-pointer" src="/logo.svg" 
                />
            </div>
            <div>
                { user ? ( 
                    <div className="flex items-center">
                        <p className="me-2"> Hola {user.name}</p>
                        <button
                            className="px-4 py-2 mx-1 text-black border-black uppercase font-bold rounded"
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
        </header>
     );
}
 
export default Header;