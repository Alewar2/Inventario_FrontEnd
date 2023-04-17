import React, { useEffect, useState } from 'react'
import { getMarcas, createMarcas, editarMarcas } from '../services/MarcasServices'
import dayjs from 'dayjs'
import ModalMarcas from './ui/ModalMarcas'

export default function Marcas() {

  const title= 'Marcas'
  const [marcas, setMarca] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [marca, setMarcas] = useState({
    nombre:''
  })
  const [loadingSave, setLoadingSave] = useState(false)

const listMarcas = async () => {
  try{
    setLoadingSave(true)
    setError(false)
    const {data} = await getMarcas(query)
    console.log(data)
    setTimeout(() =>{
      setLoadingSave(false)
     }, 500 ) 
    
    setMarca(data)
  }catch(e){
    setLoadingSave(false)
    setError(true)
  }
  
}

useEffect(() => {
  listMarcas()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setMarcas({
    ...marca,
    [e.target.name]: e.target.value
  })
}

const saveMarca = async () => {
  try{
    setLoading(true)
    setError(false)
    const response = await createMarcas(marca)
    console.log(response)
    setMarcas({nombre:''})
    listMarcas()
    setTimeout(() =>{
      setLoading(false)
     }, 500 ) 
    

  }catch(e){
    setLoading(false)
    setError(true)
  }
  
}

const closeModal = () => {
  setMarcas({nombre:''})
}



  return (
    <>
      <ModalMarcas
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        marca={marca}
        loadingSave={loadingSave}
        saveMarca={saveMarca}
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
            marcas.map((marca, index) => {
              return (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{marca.nombre}</td>
                <td>{marca.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{dayjs(marca.fechaCreacion).format('DD/MM/YYYY')}</td>
                <td>{dayjs(marca.fechaActualizacion).format('DD/MM/YYYY') }</td>
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
