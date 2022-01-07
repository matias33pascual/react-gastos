import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
    gastos,
    presupuesto,
    setPresupuesto,
    presupuestoValido,
    setPresupuestoValido,
    setGastos,
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {presupuestoValido ? (
                <ControlPresupuesto
                    gastos={gastos}
                    presupuesto={presupuesto}
                    setGastos={setGastos}
                    setPresupuesto={setPresupuesto}
                    setPresupuestoValido={setPresupuestoValido}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setPresupuestoValido={setPresupuestoValido}
                />
            )}
        </header>
    );
};

export default Header;
