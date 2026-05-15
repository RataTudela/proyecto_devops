import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    try {
      const response = await axios.get("/api/v1/ventas", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("Datos recibidos:", response.data);
      setVentas(response.data);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
    }
  };

  useEffect(() => {
    compras();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
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
                  <th className="pr-10">Orden de compra</th>
                  <th className="pr-10">Dirección</th>
                  <th className="pr-10">Fecha de compra</th>
                  <th className="pr-10">Valor total</th>
                  <th className="pr-10">Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas && ventas
                  .filter((venta) => !venta.despachoGenerado)
                  .map((venta) => (
                    <tr key={venta.idVenta} className="border-b hover:bg-gray-50">
                      <td className="pr-10 py-6">{venta.idVenta}</td>
                      <td className="pr-10 py-6">{venta.direccionCompra}</td>
                      <td className="pr-10 py-6">{venta.fechaCompra}</td>
                      <td className="pr-10 py-6">${venta.valorCompra}</td>
                      <td>
                        <button
                          onClick={() => handleAbrirModal(venta)}
                          className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300 transition-all"
                        >
                          Generar Despacho
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
        {ventaSeleccionada && (
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              setOpenModal(false);
              compras(); // Refrescar la tabla
            }}
          />
        )}
      </Modal>
    </>
  );
};