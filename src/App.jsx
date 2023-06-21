import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./content/AuthContext";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/home" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
            
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
