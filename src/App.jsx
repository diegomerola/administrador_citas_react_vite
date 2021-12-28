import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  // Definir state para pacientes
  const [pacientes, setPacientes] = useState([]); // Contiene la informacion de todos los pacientes
  const [paciente, setPaciente] = useState({}); // Contiene info del paciente seleccionado

  // Funcion para eliminar un paciente
  const eliminarPaciente = (id) => {
    const pacientesActualizado = pacientes.filter(
      (elemento) => elemento.id !== id
    );
    setPacientes(pacientesActualizado);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className=" mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
