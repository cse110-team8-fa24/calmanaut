import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MeditationResources from './pages/MeditationResources';
import ProgressTracker from './pages/ProgressTracker';
import Navbar from './components/Navbar';
import { AuthorizationProvider } from './context/AuthorizationContext';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Profile } from './pages/Profile';
import { Signup } from './pages/Signup';
import { ProfileId } from './pages/ProfileId';

const App: React.FC = () => {
  return (
    <Router>
      <AuthorizationProvider>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="resources" element={<MeditationResources />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile">
            <Route path="" element={<Profile />} />
            <Route path=":id" element={<ProfileId />} />
          </Route>
        </Routes>
      </AuthorizationProvider>
    </Router>
  );
};

export default App;
