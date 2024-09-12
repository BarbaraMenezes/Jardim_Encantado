import { useEffect, useState } from 'react';
import "./modal.css";
import { CatalogoData } from '../../interface/CatalogoData';
import { useCatalogoDataMutate } from '../../hooks/userCatalogoDataMutate';

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
}

interface ModalProps {
    closeModal: () => void;
    cardData?: CatalogoData; // cardData é opcional
}

const Input: React.FC<InputProps> = ({ label, value, updateValue }) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={typeof value === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(event) => updateValue(event.target.value)}
            />
        </>
    );
}

export function CreateModal({ closeModal, cardData }: ModalProps) {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const { createMutation, updateMutation } = useCatalogoDataMutate();

    useEffect(() => {
        if (cardData) {
            setTitle(cardData.title);
            setPrice(cardData.price);
            setImage(cardData.image);
        } else {
            setTitle("");
            setPrice(0);
            setImage("");
        }
    }, [cardData]);

    const submit = () => {
        if (!title || !image || isNaN(price) || price < 0) {
            // Adicione mensagens de erro conforme necessário
            console.error("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const catalogoData: CatalogoData = {
            title,
            price,
            image,
            id: cardData?.id // Inclua o id somente se for uma atualização
        };

        if (cardData && cardData.id) {
            // Atualiza o item existente
            updateMutation.mutate(catalogoData, {
                onError: (error) => {
                    console.error("Erro ao atualizar item:", error);
                }
            });
        } else {
            // Cria um novo item
            createMutation.mutate(catalogoData, {
                onError: (error) => {
                    console.error("Erro ao criar item:", error);
                }
            });
        }
    };

    useEffect(() => {
        if (createMutation.isSuccess || updateMutation.isSuccess) {
            closeModal();
        }
    }, [createMutation.isSuccess, updateMutation.isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button className="close-btn" onClick={closeModal}>&times;</button>
                <h2>{cardData ? `Alterar o Item (${cardData.title})` : 'Cadastrar Novo Item'}</h2>
                <form className="input-container">
                    <Input label="Título" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={(val: string) => setPrice(parseFloat(val))} />
                    <Input label="Imagem" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {cardData ? 'Alterar' : 'Salvar'}
                </button>
            </div>
        </div>
    );
}
