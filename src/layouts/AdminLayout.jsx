import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import Modal from 'react-modal'
import { useAuth } from '../hooks/useAuth'
import ModalUser from '../components/ModalUser';
import ModalNewProduct from '../components/ModalNewProduct';
import useStore from '../hooks/useStore';
import ModalOrder from '../components/ModalOrder';
import ModalEditProduct from '../components/ModalEditProduct';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

function AdminLayout() {

    const {modalUser, modalNewProduct, modalOrder, modalEditProduct} = useStore();
    const [loading, setLoading] = useState(true);
    useAuth({middleware: 'admin'})

    useEffect(() => {
        //Simulates a 5 second delay
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    if (loading) {
        return <div className='text-2xl text-center mt-3 font-semibold'>validating administrator...</div>;
    }

    return (
        <>
            <AdminSidebar></AdminSidebar>
            <div className="p-4 sm:ml-64">
                <Outlet></Outlet>
            </div>

            <Modal isOpen={modalUser} style={customStyles}>
                <ModalUser></ModalUser>
            </Modal>

            <Modal isOpen={modalNewProduct} style={customStyles}>
                <ModalNewProduct></ModalNewProduct>
            </Modal>

            <Modal isOpen={modalEditProduct} style={customStyles}>
                <ModalEditProduct></ModalEditProduct>
            </Modal>

            <Modal isOpen={modalOrder} style={customStyles}>
                <ModalOrder></ModalOrder>
            </Modal>
        </>
    )
}

export default AdminLayout