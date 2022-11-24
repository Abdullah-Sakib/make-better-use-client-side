import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routers/Router/Router';

function App() {
  return (
    <div >
        <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
