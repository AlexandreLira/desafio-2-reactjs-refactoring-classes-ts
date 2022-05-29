import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import { Product, ProductEditing } from '../../types';




interface ModalEditFoodProps {
  isOpen: boolean;
  editingFood: Product;
  setIsOpen: () => void;
  handleUpdateFood: (food: ProductEditing) => Promise<void>;
}

function ModalEditFood(props: ModalEditFoodProps) {
  const {
    isOpen,
    handleUpdateFood,
    setIsOpen,
    editingFood
  } = props

  const formRef = useRef<FormHandles>(null)

  async function handleSubmit(food: ProductEditing) {
    console.log(food)
    handleUpdateFood(food);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
