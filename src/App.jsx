import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute.jsx'
import Admin from './pages/Admin'
import {AuthProvider} from "./context/AuthContext.jsx";
import {Home} from "./pages/Home.jsx";
import Noticia from "./pages/Noticia.jsx";
import {Portales} from "./pages/Portales.jsx";
import {Preferencias} from "./pages/Preferencias.jsx";
import {Config} from "./pages/Config.jsx";
import NavBar from "./components/NavBar.jsx";
import LogoNav from './components/LogoNav.jsx'
import Footer from './components/Footer.jsx'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <LogoNav />
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/noticia/por-id/:id" element={<PrivateRoute><Noticia /></PrivateRoute>} />
                    <Route path="/bloq-portal" element={<PrivateRoute><Portales /></PrivateRoute>} />
                    <Route path="/preferencias" element={<PrivateRoute><Preferencias /></PrivateRoute>} />
                    <Route path="/config" element={<PrivateRoute><Config /></PrivateRoute>} />
                    <Route path="/admin/nueva-noticia" element={<Admin />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </BrowserRouter>

    )
}

export default App