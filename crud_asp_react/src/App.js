import React, { useState,  useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {
  const baseUrl = "https://localhost:44385/api/gestores";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id: "",
    nombre: "",
    lanzamiento: "",
    desarrollador: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar =() => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
    .then ( response => {
      setData(response.data);
      console.log(response.data);
    }).catch( error => {
      console.log(error);
    });
  }

  const peticionPost = async () => {
    delete gestorSeleccionado.id;
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl, gestorSeleccionado)
    .then(response => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error => {
      console.log(error);
    });
  }

  const peticionPut = async () => {
    gestorSeleccionado.lanzamiento = parseInt(gestorSeleccionado.lanzamiento);
    await axios.put(baseUrl + "/" + gestorSeleccionado.id, gestorSeleccionado)
    .then( response => {
      var resp = response.data;
      var dataAux = data;
      // eslint-disable-next-line array-callback-return
      dataAux.map( gestor => {
        if (gestor.id === gestorSeleccionado.id){
          gestor.nombre = resp.nombre;
          gestor.lanzamiento = resp.lanzamiento;
          gestor.desarrollador = resp.desarrollador;
        }
      });
      abrirCerrarModalEditar();
    }).catch ( error => {
      console.log(error);
    });
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + "/" + gestorSeleccionado.id)
    .then( response => {
      setData(data.filter(gestor => gestor.id !== response.data));
      abrirCerrarModalEliminar();
    }).catch (error => {
      console.log(error);
    })
  }

  const seleccionarGestor = (gestor, caso) => {
    setGestorSeleccionado(gestor);
    if (caso === "Editar") {
      (caso === "Editar") && abrirCerrarModalEditar();
    } else {
      (caso === "Eliminar")  && abrirCerrarModalEliminar();
    }    
  }

  useEffect(() => {
    peticionGet();
  },[])

  return (
    <div className="App">
      <br />
      <button onClick={ () => abrirCerrarModalInsertar()} className='btn btn-success'>Insertar Nuevo Gestor</button>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map( gestor => (
            <tr key={gestor.id}>
              <td>{gestor.id}</td>
              <td>{gestor.nombre}</td>
              <td>{gestor.lanzamiento}</td>
              <td>{gestor.desarrollador}</td>
              <td>
                <button className="btn btn-primary" onClick={ () => seleccionarGestor(gestor, "Editar")}>Editar</button> {''}
                <button className="btn btn-danger" onClick={ () => seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Inserte Gestor de Base de Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={handleChange} />
            <label>Lanzamiento</label>
            <br/>
            <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
            <label>Desarrollador</label>
            <br/>
            <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'onClick={ () => peticionPost()}>Insertar</button>
          <button className='btn btn-danger' onClick={ () => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Gestor de Base de Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <br/>
            <input type="text" className="form-control" readOnly value={gestorSeleccionado && gestorSeleccionado.id}/>
            <label>Nombre</label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre} />
            <label>Lanzamiento</label>
            <br/>
            <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.lanzamiento}/>
            <label>Desarrollador</label>
            <br/>
            <input type="text" className="form-control" name="desarrollador" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.desarrollador}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'onClick={ () => peticionPut()}>Insertar</button>
          <button className='btn btn-danger' onClick={ () => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Desea eliminar el gestor de la Base de Datos?? {gestorSeleccionado && gestorSeleccionado.id}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={ () => peticionDelete()}>Eliminar</button>
          <button className='btn btn-danger' onClick={ () => abrirCerrarModalEliminar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
