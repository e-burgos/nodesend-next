import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Link from 'next/link';

const AccountLinks = () => {

    // Hacemos disponible Context de Auth
    const AuthContext = useContext(authContext);
    const { links, user, accountLinks } = AuthContext;

    useEffect(() => {
        if(user){
            accountLinks(user.id)
        }
    }, [])    
    
    return ( 
        <Layout>
            {links.length > 0 ? (
                <>
                {   links.map((link) => (
                        <div 
                            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5"
                            key={link.url}
                            >
                            <div className="md:flex">
                                <div className="p-8">

                                    <div className="flex items-center">
                                    <p className="px-2 py-1 uppercase border-2 text-sm font-semibold rounded bg-white text-red-500 border-red-500">{link.download} Descargas Restantes</p>
                                    {link.password ? 
                                        <p className="ml-5 px-2 py-1 uppercase border-2 text-sm font-semibold rounded bg-white text-black border-black">Protegido con contraseña</p>
                                    : null}
                                    </div>
                                    <p className="mt-2 text-gray-500"><span className="font-bold text-sm text-black uppercase">Link de descarga: </span>
                                        <a href={`${process.env.REACT_APP_FRONTEND_URL}/links/${link.url}`} className=" mt-1  leading-tight font-medium text-black hover:underline">{`${process.env.REACT_APP_FRONTEND_URL}/links/${link.url}`}</a>
                                    </p>
                                
                                    <p className="mt-2 text-gray-500"><span className="font-bold text-sm text-black uppercase">Nombre Original: </span>{link.original_name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="pb-32"></div>
                </>
            ) : (
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="flex flex-col justify-center items-center p-8">
                        <div className=" uppercase tracking-wide text-red-500 font-semibold">Aun no publicaste ningún enlace</div>
                        <Link href="/">
                            <a className="bg-red-500 px-4 py-2 mt-5 text-white uppercase border-2 border-white font-bold rounded hover:bg-white hover:text-black hover:border-black">Publicar </a>
                        </Link>
                    </div>
                </div>
            )}
            
        </Layout>
     );
}
 
export default AccountLinks;