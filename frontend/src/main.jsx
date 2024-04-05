import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import Vote from './components/Vote.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element:  <Home />
  },
  {
    path: "/profile",
    element:  <Profile />
  },
  {
    path: "/vote",
    element:  <Vote />
  },
  {
    path: "*",
    element: <div>Not found</div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
    </Provider>,
)
