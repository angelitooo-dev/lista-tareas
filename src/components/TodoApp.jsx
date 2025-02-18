import React from 'react'

export const TodoApp = () => {

  return (
    <div className='todoContainer'>
        <h1>Lista De Tareas</h1>
        <form className='todoCreateForm'>
            <input className='todoInput'/>
            <input className='buttonCreate' type='submit' value='Create Todo'/>
        </form>
        

    </div>
  )
}
