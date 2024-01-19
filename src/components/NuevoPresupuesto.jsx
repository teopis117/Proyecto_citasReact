import React from 'react'
import { useState } from 'react';
import Mensaje from './Mensaje';



function NuevoPresupuesto({
  presupuesto,
  setPresupuesto,
  setisValidPresupuesto}) {


  const [mensaje,setMensaje]=useState('');

  const handlePresupuesto=(e)=>
  {
    //cuando demos click en esta funcion el form  de definir presupuesto se ejecutra
    e.preventDefault();

    if(!presupuesto || presupuesto <0)
    {
      setMensaje("no es un presupuesto valido")
      return;
    }

    setMensaje('');

    setisValidPresupuesto(true)

   
  }



  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form action="" className='formulario' onSubmit={handlePresupuesto}>
        <div className='campo'>
          <label htmlFor="">Definir Presupuesto</label>
          <input type="number" className='nuevo-presupuesto'  placeholder='añade tu presupuesto' value={presupuesto}
          onChange={(e)=>setPresupuesto(Number(e.target.value))}/>
        </div>

        <input type="submit" value="Añadir" />

      {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

      </form>
    </div>
  )
}

export default NuevoPresupuesto
