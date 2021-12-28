import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  // Definir states para campos:
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  // Definir state para error:
  const [error, setError] = useState(false);

  // useEffect: Escucha los cambios que suceda en alguna parte del state:
  useEffect(() => {
    // Si paciente no esta vacio:
    if (Object.keys(paciente).length > 0) {
      // Carga los datos del paciente seleccionado en el formulario:
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]); // Esta atento a paciente y se ejecuta solo cuando el objeto haya cambiado

  // Funcion para submit
  const handleSubmit = (e) => {
    // Detener submit
    e.preventDefault();

    // Validar
    if ([nombre, propietario, email, alta, sintomas].includes("")) {
      // Si hay un error:
      setError(true);
      return;
    }
    // Sino hay un error:
    setError(false);

    // Crear objeto paciente
    const objetoPaciente = {
      nombre: nombre,
      propietario: propietario,
      email: email,
      alta: alta,
      sintomas: sintomas,
    };

    // Si existe paciente.id: -- Modo editando registro --
    if (paciente.id) {
      // Agrego ID:
      objetoPaciente.id = paciente.id;

      // Busco el paciente actualizado:
      const pacientesActualizado = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      // Agrego todos los pacientes (incluido el actualizado) al arreglo de pacientes
      setPacientes(pacientesActualizado);

      // Limpiar state de paciente
      setPaciente({});
    }
    // Sino existe paciente.id: -- Modo nuevo registro --
    else {
      // Agregar paciente al arreglo principal:
      setPacientes([...pacientes, objetoPaciente]);

      // Crear un ID unico usando UUID V4:
      objetoPaciente.id = uuidv4();
    }

    // Limpiar formulario:
    setNombre("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");
  };

  return (
    <div className=" md:w-1/2 lg:w-2/5">
      <h2 className=" font-black text-3xl text-center">
        Seguimiento Pacientes
      </h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y{" "}
        <span className=" text-indigo-600 font-bold ">Administralos</span>
      </p>
      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        onSubmit={handleSubmit}
      >
        {error ? (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
