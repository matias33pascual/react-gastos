import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import NuevoPresupuesto from "./components/NuevoPresupuesto";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem("presupuesto")) ?? 0
    );

    const [presupuestoValido, setPresupuestoValido] = useState(false);

    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [gastos, setGastos] = useState(
        localStorage.getItem("gastos")
            ? JSON.parse(localStorage.getItem("gastos"))
            : []
    );

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState("");
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 250);
        }
    }, [gastoEditar]);

    useEffect(() => {
        localStorage.setItem("presupuesto", presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        const presupuestoLocalStorate =
            Number(localStorage.getItem("presupuesto")) ?? 0;

        if (presupuestoLocalStorate > 0) {
            setPresupuestoValido(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            const gastosFiltrados = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );

            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        //* da un tiempo y ejecuta la funcion
        setTimeout(() => {
            setAnimarModal(true);
        }, 250);
    };

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 250);
    };

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
    };

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                presupuestoValido={presupuestoValido}
                setPresupuestoValido={setPresupuestoValido}
            />
            {presupuestoValido && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className='nuevo-gasto'>
                        <img
                            src={IconoNuevoGasto}
                            alt='Nuevo Gasto'
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
