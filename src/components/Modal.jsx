import React from 'react'
import { useState,useEffect } from 'react';
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'


function Modal({ 
    setModal, 
    setAnimarModal, 
    animarModal,
    guardarGasto,
    gastoEditar }) {

        const [mensaje,setMensaje]=useState('');
        const [nombre,setNombre]=useState('');
        const [cantidad,setCantidad]=useState('');
        const [categoria,setCategoria]=useState('');
        const [id,setId]=useState('');
        const [fecha,setFecha]=useState('');

        useEffect(()=>
        {
            if(Object.keys(gastoEditar).length > 0)
            {
              setNombre(gastoEditar.nombre)
              setCantidad(gastoEditar.cantidad)
              setCategoria(gastoEditar.categoria)
              setId(gastoEditar.id)
              setFecha(gastoEditar.fecha)
            }
        },[])



    const ocultarModal = () => {

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);

    }

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if([nombre,cantidad,categoria].includes(''))
        {
            setMensaje('Todos los campos son obligatorios')


            setTimeout(() => {
                setMensaje('');
            }, 3000);    
            return;
        }

        guardarGasto({nombre,cantidad,categoria,id,fecha});

    }




    return (
        <div className='modal'>
            <div className='cerrar-modal'>

                <img src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />

            </div>




            <form 
            onSubmit={handleSubmit}
            action="" className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>

                <legend>{gastoEditar.nombre ? "Editar Gasto":"Nuevo Gasto"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>

                    <label htmlFor="nombre" id='nombre'>Nombre Gasto</label>
                    <input type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>

                    <label htmlFor="cantidad" id='cantidad'>Nombre Gasto</label>
                    <input type="number"
                        placeholder='Añade la cantidad  del gasto'
                        value={cantidad}
                        onChange={e=>setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>

                    <label htmlFor="cantidad" id='cantidad'>Categoria</label>
                    <select name="" 
                    id="categoria"
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                    >

                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios":"Nuevo Gasto"} />


            </form>

        </div>
    )
}

export default Modal