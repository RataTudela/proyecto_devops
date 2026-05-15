import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const fetchDespachos = async () => {
    try {
      const response = await axios.get("/api/v1/despachos", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("Despachos cargados:", response.data);
      setDespachos(response.data);
    } catch (error) {
      console.error("Error al obtener despachos:", error);
    }
  };

  useEffect(() => {
    fetchDespachos();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="py-10 border-b">
                  <th className="pr-10">Orden despacho</th>
                  <th className="pr-10">Orden compra</th>
                  <th className="pr-10">Dirección</th>
                  <th className="pr-10">Fecha</th>
                  <th className="pr-10">Patente</th>
                  <th className="pr-10">Estado</th>
                  <th className="pr-10">Intentos</th>
                  <th className="pr-10">Acción</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((despacho) => (
                  <tr key={despacho.idDespacho} className="border-b hover:bg-gray-50">
                    <td className="pr-10 py-6">{despacho.idDespacho}</td>
                    <td className="pr-10 py-6">{despacho.idCompra}</td>
                    <td className="pr-10 py-6">{despacho.direccionCompra}</td>
                    <td className="pr-10 py-6">{despacho.fechaDespacho}</td>
                    <td className="pr-10 py-6">{despacho.patenteCamion}</td>
                    <td className="pr-10 py-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${despacho.entregado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {despacho.entregado ? "Entregado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="pr-10 py-6">{despacho.intento}</td>
                    <td>
                      <button
                        onClick={() => handleAbrirModal(despacho)}
                        className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300 transition-all"
                      >
                        Cerrar despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              fetchDespachos(); // Refrescamos la lista después de editar
            }}
          />
        )}
      </Modal>
    </>
  );
};