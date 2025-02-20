import React, { useState } from 'react';
import { useStateTodo } from '../hooks/useStateTodo'; // Asegúrate de que el path sea correcto

export const TodoApp = () => {
  const { title, setTitle, todos, setTodos } = useStateTodo();
  const [editingTodo, setEditingTodo] = useState(null); // Para saber qué tarea está siendo editada

  // Maneja el cambio en el input
  function handleChange(event) {
    const value = event.target.value;
    setTitle(value);
  }

  // Maneja el click en el botón de agregar tarea
  function handleClick(e) {
    e.preventDefault();

    if (title.trim() === '') return;

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false, // Inicializamos las tareas como no completadas
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setTitle('');
  }

  // Maneja la edición de una tarea
  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setEditingTodo(todoToEdit); // Establece qué tarea estamos editando
  }

  // Guarda los cambios de la tarea editada
  function handleSave() {
    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, title: title } : todo
      );
      setTodos(updatedTodos);
      setTitle('');
      setEditingTodo(null); // Deja de editar
    }
  }

  // Cancelar la edición
  function handleCancel() {
    setTitle('');
    setEditingTodo(null);
  }

  // Función para eliminar una tarea
  function handleDelete(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Función para marcar una tarea como completada o no
  function handleToggleComplete(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="container mt-5">
      <h1 className="h1">Lista De Tareas</h1>
      <form className="todoCreateForm mb-3" onSubmit={handleClick}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={title}
            placeholder="Agregar una nueva tarea"
          />
          <button
            className="btn btn-primary"
            type="submit"
          >
            Crear Tarea
          </button>
        </div>
        {editingTodo && (
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Guardar Edición
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        )}
      </form>

      <div className="container">
        {todos.length === 0 ? (
          <p>No hay tareas.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((item) => (
                <tr key={item.id} className={item.completed ? 'table-success' : ''}>
                  <td>
                    {editingTodo && editingTodo.id === item.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleComplete(item.id)}
                      className={`btn ${item.completed ? 'btn-warning' : 'btn-success'}`}
                    >
                      {item.completed ? 'Pendiente' : 'Completado'}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn btn-info mx-5"
                    >
                      {editingTodo && editingTodo.id === item.id ? 'Editing...' : 'Editar'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
