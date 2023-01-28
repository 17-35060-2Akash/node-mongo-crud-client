import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Addusers from './components/Addusers';
import Home from './components/Home';
import Update from './components/Update';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      loader: async () => fetch('http://localhost:5000/users')

    },
    {
      path: '/users/add',
      element: <Addusers></Addusers>
    },
    {
      path: '/update/:id',
      element: <Update></Update>,
      loader: async ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
    }
  ]);


  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
