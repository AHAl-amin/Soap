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

import Verification from './component/Shared/Verification/Verification.jsx';

import PasswordChangeSuccesfully from './component/Shared/PasswordChangeSuccesfully/PasswordChangeSuccesfully.jsx';


import PartScanner from './component/UsersDashboard/UserDashboardPages/OrderManagement/PartScanner.jsx';
import AiAssistant from './component/UsersDashboard/UserDashboardPages/AiAssistant.jsx';
import TechnicalManual from './component/UsersDashboard/UserDashboardPages/TechnicalManual.jsx';
import Settings from './component/UsersDashboard/UserDashboardPages/Settings.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
// import ForgatePassword from './component/Shared/ForgatePassword/ForgatePassword.jsx';
import NewPassword from './component/Shared/NewPassword/NewPassword.jsx';
// import ForgatePassword from './component/Shared/ForgtPassword/ForgatePassword.jsx';
import ForgetPassword from './component/Shared/ForgetPassword/ForgetPassword.jsx';
import PasswordChangeVerification from './component/Shared/PasswordChangeVerification.jsx';


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
        element: <PartScanner/>
      },
      {
        path:"ai_assistant",
        element: <AiAssistant/>
      },
      {
        path:"technical_manual",
        element: <TechnicalManual/>
      },
      {
        path:"settings",
        element: <Settings/>
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
    path:'/forget_password',
    element:<ForgetPassword/>
  },
  {
    path:'/verification',
    element:<Verification/>
  },
  {
    path:'/new_password',
    element:<NewPassword/>
  },
  {
    path:'/password_change_succesfull',
    element:<PasswordChangeSuccesfully/>
  },
  {
    path:'/password_change_verification',
    element:<PasswordChangeVerification/>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </Provider>
  </StrictMode>,
)
