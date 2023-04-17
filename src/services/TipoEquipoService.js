import { axiosConfig } from "../configuration/axiosConfig";


// obtener los tipo equipos
const getTipoEquipos = (Estado) => {
   return axiosConfig.get('tiposequipos?estado=' + Estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// crear tipo eqipos
const createTipoEquipos = (data = {}) => {
    return axiosConfig.post('tiposequipos' +  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar Tipo Equipo

const editarTipoEquipos = (tipoId, data) => {
    return axiosConfig.put(`tiposequipos${tipoId}`, data, {
     headers: {
        'Content-type': 'application/json'
     }
    });
  }


export {
    getTipoEquipos,
    createTipoEquipos,
    editarTipoEquipos
}