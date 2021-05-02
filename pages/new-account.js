import React, {useContext} from 'react';
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alert from '../components/Alert';

const NewAccount = (props) => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { messageError, message, registerUser } = authenticateContext;


  // Formulario y validacion con formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    }),
    onSubmit: (values) => {
      registerUser(values)
    }
  }); 

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w3/5 mx-auto mb-32">
        <h2 className="text-2xl font-sans font-bold uppercase text-gray-800 text-center my-4">Crear Cuenta</h2>

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
                  htmlFor="name"
                >Nombre</label>
                <input 
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  focus:shadow-outline"
                  id="name"
                  placeholder="Ingresa tu nombre"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.name && formik.errors.name ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{formik.errors.name}</p>
                  </div>
                ) : null}
              </div>

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
                  value="Crear Cuenta"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
   );
}
 
export default NewAccount;