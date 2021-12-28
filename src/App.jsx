import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  // Definir state para pacientes
  const [pacientes, setPacientes] = useState([]); // Contiene la informacion de todos los pacientes
  const [paciente, setPaciente] = useState({}); // Contiene info del paciente seleccionado

  /*   // UseEfect para cargar contenido del localStorage la primera vez que se ejecuta:
  useEffect(() => {
    // Obtener pacientes del localStorage y asignarlo a pacientesLS:
    let pacientesLS = JSON.parse(localStorage.getItem("pacientes"));

    // Si pacientesLS es null convertirlo a []:
    pacientesLS ? null : (pacientesLS = []);

    // Agregar pacientesLS al arreglo de pacientes:
    setPacientes(pacientesLS);
  }, []); */

  // UseEfect para cargar contenido del localStorage la primera vez que se ejecuta (utilizando una funcion):
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];
      setPacientes(pacientesLS);
    };
    obtenerLS();
  }, []);

  // UseEffect para poner contenido en el localStorage
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

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
