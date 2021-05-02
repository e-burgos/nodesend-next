import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {

  // Hacemos disponible el context de auth
  const authenticateContext = useContext(authContext);
  const { authenticateUser } = authenticateContext;

  useEffect(() => {
    authenticateUser();
  }, [])

  return ( 
    <Layout>
      <h1>Index</h1>
    </Layout>
   );
}
 
export default Index;
