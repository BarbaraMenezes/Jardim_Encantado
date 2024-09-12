import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { userCatalogoData } from './hooks/userCatalogoData';
import { ActionModal } from './components/create-modal/modal-opcao';
import { CreateModal } from './components/create-modal/create-modal';
import { CatalogoData } from './interface/CatalogoData';

// Supondo que useCatalogoDataMutate é um hook para mutações de dados
import { useCatalogoDataMutate } from './hooks/userCatalogoDataMutate';

function App() {
    const { data, refetch } = userCatalogoData();
    const { mutate: deleteCatalogo } = useCatalogoDataMutate().deleteMutation;

    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CatalogoData | null>(null);

    const handleOpenActionModal = (cardData: CatalogoData) => {
        setSelectedCard(cardData);
        setIsActionModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setSelectedCard(null);
        setIsCreateModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsActionModalOpen(false);
        setIsCreateModalOpen(false);
    };

    const handleEdit = () => {
        handleCloseModals();
        setIsCreateModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedCard && selectedCard.id) {
            deleteCatalogo(selectedCard.id, {
                onSuccess: () => {
                    console.log('Card deleted successfully');
                    // Atualize a lista de cards
                    refetch();
                },
                onError: (error) => {
                    console.error('Error deleting card:', error);
                },
            });
        } else {
            console.error('No card selected or invalid card id.');
        }
        handleCloseModals();
    };

    return (
        <div className="container">
            <header className="header">
                <img src="src/image/flowers-left.png" alt="Header Image" className="header-image-left" />
                <img src="src/image/flowers-right.png" alt="Header Image" className="header-image" />
                <h1>Jardim Encantado</h1>
            </header>

            <div className="card-grid">
                {data?.map(catalogoData => (
                    <Card
                        key={catalogoData.id}
                        title={catalogoData.title}
                        price={catalogoData.price}
                        image={catalogoData.image}
                        onClick={() => handleOpenActionModal(catalogoData)} // Passa dados do card ao clicar
                    />
                ))}
            </div>

            {isActionModalOpen && (
                <ActionModal
                    closeModal={handleCloseModals}
                    cardData={selectedCard}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {isCreateModalOpen && (
                <CreateModal
                    closeModal={handleCloseModals}
                    cardData={selectedCard} // Passa dados do card para o modal
                />
            )}

            <button onClick={handleOpenCreateModal}>Novo</button>
        </div>
    );
}

export default App;
