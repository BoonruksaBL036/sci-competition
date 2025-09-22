import { RouterProvider } from 'react-router';
import './App.css'
import { MainLayout } from './layouts/MainLayout';
import router from './routers/index.jsx';

function App() {

  return (
    <>
      <RouterProvider router = {router}/>
    </>
  );
}

export default App
