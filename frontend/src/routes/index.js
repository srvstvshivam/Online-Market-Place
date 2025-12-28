

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import ProductListing from '../pages/ProductListing';
import ProductDetails from '../pages/ProductDetails';
import PostAd from '../pages/PostAd';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import MyAds from '../pages/dashboard/MyAds';
import Favorites from '../pages/Favorites';
import ProfileSettings from '../pages/dashboard/ProfileSettings';
import ProtectedRoute from '../components/ProtectedRoute';
import EditAdPage from '../pages/dashboard/EditAdPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'ads/:category', element: <ProductListing /> },
      { path: 'ad/:id', element: <ProductDetails /> },
      { path: 'post-ad', element: <ProtectedRoute><PostAd /></ProtectedRoute> },
      { path: 'favorites', element: <ProtectedRoute><Favorites /></ProtectedRoute> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
          { path: '', element: <ProfileSettings /> },
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'my-ads', element: <MyAds /> },
          { path: 'edit-ad/:id', element: <EditAdPage /> }
        ]
      }
    ]
  }
]);

export default router;
