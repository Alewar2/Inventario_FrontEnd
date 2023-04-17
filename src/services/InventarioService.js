import { axiosConfig } from "../configuration/axiosConfig";


// obtener el Inventario
const getInventario = (Estado) => {
   return axiosConfig.get('inventario/' + Estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// crear Inventario
const createInventario = (data = {}) => {
    return axiosConfig.post('inventario/' +  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar Inventario

const editarInventarios = (inventarioId, data) => {
    return axiosConfig.put(`inventarios${inventarioId}`, data, {
     headers: {
        'Content-type': 'application/json'
     }
    });
  }
  

export {
    getInventario,
    createInventario,
    editarInventarios
}