import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home />
                ) : (
                  <Auth onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/upload"
              element={isLoggedIn ? <Upload /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/about"
              element={isLoggedIn ? <About /> : <Navigate to="/" />}
            />
            <Route
              path="/contact"
              element={isLoggedIn ? <Contact /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
