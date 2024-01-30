import { useState,useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import NuevoPresupuesto from './components/NuevoPresupuesto'
import ListadoGastos from './components/ListadoGastos'
import {generarId} from './components/helpers/index'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros'

function App() {

  const [presupuesto,setPresupuesto] = useState(
    localStorage.getItem('presupuesto') ?? 0
  );
  const [isValidPresupuesto,setisValidPresupuesto]=useState(false);
  const [modal,setModal]=useState(false);
  const [animarModal,setAnimarModal]=useState(false);
  const [gastos,setGastos]=useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')):[]
  );


  const [gastoEditar,setGastoEditar]=useState([]);

  const [filtro,setFiltro]=useState('');
  const [gastosFiltrados,setGastosFiltrados]=useState([]);
  useEffect(()=>
  {
    if(Object.keys(gastoEditar).length > 0)
    {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  },[gastoEditar])


  useEffect(()=>
  {
   Number( localStorage.setItem('presupuesto',presupuesto)??0)
  },[presupuesto])

  useEffect(()=>
  {
    localStorage.setItem('gastos',JSON.stringify(gastos)??[]) 
  },[gastos])
  
  useEffect(()=>
  {
    const presupuestoLS=Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS>0)
    {
      setisValidPresupuesto(true)
    }
  },[])

  useEffect(()=>
  {
    if(filtro)
    {
      //filtrar gastos por categoria

      const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro);

      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])



  const handleNuevoGasto=()=>
  {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto=(gasto)=>
  {
    if(gasto.id)
    {
      const gastosActualizados=gastos.map(gastoState=>gastoState.id===gasto.id ? gasto :gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    else{
      gasto.id=generarId();
      gasto.fecha=Date.now();
      setGastos([...gastos,gasto])
    }
    

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);


  }

  const eliminarGasto=id=>
  {
    const gastosActualizados= gastos.filter(gasto=>gasto.id !== id);

    setGastos(gastosActualizados);
  }
 
  return (
    <>
    <div className={modal ? 'fijar':''}>
      <Header
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto}
    />
    


     {/*Boton de agregar azul*/}
      {isValidPresupuesto && (
        <>
        <main>

          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos
          eliminarGasto={eliminarGasto}
          gastos={gastos}
          setGastoEditar={setGastoEditar}  
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className='nuevo-gasto'>
        <img src={IconoNuevoGasto}
         alt="icono nuevo gasto"
         onClick={handleNuevoGasto}
         />
      </div>
         </>
      )}

      {modal && 
                <Modal
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                />}

      
      </div>


    </>
  )
}

export default App
