import React, { useEffect, useState } from 'react'
import { getEstadoEquipos, createEstadoEquipos, editarEstadoEquipos } from '../services/EstadoEquipoService'
import dayjs from 'dayjs'
import ModalEstado from './ui/ModalEstado'

export default function EstadoEquipos() {

  const title= 'Estado de Equipo'
  const [estadoEquipos, setEstadoEquipo] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [estadoEquipo, setEstadoEquipos] = useState({
    nombre:''
  })
  const [loadingSave, setLoadingSave] = useState(false)

const listEstadoEquipos = async () => {
  try{
    setLoadingSave(true)
    setError(false)
    const {data} = await getEstadoEquipos(query)
    console.log(data)
    setTimeout(() =>{
      setLoadingSave(false)
     }, 500 ) 
    
    setEstadoEquipo(data)
  }catch(e){
    setLoadingSave(false)
    setError(true)
  }
  
}

useEffect(() => {
  listEstadoEquipos()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setEstadoEquipos({
    ...estadoEquipo,
    [e.target.name]: e.target.value
  })
}

const saveEstadoEquipo = async () => {
  try{
    setLoading(true)
    setError(false)
    const response = await createEstadoEquipos(estadoEquipo)
    console.log(response)
    setEstadoEquipos({nombre:''})
    listEstadoEquipos()
    setTimeout(() =>{
      setLoading(false)
     }, 500 ) 
    

  }catch(e){
    setLoading(false)
    setError(true)
  }
  
}

const closeModal = () => {
  setEstadoEquipos({nombre:''})
}



  return (
    <>
      <ModalEstado
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        estadoEquipo={estadoEquipo}
        loadingSave={loadingSave}
        saveEstadoEquipo={saveEstadoEquipo}
      />


       
    <div className="form-check form-switch">
      <input 
        className="form-check-input" 
        type="checkbox" role="switch" 
        id="flexSwitchCheckChecked" 
        onClick={changeSwitch}
        checked={query}
      />
      <label 
        className="form-check-label" 
        for="flexSwitchCheckChecked">
        Activos
      </label>
   </div>



   <button 
    type="button" 
    className="btn btn-outline-primary"
    data-bs-toggle="modal" 
    data-bs-target="#exampleModal" 
    data-bs-whatever="@mdo"
   >
      Agregar
   </button>
   {
    error &&(
      <div className="alert alert-danger" role="alert">
      A ocurrido un error inesperado
    </div>
    )
   }
     
    <div 
      className='table-responsive'>
        {
          loading 
          ? (
            <div 
        className="spinner-border text-primary" 
        role="status">
      <span 
        className="visually-hidden">Loading...</span>
      </div>

          ) 
          : ( <table
            className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha de Creacion</th>
            <th scope="col">Fecha de Actualizacion</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
      
          {
            estadoEquipos.map((estadoEquipo, index) => {
              return (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{estadoEquipo.nombre}</td>
                <td>{estadoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{dayjs(estadoEquipo.fechaCreacion).format('DD/MM/YYYY')}</td>
                <td>{dayjs(estadoEquipo.fechaActualizacion).format('DD/MM/YYYY') }</td>
                <td><button type="button" class="btn btn-primary btn-sm">Editar</button></td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      
      )
        }
     
   

    </div>
   
    </>
   

  )
}