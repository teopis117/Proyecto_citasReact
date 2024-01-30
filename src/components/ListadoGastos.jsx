import React from 'react'
import Gasto from './Gasto'

function ListadoGastos({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados}) {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'Gastos':'No hay Gastos aun'}</h2>


        {
          filtro ? gastos.map(gasto=>
            <Gasto
            gasto={gasto}
            key={gasto.id}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}

            />)
            :
            (
              gastos.map(gasto=>
                <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
    
                />)
            )
        }

        
        </div>
  )
}

export default ListadoGastos