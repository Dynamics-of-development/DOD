import React from 'react'
import useActiveRoute from 'hooks/useActiveRoute';
import { Link } from 'react-router-dom';
import CarritoLogo from './CarritoLogo';
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from './PrivateComponent';

const Sidebar = () => {
    const { logout, user } = useAuth0();
    return (
        <nav className='hidden lg:flex lg:w-72 h-full flex-column bg-purple-900 p-4 '>
            <Link className="no-underline" to='/admin'>
                <CarritoLogo />
            </Link>
            <div className='my-4'>
                <Ruta icono='fas fa-user' ruta='/admin/productos' nombre='Perfil' usuario={user} />
                <PrivateComponent roleList={['Admin', 'Vendedor']}>
                <Ruta icono='fas fa-tshirt' ruta='/admin/productos' nombre='Productos' />
                </PrivateComponent>
                <PrivateComponent roleList={['Admin', 'Vendedor']}>
                <Ruta icono='fas fa-cash-register' ruta='/admin/ventas' nombre='Ventas' />
                </PrivateComponent>
                <PrivateComponent roleList={['Admin']}>
                <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
                </PrivateComponent>
            </div>
            <Link to='/'>
                <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className=" bg-blue-500 p-2 text-white shadow-md hover:bg-indigo-700 rounded-lg w-full">Cerrar Sesión</button>
            </Link>
        </nav>
    );
};


const Ruta = ({ icono, ruta, nombre, usuario }) => {
    const isActive = useActiveRoute(ruta);
    return (
        <Link className="no-underline" to={ruta}>
            <button className={`p-1 my-2 bg-${isActive ? 'indigo' : 'blue'}-600 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
            >
                {usuario ? (
                    <>
                    <img src = {usuario.picture} className="h-5 w-5 rounded-full"/>
                    {usuario.name}
                    </>
                ) : (
                    <>
                        <i className={`${icono} w-10`} />
                        {nombre}
                    </>
                )}
            </button>
        </Link>
    );
};
export default Sidebar;