import React from 'react'
import { Outlet } from 'react-router-dom'
import useStore from '../hooks/useStore'
import ProfileNavbar from '../components/ProfileNavbar'
import Modal from 'react-modal'
import ModalUser from '../components/ModalUser'
import ModalUserProfile from '../components/ModalUserProfile'

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

function ProfileLayout() {

    const {modalUser} = useStore();

    return (
        <>
            <div>
                <ProfileNavbar></ProfileNavbar>
                <div className="w-11/12 mx-auto flex flex-wrap py-6">
                    <Outlet></Outlet>
                </div>
            </div>

            <Modal isOpen={modalUser} style={customStyles}>
                <ModalUserProfile></ModalUserProfile>
            </Modal>
        </>
    )
}

export default ProfileLayout