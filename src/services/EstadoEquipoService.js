import { axiosConfig } from "../configuration/axiosConfig";


// obtener el Estado del Equipo
const getEstadoEquipos = (Estado) => {
   return axiosConfig.get('estadoequipos?estado=' + Estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// crear Estado
const createEstadoEquipos = (data = {}) => {
    return axiosConfig.post('estadoequipos' +  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar Estado

const editarEstadoEquipos = (estadoId, data) => {
    return axiosConfig.put(`estadoequipos${estadoId}`, data, {
     headers: {
        'Content-type': 'application/json'
     }
    });
  }
  

export {
    getEstadoEquipos,
    createEstadoEquipos,
    editarEstadoEquipos
}