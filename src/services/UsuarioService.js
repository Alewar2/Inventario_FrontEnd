import { axiosConfig } from "../configuration/axiosConfig";


// obtener Usuarios
const getUsuarios = (Estado) => {
   return axiosConfig.get('usuarios/?estado=' + Estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// crear Usuario
const createUsuarios = (data = {}) => {
    return axiosConfig.post('usuarios/' +  data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Editar Usuario

const editarUsuarios = (usuarioId, data) => {
    return axiosConfig.put(`usuarios${usuarioId}`, data, {
     headers: {
        'Content-type': 'application/json'
     }
    });
  }
  

export {
    getUsuarios,
    createUsuarios,
    editarUsuarios
}