import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/material';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import router from './router';
import './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container maxWidth='lg' sx={{ textAlign: 'center', mt: '50px' }}>
    <RouterProvider router={router} />
  </Container>
);
