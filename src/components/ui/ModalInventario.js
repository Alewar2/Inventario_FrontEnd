import React from 'react'

export default function ModalInventario({
    closeModal,
    handleChange,
    inventario,
    loadingSave,
    saveInventario,
    title


}) {
  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo {title}</h1>
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="modal" 
          aria-label="Close"
          onClick={closeModal}
          >
          
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">
              Nombre:
            </label>
            <input 
            type="text" 
            className="form-control" 
            id="recipient-name"
            name="nombre"
            onChange={handleChange}
            value={inventario.nombre}   

            />
          </div>
          
        </form>
      </div>
      <div className="modal-footer">
        <button 
          type="button" 
          className="btn btn-secondary" 
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          Cerrar
        </button>
        {
          loadingSave ?  (
            <button 
            className="btn btn-primary" 
            type="button" 
            disabled>
              <span 
              className="spinner-border spinner-border-sm" 
              role="status" 
              aria-hidden="true"
              >

              </span>
              Loading...
            </button>
          ) : 
          ( 
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={saveInventario}
            /*disabled={inventario.serial.length == 0}*/
          >
             Guardar
          </button>
            )
        }
        
         
      </div>
    </div>
  </div>
</div>
  )
}