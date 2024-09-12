import "./modal.css";
import { CatalogoData } from '../../interface/CatalogoData';

interface ActionModalProps {
    closeModal: () => void;
    cardData: CatalogoData;
    onEdit: () => void;
    onDelete: () => void;
}

export function ActionModal({ closeModal, cardData, onEdit, onDelete }: ActionModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button 
                    className="close-btn" 
                    onClick={closeModal}
                    aria-label="Fechar modal"
                >
                    &times;
                </button>
                <h2>
                    Selecione uma Ação para o Item "{cardData.title}"
                </h2>
                <div className="modal-actions">
                    <button onClick={onEdit} className="btn-secondary">
                        Alterar
                    </button>
                    <button  onClick={onDelete} className="btn-secondary">
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
