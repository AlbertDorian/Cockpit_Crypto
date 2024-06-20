import React, { ReactNode } from 'react';
import './Modal.css'; // Assurez-vous de créer un fichier CSS pour les styles de la modale

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode; // Modifiez ici pour accepter plusieurs enfants
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
