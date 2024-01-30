import React from 'react'
import { useEffect,useState } from 'react';
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar' 
import "react-circular-progressbar/dist/styles.css"
function ControlPresupuesto({presupuesto,gastos}) {

    const [disponible,setDisponible]=useState(0);
    const [gastado,setGastado]=useState(0);
    const [porcentaje,setPorcentaje]=useState(0);
  
    useEffect(()=>
    {
     const totalGastado= gastos.reduce((total,gasto)=>gasto.cantidad+total,0)

     const totalDisponible=presupuesto - totalGastado;
    
      //calcular el porcentaje gastado

      const nuevoPorcentaje= (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
      
  

     setDisponible(totalDisponible)
     setGastado(totalGastado)
  
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1500);
    },[gastos])


    const formatearCantidad=(cantidad)=>
    {
       return cantidad.toLocaleString('en-US',
       {style:'currency',
       currency:'USD'}); 
    }


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'><p>
        <CircularProgressbar
          style={buildStyles({
            pathColor:'#3B82F6',
            trailColor:'#F5F5F5',
            textColor:'#00000'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        >



        </CircularProgressbar>
    </p>
    
    <div className='contenido-presupuesto'>
        <p>Presupuesto:  <span>{formatearCantidad(presupuesto)}</span></p>
        <p>Disponible:  <span>{formatearCantidad(disponible)}</span></p>
        <p>Gastado:  <span>{formatearCantidad(gastado)}</span></p>
    </div>
    </div>
  )
}

export default ControlPresupuesto