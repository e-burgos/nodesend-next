import React, {useState, useContext} from 'react';
import appContext from '../context/app/appContext';

const OptionsForm = () => {

    const [checkPass, setCheckPass] = useState(false);

    // Hacemos disponible el context de auth
    const AppContext = useContext(appContext);
    const { addPassword, addDownload } = AppContext;

    return ( 
      <div className="w-full max-w-lg">
        <div className="flex-col justify-center items-center mb-4">
            <label className="block text-black text-sm font-bold mr-2" htmlFor="download">Límite de descargas:</label>
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  focus:shadow-outline"
              onChange={(e) => addDownload(parseInt(e.target.value))}
              >
              <option selected disabled value="1">Selecciona una opción</option>
              <option value="1">1 Descarga</option>
              <option value="5">5 Descarga</option>
              <option value="10">10 Descarga</option>
              <option value="15">15 Descarga</option>
              <option value="20">20 Descarga</option>
            </select>
        </div>

        {checkPass ? 
          <div className="flex-col justify-center items-center mb-4">
            <label className="block text-black text-sm font-bold mr-2" htmlFor="password">Contraseña:</label>
            <input 
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  focus:shadow-outline"
              id="password"
              placeholder="Ingresa tu contraseña"
              onChange={(e) => addPassword(e.target.value)}
            />
        </div> 
        : null }

        <div className="flex justify-between items-center mb-4">
            <label  className="block text-black text-sm font-bold mr-2">Proteger con Contraseña</label>
            <input 
              type="checkbox" 
              onChange={() => setCheckPass(!checkPass)}
            />
        </div>
      </div>       
     );
}
 
export default OptionsForm;