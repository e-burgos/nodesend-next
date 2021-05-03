import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import appContext from '../context/app/appContext';
import Alert from '../components/Alert';

const Index = () => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { authenticateUser } = authenticateContext;

  // Hacemos disponible el context de auth
    const AppContext = useContext(appContext);
    const { alert, url } = AppContext;

  useEffect(() => {
    authenticateUser();
  }, [])

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:3/5 mx-auto mb-32">
        {url ? (
          <div className="md:flex-1 mb-3 mx-2 mt-16 px-4 lg:mt-0"> 
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 flex flex-col items-center justify-center">
              <p className="text-2xl font-sans text-center font-bold text-gray-800 uppercase">Tu enlace es: </p>
              <span className="text-2xl">{`${process.env.REACT_APP_FRONTEND_URL}/links/${url}`}</span>
              <button 
                type="button" 
                className="border-2 border-red-400 px-4 mt-3 py-2 mx-1 text-red-400 uppercase font-bold rounded hover:bg-black hover:text-white hover:border-white"
                onClick={() => { navigator.clipboard.writeText(`${process.env.REACT_APP_FRONTEND_URL}/links/${url}`) }}
                >Copiar Enlace</button>
            </div>
          </div>
        ) : (
          <>
            <div className="md:flex-1 mb-3 mx-2 mt-16 px-4 lg:mt-0 flex flex-col items-center justify-center"> 
              {alert && <Alert />} 
            </div>
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-3xl font-sans font-bold text-gray-800 my-4">Comparte fácilmente archivos de forma privada</h2>
                <p className="text-lg leadind-loose">
                  Con <span className="text-red-500 font-bold">NODE</span><span className="text-black font-bold">SEND </span> 
                  Comparta sus archivos más importantes y entregue su trabajo de acuerdo con la marca y con estilo. 
                  Realice un ajusta de la cantidad de descargas y controle el acceso. Puede enviar hasta 20MB de trabajo de una sola vez.
                </p>
                <hr className="mt-5 mb-5"/>
                <Link href="/new-account">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
   );
}
 
export default Index;
