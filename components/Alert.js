import React, {useContext} from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Alert = () => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { message, messageError } = authenticateContext;

  // Hacemos disponible el context de app
    const AppContext = useContext(appContext);
    const { alert } = AppContext;
    
    if(message){
      return (
        <div className="bg-green-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white rounded">{message}</div>
      );
    };

    if(messageError){
      return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white rounded">{messageError}</div>
      );
    };

    if(alert){
      return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white rounded">{alert}</div>
      );
    };
    
}
 
export default Alert;