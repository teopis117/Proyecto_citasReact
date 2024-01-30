import React from 'react'
import { useEffect,useState } from 'react';

function ControlPresupuesto({presupuesto,gastos}) {

    const [disponible,setDisponible]=useState(0);
    const [gastado,setGastado]=useState(0);
  
    useEffect(()=>
    {
     const totalGastado= gastos.reduce((total,gasto)=>gasto.cantidad+total,0)

     const totalDisponible=presupuesto - totalGastado;
    
     setDisponible(totalDisponible)
     setGastado(totalGastado)
    },[gastos])


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
        <p>Disponible:  <span>{formatearCantidad(disponible)}</span></p>
        <p>Gastado:  <span>{formatearCantidad(gastado)}</span></p>
    </div>
    </div>
  )
}

export default ControlPresupuesto