import React, { useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import OptionsForm from './OptionsForm';

const Dropzone = () => {

    // Hacemos disponible el context de auth
    const AppContext = useContext(appContext);
    const { loading, showAlert, uploadFiles, createLink } = AppContext;

    // Hacemos disponible el context de auth
    const authenticateContext = useContext(authContext);
    const { user, auth } = authenticateContext;

    // Rechazar archivos cuando excede el tamaño
    const onDropRejected = () => {
        showAlert('El archivo excede el tamaño de 1 MB, registrate para obtener mejores beneficios')
    }

    // Definimos funcion para soltar archivo y leerlo (se usa useCallback para no estar renderizando todo el tiempo mientras ocurre el evento)
    const onDropAccepted = useCallback( acceptedFiles => {
        
        // Crear un formdata para leer el archivo
        const formData = new FormData();
        formData.append('fileToUpload', acceptedFiles[0]);

        // Obtener nombre original del archivo
        const fileOriginalName = acceptedFiles[0].path;

        // Subir archivo desde state
        uploadFiles(formData, fileOriginalName);
    }, []);

    // Extraer contenido de dropzone
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: user ? 20000000 : 1000000 });

    // Listar archivos subidos
    const files = acceptedFiles.map( file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-lg">{file.path}</p>
            <p className="text-sm text-gray-500">{ (file.size / Math.pow(1024, 2)).toFixed(3) } MB</p>
        </li>
    ));

    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 px-4 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 rounded-lg">   
            {acceptedFiles.length > 0 ? (
                    <div className="flex flex-col items-center justify-center w-full min-h-100">
                        <ul>{files}</ul>

                        {auth ? <OptionsForm /> : null}

                        {loading ? <img className="w-32" src="/upload_file.gif" /> 
                        :   (
                            <button
                                type="button"
                                onClick={() => createLink()} 
                                className="border-2 border-blue-500 px-4 mt-3 py-2 mx-1 text-blue-500 uppercase font-bold rounded hover:bg-black hover:text-white hover:border-white"
                            >Crear Enlace</button>
                            )
                        }
                    </div>
                ) : (
                    <div {...getRootProps( {className: 'dropzone w-full py-32'} )}>
                        <input className="h-100" {...getInputProps()} />
                        { isDragActive 
                            ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                            : <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                                <button type="button" className="border-2 border-red-400 px-4 mt-3 py-2 mx-1 text-red-400 uppercase font-bold rounded hover:bg-black hover:text-white hover:border-white">
                                    Seleccionar Archivos
                                </button>
                            </div>
                        }
                    </div> 
                )
            }    
        </div>
     );
}
 
export default Dropzone;
