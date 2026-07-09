import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado");
    const jsonData = {
      intento: data.intento,
      despachado: data.despachado,
    };

    console.log("Datos del formulario:", jsonData);

    try {
      await axios.put(
        `/api/v1/despachos/${despacho.idDespacho}`, 
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El despacho ha sido modificado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      
      onClose(); 
      
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo modificar el despacho. Revisa la consola.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Editar y cierre de despacho
        </div>
        
        {/* ID despacho */}
        <div className="mb-5">
          <label className="block font-bold mb-2">ID despacho</label>
          <input
            disabled={true}
            type="text"
            className="border border-gray-300 rounded-lg block w-full p-1 text-slate-400 bg-gray-100"
            value={despacho.idDespacho}
          />
        </div>

        {/* Fecha despacho */}
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha despacho</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-100"
            value={despacho.fechaDespacho}
            disabled={true}
          />
        </div>

        {/* Patente Camión */}
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente Camión</label>
          <input
            type="text"
            disabled={true}
            value={despacho.patenteCamion}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-100"
          />
        </div>

        {/* Intentos de entrega - EDITABLE */}
        <div className="mb-5">
          <label className="block font-bold mb-2">Intentos de entrega</label>
          <input
            type="number"
            defaultValue={despacho.intento}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("intento", { required: true })}
          />
        </div>

        {/* Despacho entregado - EDITABLE */}
        <div className="mb-5">
          <label className="block font-bold mb-2">Despacho entregado</label>
          <select
            defaultValue={despacho.despachado}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("despachado", { required: true })}
          >
            <option value={false}>Despacho abierto</option>
            <option value={true}>Cerrar despacho</option>
          </select>
        </div>

        {/* ID Compra */}
        <div className="mb-5">
          <label className="block font-bold mb-2">ID Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1 bg-gray-100"
            disabled={true}
            value={despacho.idCompra}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14 hover:bg-teal-700 transition-colors"
          type="submit"
        >
          Modificar Despacho
        </button>
      </form>
    </>
  );
};