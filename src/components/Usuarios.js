import React, { useEffect, useState } from 'react'
import { getUsuarios, createUsuarios, editarUsuarios } from '../services/UsuarioService'
import dayjs from 'dayjs'
import ModalUsuario from './ui/ModalUsuario'

export default function Usuarios() {

  const title= 'Usuario'
  const [usuarios, setUsuario] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [usuario, setUsuarios] = useState({
    nombre:''
  })
  const [loadingSave, setLoadingSave] = useState(false)

const listUsuarios = async () => {
  try{
    setLoadingSave(true)
    setError(false)
    const {data} = await getUsuarios(query)
    console.log(data)
    setTimeout(() =>{
      setLoadingSave(false)
     }, 500 ) 
    
    setUsuario(data)
  }catch(e){
    setLoadingSave(false)
    setError(true)
  }
  
}

useEffect(() => {
  listUsuarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setUsuario({
    ...usuario,
    [e.target.name]: e.target.value
  })
}

const saveUsuario = async () => {
  try{
    setLoading(true)
    setError(false)
    const response = await createUsuarios(usuario)
    console.log(response)
    setUsuarios({
        nombre:'',
        email: ''
    })
    listUsuarios()
    setTimeout(() =>{
      setLoading(false)
     }, 500 ) 
    

  }catch(e){
    setLoading(false)
    setError(true)
  }
  
}

const closeModal = () => {
  setUsuarios({
    nombre:'',
    email:''
})
}



  return (
    <>
      <ModalUsuario
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        usuario={usuario}
        loadingSave={loadingSave}
        saveUsuario={saveUsuario}
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha de Creacion</th>
            <th scope="col">Fecha de Actualizacion</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
      
          {
            usuarios.map((usuario, index) => {
              return (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{dayjs(usuario.fechaCreacion).format('DD/MM/YYYY')}</td>
                <td>{dayjs(usuario.fechaActualizacion).format('DD/MM/YYYY') }</td>
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