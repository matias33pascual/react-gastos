import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setPresupuestoValido,
}) => {
    const [mensaje, setMensaje] = useState("");

    const handlePresupuesto = (e) => {
        e.preventDefault();

        // para convertirlo a numero y checkear que sea un numero
        if (!presupuesto || presupuesto < 0) {
            setMensaje("No es un presupuesto valido");
            return;
        }
        setMensaje("");
        setPresupuestoValido(true);
    };

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label htmlFor=''>Definir Presupuesto</label>
                    <input
                        type='number'
                        className='nuevo-presupuesto'
                        placeholder='ingresa tu presupuesto'
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))} // siempre se pasa como string, aunque sea de tipo number, por eso la conversion con Number()
                    />
                </div>
                <input type='submit' value='Agregar' />

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
