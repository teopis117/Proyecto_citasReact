import React from 'react'

function ControlPresupuesto({presupuesto}) {


    const formatearCantidad=(cantidad)=>
    {
       return cantidad.toLocaleString('en-US',
       {style:'currency',
       currency:'USD'}); 
    }


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'><p>Grafica Aqui</p>
    
    <div className='contenido-presupuesto'>
        <p>Presupuesto:  <span>{formatearCantidad(presupuesto)}</span></p>
        <p>Disponible:  <span>{formatearCantidad(0)}</span></p>
        <p>Gastado:  <span>{formatearCantidad(0)}</span></p>
    </div>
    </div>
  )
}

export default ControlPresupuesto