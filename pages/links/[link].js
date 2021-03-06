import React,{ useState, useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';
import { useRouter } from 'next/router';

// Leer un enlace disponible y actual que se consulte mediente props.params
export async function getServerSideProps({params}) {
    const { link } = params;
    try {
        const response = await axiosClient.get(`/api/links/${link}`)
        //console.log(response.data)
        return {
            props: {
                link: response.data
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Listar de forma estatica enlaces de archivos generados en el proyecto
export async function getServerSidePaths() {
    try {
        const response = await axiosClient.get('/api/links')
        const links = response.data.links;
        return{
            paths: links.map((link) => ({
                params: { link: link.url }
            })),
            fallback: false
        }
    } catch (error) {
        console.log(error)
    }
}  

const Link = ({link}) => {

    // Routing 
    const router = useRouter();

    // Hacemos disponible el context de auth
    const AppContext = useContext(appContext);
    const { alert, showAlert } = AppContext;

    const [checkPass, setCheckPass] = useState(link.password);
    const [password, setPassword] = useState('');
    const [checkDownload, setCheckDownload] = useState(link.download);

    // useEffect(() => {
    //     currentDownload();
    // }, [checkDownload])

    const validatePassword = async e => {
        e.preventDefault();
        
        const data = {
            password
        }
        try {
            const response = await axiosClient.post(`/api/links/${link.url}`, data)
            //console.log(response.data.password)
            setCheckPass(response.data.password)
        } catch (error) {
            showAlert(error.response.data.msg)
        }
    }

    const currentDownload = async () => {
        const response = await axiosClient.get(`/api/links/${link.url}`)
        setCheckDownload(response.data.download);
    }

    const downloadFile =  () => {
        setCheckDownload(checkDownload -1);
        if(link.download === 1){
            setTimeout(() => {
                router.push('/')
            }, 1000) 
        }
    }

    return (
        <Layout>
            <>
            {checkPass ? (
                <div className="md:w-4/5 xl:3/5 mx-auto pb-32">
                    <div className="flex w-full justify-center">
                        {alert && <Alert />}
                    </div>  
                    <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 flex flex-col items-center justify-center">
                        
                        <p className="text-2xl font-sans text-center font-bold text-gray-800 uppercase">Este enlace esta protegido </p>
                        <form 
                            className="flex-col w-80 justify-center items-center mt-4"
                            onSubmit={ e => validatePassword(e)}
                        >
                            <input 
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                placeholder="Ingresar contrase??a de seguridad"
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="border-2 border-black px-4 mt-3 py-2 w-full text-black uppercase font-bold rounded hover:text-green-500 hover:border-black"
                            >Validar Contrase??a</button>
                        </form> 
                    </div>
                    
                </div>
             ) : ( 
                <div className="md:w-4/5 xl:3/5 mx-auto pb-32">
                    <div className="md:flex-1 mb-3 mx-2 mt-16 px-4 lg:mt-0"> 
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 flex flex-col items-center justify-center">
                        <p className="text-2xl font-sans text-center font-bold text-gray-800 uppercase">Descarga tu archivo</p>
                        <p className="text-sm font-sans text-center font-semibold text-gray-800 uppercase">Tienes <span className="text-red-500 font-bold">{checkDownload}</span> descargas disponibles</p>
                        {checkDownload !== 0 ? 
                            <a 
                                onClick={() => downloadFile()}
                                href={`${process.env.REACT_APP_SERVER_URL}/api/files/${link.file}`}
                                className="border-2 border-red-400 px-4 mt-3 py-2 mx-1 text-red-400 uppercase font-bold rounded hover:bg-black hover:text-white hover:border-white"
                            >Aqu??</a>
                        : null}
                        
                        </div>
                    </div>
                </div>
             )}
            </>
        </Layout>
    )
}

export default Link;