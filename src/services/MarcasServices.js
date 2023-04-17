import { axiosConfig } from "../configuration/axiosConfig";


// obtener Marcas
const getMarcas = (Estado) => {
   return axiosConfig.get('marcas/?estado=' + Estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// crear Marcas
const createMarcas = (data = {}) => {
    return axiosConfig.post('marcas/' +  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar Marcas

const editarMarcas = (marcaId, data) => {
    return axiosConfig.put(`marcas${marcaId}`, data, {
     headers: {
        'Content-type': 'application/json'
     }
    });
  }


export {
    getMarcas,
    createMarcas,
    editarMarcas
}