import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphQLRequest } from '../../utils/request';

function Login() {
  const auth = getAuth();

  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    console.log('sign in with Google');
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, googleProvider);

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid, name: $name){
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', { data });
  };

  if (localStorage.getItem('accessToken')) {
    console.log('Login exist');
    return <Navigate to='/' />;
  }

  return (
    <div>
      <Typography variant='h5' sx={{ mb: '20px' }}>
        Welcome to Note App
      </Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with GG
      </Button>
    </div>
  );
}

export default Login;
