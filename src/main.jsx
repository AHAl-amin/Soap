import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Root/Roots.jsx';
// import ErrorPage from './component/ErrorPage/ErrorPage.jsx';
import Home from './component/Home/Home.jsx';
import UserDashboardLayout from './component/UsersDashboard/UserDashboardLayout/UserDashboardLayout.jsx';
// import OderManangement from './component/UsersDashboard/UserDashboardPages/OderManangement.jsx';

import Registration from './component/Shared/Registration/Registration.jsx';
import Login from './component/Shared/Login/Login.jsx';
import ConfirmEmail from './component/Shared/ConfirmEmail/ConfirmEmail.jsx';
import Verification from './component/Shared/Verification/Verification.jsx';
import ConfirmPassword from './component/Shared/ConfirmPassword/ConfirmPassword.jsx';
import PasswordChangeSuccesfully from './component/Shared/PasswordChangeSuccesfully/PasswordChangeSuccesfully.jsx';

import OrderManagement from './component/UsersDashboard/UserDashboardPages/OrderManagement/PartScanner.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  // ----------user dashboard---------
  {
    path: "/dashboard",
    element: (<UserDashboardLayout />),
    children: [
      {
        index: true,
        element: <OrderManagement />
      },
     
      
     
    ]
  },





  
  // .................Athentications.................
  
  {
    path:"/registration",
    element:<Registration/>
    

  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/confirm_email',
    element:<ConfirmEmail/>
  },
  {
    path:'/verification',
    element:<Verification/>
  },
  {
    path:'/confirm_password',
    element:<ConfirmPassword/>
  },
  {
    path:'/password_change_succesfull',
    element:<PasswordChangeSuccesfully/>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </StrictMode>,
)
