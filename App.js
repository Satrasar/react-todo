import React, { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineCheck} from 'react-icons/ai';


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      desciption:newDescription
    }
//Save
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr)); //(key,value)
  };
//complated delete
  const handleDeleteComplatedTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem('complatedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
//Delete
  const handleDeleteTodo = (index)=> {
   let reducedTodo = [...allTodos];
   reducedTodo.splice(index);
   localStorage.setItem('todolist',JSON.stringify(reducedTodo));
   setAllTodos(reducedTodo);
  }
// complated add
  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' +m+':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('complatedTodos',JSON.stringify(updatedCompletedArr)); //(key,value)

  }


  useEffect(()=>{ //useEffect de tıpkı useState gibi React da bir hooks fonksiyonudur. Bu fonksiyon da component'in mount, update veya unmount durumlarında işlemleri gerçekleştirmek için kullanılır. 
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let saveComplatedTodo = JSON.parse(localStorage.getItem('complatedTodos'))
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    if (saveComplatedTodo){
      setCompletedTodos(saveComplatedTodo)
    }
  },[])

  return (
    <div className='App'>
      <h1>My todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='whats the title'/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='whats the description'/>
          </div>
          <div className='todo-input-item'>
           
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen ===false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen ===true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>

          {isCompleteScreen===false && allTodos.map((item,index)=> {
            return(
              <div className='todo-list-item' key={index}>
                <div>
              <h3>{item.title}</h3>
              <p>{item.desciption}</p>
           </div>
           <div>
             <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
             <AiOutlineCheck className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>
 
           </div>
           </div>
            )
          })
        }

          {isCompleteScreen===true && completedTodos.map((item,index)=> {
            return(
              <div className='todo-list-item' key={index}>
                <div>
              <h3>{item.title}</h3>
              <p>{item.desciption}</p>
              <p><small>Completed on: {item.completedOn}</small></p>
           </div>
           <div>
             <AiOutlineDelete className='icon' 
             onClick={()=>handleDeleteComplatedTodo(index)} 
             title='Delete?'/>
 
           </div>
           </div>
            )
          })
        }




        </div>
      </div>
    </div>
  );
}

export default App;
