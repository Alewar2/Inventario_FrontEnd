import React, { useEffect, useState } from 'react'
import { createTipoEquipos, getTipoEquipos } from '../services/TipoEquipoService'
import dayjs from 'dayjs'
import Modal from './ui/Modal'

export default function TipoEquipos() {

  const title= 'Tipo de Equipo'
  const [tipoEquipos, setTipoEquipo] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tipoEquipo, setTipoEquipos] = useState({
    nombre:''
  })
  const [loadingSave, setLoadingSave] = useState(false)

const listTipoEquipos = async () => {
  try{
    setLoadingSave(true)
    setError(false)
    const {data} = await getTipoEquipos(query)
    console.log(data)
    setTimeout(() =>{
      setLoadingSave(false)
     }, 500 ) 
    
    setTipoEquipo(data)
  }catch(e){
    setLoadingSave(false)
    setError(true)
  }
  
}

useEffect(() => {
  listTipoEquipos()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setTipoEquipos({
    ...tipoEquipo,
    [e.target.name]: e.target.value
  })
}

const saveTipoEquipo = async () => {
  try{
    setLoading(true)
    setError(false)
    const response = await createTipoEquipos(tipoEquipo)
    console.log(response)
    setTipoEquipos({nombre:''})
    listTipoEquipos()
    setTimeout(() =>{
      setLoading(false)
     }, 500 ) 
    

  }catch(e){
    setLoading(false)
    setError(true)
  }
  
}

const closeModal = () => {
  setTipoEquipos({nombre:''})
}



  return (
    <>
      <Modal
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={tipoEquipo}
        loadingSave={loadingSave}
        saveTipoEquipo={saveTipoEquipo}
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
            tipoEquipos.map(( tipoEquipo , index) => {
              return (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{tipoEquipo.nombre}</td>
                <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{dayjs(tipoEquipo.fechaCreacion).format('DD/MM/YYYY')}</td>
                <td>{dayjs(tipoEquipo.fechaActualizacion).format('DD/MM/YYYY') }</td>
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
