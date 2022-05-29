import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Product, ProductEditing } from "../types";

interface FoodContextData {
  foods: Product[];
  editingFood: Product;
  editModalOpen: boolean;
  modalOpen: boolean;
  setEditModalOpen: (value: boolean) => void;
  setModalOpen: (value: boolean) => void;
  handleAddFood: (food: Product) => void;
  handleUpdateFood: (food: ProductEditing) => void;
  handleDeleteFood: (foodId: number) => Promise<void>;
  handleEditFood: (food: Product) => void;

}

interface FoodContextProps {
  children: ReactNode
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodContextProps) {
  const [foods, setFoods] = useState<Product[]>([])
  const [editingFood, setEditingFood] = useState<Product>({} as Product)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)




  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods');
      setFoods(response.data)
    }

    loadFoods()
  }, [])

  async function handleAddFood(food: Product) {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: ProductEditing) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {

    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: Product) {
    setEditingFood(food)
    setEditModalOpen(true)
  }


  return (
    <FoodContext.Provider 
      value={{ 
        foods, 
        editingFood,
        modalOpen,
        editModalOpen,
        setEditModalOpen,
        setModalOpen,
        handleAddFood, 
        handleDeleteFood, 
        handleEditFood,
        handleUpdateFood
      }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFood(): FoodContextData {
  const context = useContext(FoodContext)

  return context;
}