import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBoton from "../img/cerrar.svg";

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setId(gastoEditar.id);
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
        }
    }, []);

    const handleCerrarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios");

            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    };

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBoton}
                    alt='Cerrar modal'
                    onClick={handleCerrarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario  ${animarModal ? "animar" : "cerrar"}`}
                action='modal formulario'>
                <legend>
                    {gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}
                </legend>
                {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre del Gasto</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='ingresa el nombre del gasto'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='ingresa la cantidad'
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Categoria</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}>
                        <option value=''>Seleccionar</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='casa'>Casa</option>
                        <option value='comida'>Comida</option>
                        <option value='gastos'>Gastos</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>

                <input
                    type='submit'
                    value={
                        gastoEditar.nombre ? "Guardar Cambios" : "Agregar Gasto"
                    }
                />
            </form>
        </div>
    );
};

export default Modal;
