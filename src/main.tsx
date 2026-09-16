import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from './pages/RootLayout.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Services from './pages/Services.tsx';
import About from './pages/About.tsx';
import App from './App.tsx';
import UserLayout from './pages/users/UserLayout.tsx';
import UserHome from './pages/users/UserHome.tsx';
import UserProfile from './pages/users/UserProfile.tsx';
import OAuthSeccess from './pages/OAuthSeccess.tsx';
import OAuthFailure from './pages/OAuthFailure.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        {/* Dashboard Routes */}
        <Route path="dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="oauth/success" element={<OAuthSeccess/>} />
         <Route path="oauth/failure" element={<OAuthFailure/>} />

      </Route>

    </Routes>
  </BrowserRouter>
)