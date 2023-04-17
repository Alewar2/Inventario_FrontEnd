
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EstadoEquipo from '../components/EstadoEquipo'
import Inventario from '../components/Inventario'
import Marcas from '../components/Marcas'
import TipoEquipos from '../components/TipoEquipos'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import NotFound from '../components/ui/NotFound'
import Usuarios from '../components/Usuarios'

export default function AppRouter() {
  return (
    <>
        <Navbar />
        <div className='container'>
            <Routes>
                <Route path='/' element={<TipoEquipos/>} />
                <Route path='/estados' element={<EstadoEquipo />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/marcas' element={<Marcas/> } />
                <Route path='/inventario' element={<Inventario />} />
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
        <Footer />
    </>
  )
}