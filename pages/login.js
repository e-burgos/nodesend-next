import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alert from '../components/Alert';
import { useRouter } from 'next/router';

const Login = () => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { message, messageError, auth, loginUser } = authenticateContext;

  // Definimos Next Router
  const router = useRouter();

  // Veificamos el estado de auth
  useEffect(() => {
    if(auth){
      router.push('/')
    } 
  }, [auth])

  // Formulario y validacion con formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('Debes ingresar tu email'),
      password: Yup.string().required('Debes ingresar tu contraseña').min(6, 'Recuerda que tu contraseña debe tener al menos 6 caracteres'),
    }),
    onSubmit: (values) => {
      loginUser(values)
    }
  }); 

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w3/5 mx-auto pb-32">
        <h2 className="text-2xl font-sans font-bold uppercase text-gray-800 text-center my-4">Iniciar Sesión</h2>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            {message && <Alert /> || messageError && <Alert />}
            <form 
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label 
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >Email</label>
                <input 
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  focus:shadow-outline"
                  id="email"
                  placeholder="Ingresa tu email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label 
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >Contraseña</label>
                <input 
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  focus:shadow-outline"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8">
                <input
                  type="submit" 
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded"
                  value="Ingresar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
   );
}
 
export default Login;