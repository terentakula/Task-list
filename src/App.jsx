import { useState } from "react";

function App() {
  const [openSection, setOpenSection] = useState({
    form: false,
    list: true,
    complite: true
  })
  function toggleSection(section){
    setOpenSection(prev => ({...prev, [section]: !prev[section]}))
  }
  const [tasks, setTasks] = useState([])

  function addTasks(task){
    setTasks([...tasks, {...task, completed: false, id: Date.now()}])
  }
  console.log(tasks);

  const activeTask = tasks.filter(task => !task.completed)
  const compTask = tasks.filter(task => task.completed)

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button className={`close-button ${openSection.form ? "open" : ""}`} onClick={()=> toggleSection("form")}>+</button>
        {openSection.form && <TaskForm addTasks={addTasks}/>}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button className={`close-button ${openSection.list ? "open" : ""}`} onClick={()=> toggleSection("list")}>+</button>
        <div className="sort-controls">
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {openSection.list && <TaskList/>}
      </div>

      <div className="completed-task-container">
        <h2>Completed Task</h2>
        <button className={`close-button ${openSection.complite ? "open" : ""}`} onClick={()=> toggleSection("complite")}>+</button>
        {openSection.complite && <CompletedTaskList/>}
      </div>
      <Footer />
    </div>
  );
}

export const TaskForm = ({addTasks}) => {
  const [title,setTitle] = useState("")
  const [priority,setPriority] = useState("Low")
  const [deadline,setDeadline] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    if (title.trim() && deadline) {
      addTasks({title,priority,deadline})
    }
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" required />
      <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="datetime-local" value={deadline} onChange={(e)=>setDeadline(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export const TaskList = () => {
  return (
    <ul className="task-list">
    </ul>
  );
};

function CompletedTaskList() {
  return (
    <ul className="completed-task-list">
    </ul>
  );
}

export const TaskItem = () => {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          title <strong>priority</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>

      <div className="task-buttons">
        <button className="complete-button">Complete</button>
      
        <button className="delete-button">Delete</button>
      </div>
    </li>
  );
};

export const Footer = () => {
  return (
    <div className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional,rendering, array methods (map,
        filter), event handling
      </p>
    </div>
  );
};

export default App;
