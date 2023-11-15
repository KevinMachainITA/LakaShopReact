import React from 'react'
import useStore from '../hooks/useStore'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import Modal from 'react-modal'
import ModalProduct from '../components/ModalProduct'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ModalPurchase from '../components/ModalPurchase'

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

Modal.setAppElement('#root')

function Layout() {

  const {user, error} = useAuth({middleware: 'auth'})
  const {modal, modalPurchase} = useStore()

  return (
    <>
      <div>
          <Navbar></Navbar>
          <div className="w-11/12 mx-auto flex flex-wrap py-6">
            <Outlet></Outlet>
            <Cart></Cart>
          </div>
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProduct></ModalProduct>
      </Modal>

      <Modal isOpen={modalPurchase} style={customStyles}>
        <ModalPurchase></ModalPurchase>
      </Modal>     

      <ToastContainer></ToastContainer>
    </>
  )
}

export default Layout