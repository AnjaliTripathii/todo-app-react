import React, { useState } from 'react';
import './ToDo.css';

const ToDo = () => {
    const [toDos , setToDos] = useState([]);
    const [inputValue , setInputValue] = useState('');
    const [editMode,setEditMode] = useState(false);
    const [editId,setEditId] = useState(null);
    const [editValue,setEditValue]= useState('');

    const addToDo = () =>{
        if(inputValue.trim()!== ''){
            const newToDo = {
                id : new Date().getTime(),
                text : inputValue,
            }
            setToDos([...toDos,newToDo]);
            setInputValue('');
        }
    }

    const deleteToDo = (id) =>{
      const updateToDo = toDos.filter((toDo)=>toDo.id !== id);
      setToDos(updateToDo);
    }

    const enterEditMode = (id,text)=>{
       setEditMode(true);
       setEditId(id);
       setEditValue(text);
    }
    
    const updateToDo = ()=>{
       const updatedToDos = toDos.map((toDo)=>{
        if(toDo.id===editId){
          return {
            ...toDo,text:editValue
          }
          
        }
        return toDo;
       });
       setToDos(updatedToDos);
       setEditMode(false);
       setEditId(null);
       setInputValue('');
    }

  return (
    <div className='todo-container'>
      <h2>ToDo List</h2>
      <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
      {
        editMode?(
          <div>
          <input type="text" value={editValue} onChange={(e)=>setEditValue(e.target.value)}/>
          <button onClick={updateToDo}>Update</button>
          </div>
        ):(
          <button onClick={addToDo}>Add</button>
        )
  
      }
      
      <ul>
        {
            toDos.map((toDo)=>(
                <li key={toDo.id}>
                  {toDo.text}
                  <div>
                  <button onClick={()=>deleteToDo(toDo.id)}>Delete</button>
                  <button onClick={()=>enterEditMode(toDo.id,toDo.text)}>Edit</button>
                  </div>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default ToDo
