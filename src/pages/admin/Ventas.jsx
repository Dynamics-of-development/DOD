import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table, Button, Container,
} from "reactstrap";
import AddModal from 'components/AddModal';
import EditModal from 'components/EditModal';
import React, { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import { obtenerVentas } from "utils/ventas/api";
import { eliminarVenta } from "utils/ventas/api";


const Ventas = () => {
    const [data, setData] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    //Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltrados, setVentasFiltrados] = useState(data);


    const [item, setItem] = useState({})

    const insertFn = () => {
        setShowAddModal(true);
    }

    const editFn = (item) => {
        setShowEditModal(true);
        setItem(item);
    }

    const deleteFn = async (_id) => {
        let opcion = window.confirm("¿Estás seguro de eliminar esta venta?");
        if (opcion == true) {
            await eliminarVenta(_id, (resp) => {
                console.log(resp.data);
            },
                (error) => {
                    console.log(error)
                }
            );
            const newdata = data.filter(e => e._id !== _id);
            setData(newdata);
        };
    };

    const loadAxios = async () => {
        await obtenerVentas(resp => {
            const nuewData = []
            const dataAxios = resp.data

            dataAxios.map(item => {
                nuewData.push(
                    {
                        _id: item._id,
                        valorVenta: item.valorVenta,
                        identificador: item.identificador,
                        cantidad: item.cantidad,
                        precioUnitario: item.precioUnitario,
                        fechaVenta: item.fechaVenta,
                        cedulaCliente: item.cedulaCliente,
                        cliente: item.cliente,
                        vendedor: item.vendedor,
                        estado: item.estado
                    },
                )
            })
            setData(nuewData)
        });
    }

    useEffect(() => {
        if (ejecutarConsulta) {
            loadAxios();
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        setVentasFiltrados(
            data.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase())
            })
        );
    }, [busqueda, data]);

    return (
        <>
            <Container>
                <br />
                <div className="flex justify-between ">
                    <div className="w-2/4">
                        <div className="border-2 rounded-xl mt-4">
                            <span className="w-1/12"><i className="fa fa-search"></i></span>
                            <input type="search"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-11/12 py-1"
                                placeholder="Buscar..." />
                        </div>
                    </div>
                    <button>
                    </button>
                    <Button color="primary" onClick={() => insertFn()} className="m-2">Registrar nueva venta</Button>
                </div>
                <br />
                <br />
                <Table responsive className="tabla">
                    <thead>
                        <tr>
                            <th>IDVenta</th>
                            <th>Valor Total</th>
                            <th>ID</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Fecha Venta</th>
                            <th>C.c Cliente</th>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltrados.map((item) => (
                            <tr key={nanoid()}>
                                <th>{item._id.slice(22)}</th>
                                <td>{item.valorVenta}</td>
                                <td>{item.identificador}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.precioUnitario}</td>
                                <td>{item.fechaVenta}</td>
                                <td>{item.cedulaCliente}</td>
                                <td>{item.cliente}</td>
                                <td><a href={`mailto:${item.vendedor}`}>{item.vendedor}</a></td>
                                <td>{item.estado}</td>
                                <td>
                                    <Button color="primary" onClick={() => editFn(item)}><i className="fas fa-pen"></i></Button>{" "}
                                    <Button color="danger" onClick={() => deleteFn(item._id)}><i className="fas fa-eraser"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} setData={setData} data={data} />
            <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} setData={setData} data={data} item={item} />
        </>
    )
}

export default Ventas