import React, {useContext} from 'react';
import authContext from '../context/auth/authContext';

const Alert = () => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { message, messageError } = authenticateContext;
    
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
    
}
 
export default Alert;