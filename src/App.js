import './App.css'
import React, { useState } from 'react';

function TodoApp() {
  return (
    <div className="container">
      <Todo priority={"high"}/>
      <Todo priority={"low"}/>
    </div>
  );
}

function Todo(props){
  const placeHolder = props.priority === "high" ? "Добавить важных дел" : "Добавить";
  const [value, setValue] = useState('');
  const [tasksList, setTasksList] = useState([]);

  function onInputChange(event)  {
    setValue(event.target.value);
  }

  function deleteTask(event){
    const taskId = event.target.parentNode.id;
    const filteredList = tasksList.filter(task => task.id != taskId);
    setTasksList(filteredList);
  }

  function createTask(event){
    event.preventDefault();
    if(!value) {
      return;
    }
    const task = {
      value: value,
      id: +new Date(),
      check : false
    }
    setTasksList(tasksList.concat(task));
    setValue('');
  }

  function statusCheck(event) {
    const eventId = Number(event.target.parentNode.parentNode.id);
    setTasksList([
      ...tasksList.map(task => {
        if (task.id !== eventId) {
          return {...task}
        } else {
          return {...task, check: !task.check}
        }
      })
    ])
  }

  return(
   <div className={props.priority}>
      <Header priority={props.priority}/>
      <form className="form-add" onSubmit={(e) => createTask(e)} >
        <input className="form__input" type="text" placeholder={placeHolder} onChange={onInputChange} value={value}/>
        <button className='form__button'></button>
      </form>
      <TasksList priority={props.priority} tasks={tasksList} checkTask={statusCheck} deleteTask={deleteTask}/>
   </div>
 );
}

function TasksList(props){
  const tasks = props.tasks
  const list = tasks.map((task) =>
    <Task
      key={task.id}
      id={task.id}
      value={task.value}
      deleteTask={props.deleteTask}
      select={task.check}
      check={props.checkTask}
    />
  );

  return (
    <div className='list'>{list}</div>
  );
}

function Task(props){
  let classNameDiv = "task"
  let classNameCheckbox = "checkbox";
  let classNameButtonDelete = "detete-button";
  if (props.select) {
    classNameDiv += " task_checked";
    classNameCheckbox += " checkbox_checked";
    classNameButtonDelete = "detete-button_checked"
  }
  return(
    <div id={props.id} className={classNameDiv}>
      <label className={classNameCheckbox} >
        <input type='checkbox'></input>
        <span onClick={props.check}></span>
      </label>
      <p className='task__text'>{props.value}</p>
        <button className={classNameButtonDelete} onClick={props.deleteTask}></button>
    </div>
  );
}

function Header(props){
  return(
    <h2 className="header-high">
        {props.priority.toUpperCase()}
    </h2>
  );
}

export default TodoApp;
