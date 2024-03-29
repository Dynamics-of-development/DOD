import React, { useState, useEffect } from 'react'
import { Table, Button, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddModalProducto from 'components/AddModalProducto';
import EditModalProducto from 'components/EditModalProducto';
import { nanoid } from 'nanoid'
import { obtenerProductos } from 'utils/productos/api';
import { eliminarProducto } from 'utils/productos/api';


const Productos = () => {
  const [data, setData] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(data);
  //Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [item, setItem] = useState(data)

  //funciones
  const insertFn = () => {
    setShowAddModal(true);
  }

  const editFn = (item) => {
    setShowEditModal(true);
    setItem(item);
  }

  const deleteFn = async (_id) => {
    let opcion = window.confirm("¿Estás seguro de eliminar el producto?");
    if (opcion == true) {
      await eliminarProducto(_id, (resp) => {
        console.log(resp.data);
      },
        (error) => {
          console.log(error)
        }
      );
      const nuewData = data.filter(e => e._id !== _id);
      setData(nuewData);
    };
  };

  const loadAxios = async () => {
    await obtenerProductos(resp => {
      const nuewData = []
      const dataAxios = resp.data

      dataAxios.map(item => {
        nuewData.push(
          {
            _id: item._id,
            producto: item.producto,
            descripcion: item.descripcion,
            valorUnitario: item.valorUnitario
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
    setProductosFiltrados(
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
          <Button color="primary" onClick={() => insertFn()} className="m-2">Registrar nuevo producto</Button>
        </div>
        <br />
        <br />
        <Table responsive className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Valor Unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((item) => (
              <tr key={nanoid()}>
                <th>{item._id.slice(22)}</th>
                <td>{item.producto}</td>
                <td>{item.descripcion}</td>
                <td>{item.valorUnitario}</td>
                <td>
                  <Button color="primary" onClick={() => editFn(item)}><i className="fas fa-pen"></i></Button>{" "}
                  <Button color="danger" onClick={() => deleteFn(item._id)}><i className="fas fa-eraser"></i></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <AddModalProducto showAddModal={showAddModal} setShowAddModal={setShowAddModal} setData={setData} data={data} />
      <EditModalProducto showEditModal={showEditModal} setShowEditModal={setShowEditModal} setData={setData} data={data} item={item} />
    </>
  )
}

export default Productos