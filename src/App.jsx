import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./pages/Navbar"; // Updated import statement
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLogado from "./pages/HomeLogado";
import { AuthProvider } from "./content/AuthContext";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/PostDetail";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

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
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/homeLogado" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/homeLogado"
                element={user ? <HomeLogado /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/post/:id"
                element={user ? <PostDetail /> : <Navigate to="/login" />}
              />
              <Route
                path="/post/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/esqueceu-senha" element={<ForgotPassword />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
