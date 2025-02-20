import { useState } from 'react';

export const useStateTodo = () => {
  const [title, setTitle] = useState(''); // Inicializamos el título vacío
  const [todos, setTodos] = useState([]); // Inicializamos el array de tareas vacío
  const [editar, setEditar] = useState(false); //Inicializamos para editar texto

  return { title, 
    setTitle,
     todos,
      setTodos, 
      editar,
     setEditar};
};