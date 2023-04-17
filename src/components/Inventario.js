import React, { useEffect, useState } from 'react'
import { getInventario, createInventario, editarInventarios } from '../services/InventarioService'
import dayjs from 'dayjs'
import ModalInventario from './ui/ModalInventario'

export default function Inventarios() {

  const title= 'Inventario'
  const [inventarios, setInventario] = useState([])
  const [query, setQuery] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [inventario, setInventarios] = useState({
    nombre:''
  })
  const [loadingSave, setLoadingSave] = useState(false)

const listInventarios = async () => {
  try{
    setLoadingSave(true)
    setError(false)
    const {data} = await getInventario(query)
    console.log(data)
    setTimeout(() =>{
      setLoadingSave(false)
     }, 500 ) 
    
    setInventario(data)
  }catch(e){
    setLoadingSave(false)
    setError(true)
  }
  
}

useEffect(() => {
  listInventarios()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

const handleChange = (e) => {
  setInventarios({
    ...inventario,
    [e.target.name]: e.target.value
  })
}

const saveInventario = async () => {
  try{
    setLoading(true)
    setError(false)
    const response = await createInventario(inventario)
    console.log(response)
    setInventarios({
      serial:'',
      modelo:'',
      descripcion:'',
      foto:'',
      color:'',
      fechaCompra:'',
      precio:'',
      usuario:{
        id:''
      },
      marcas:{
        id:''
      },
      estadoEquipo:{
        id:''
      },
      tipoEquipo:{
        id:''
      }
    })
    listInventarios()
    setTimeout(() =>{
      setLoading(false)
     }, 500 ) 
    

  }catch(e){
    setLoading(false)
    setError(true)
  }
  
}

const closeModal = () => {
  setInventarios({
    serial:'',
    modelo:'',
    descripcion:'',
    foto:'',
    color:'',
    fechaCompra:'',
    precio:'',
    usuario:{
      id:''
    },
    marcas:{
      id:''
    },
    estadoEquipo:{
      id:''
    },
    tipoEquipo:{
      id:''
    }
    })
}



  return (
    <>
      <ModalInventario
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        inventario={inventario}
        loadingSave={loadingSave}
        saveInventario={saveInventario}
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
            <th scope="col">Serial</th>
            <th scope="col">Modelo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Foto</th>
            <th scope="col">Color</th>
            <th scope="col">Fecha de Compra</th>
            <th scope="col">Precio</th>
            <th scope="col">Usuario</th>
            <th scope="col">Marcas</th>
            <th scope="col">Estado de Equipo</th>
            <th scope="col">Tipo de Equipo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
      
          {
            inventarios.map((inventario, index) => {
              return (
                <tr>
                <th scope="row">{index + 1}</th>
                <td>{inventario.serial}</td>
                <td>{inventario.modelo}</td>
                <td>{inventario.descripcion}</td>
                <td>{inventario.foto}</td>
                <td>{inventario.color}</td>
                <td>{dayjs(inventario.fechaCompra).format('DD/MM/YYYY')}</td>
                <td>{inventario.precio}</td>
                <td>{inventario.usuario.nombre}</td>
                <td>{inventario.marcas.nombre}</td>
                <td>{inventario.estadoEquipo}</td>
                <td>{inventario.tipoEquipo}</td>
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