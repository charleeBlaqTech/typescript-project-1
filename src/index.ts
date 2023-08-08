
import {v4 as uuidv4} from "uuid";

interface TaskCheck {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const inputValue = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: TaskCheck[]= loadTask();
tasks.forEach(addListItem);




form?.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(inputValue?.value == "" || inputValue?.value == null) return

    const newTask: TaskCheck = {
      id: uuidv4(),
      title: inputValue.value,
      completed: false,
      createdAt: new Date()
    }

    tasks.push(newTask);
    saveTask();
    addListItem(newTask);
    inputValue.value ="";

})



function addListItem(task: TaskCheck){
    const item= document.createElement("li");
    const label= document.createElement("label");
    const checkbox= document.createElement("input");

    checkbox.addEventListener('change', ()=>{
        task.completed = checkbox.checked;
        saveTask();
    })
    checkbox.type= "checkbox";
    checkbox.checked= task.completed;

    label.append(checkbox, task.title);
    item.appendChild(label);
    list?.appendChild(item);
}




function saveTask(){
    const stringify = JSON.stringify(tasks);
     localStorage.setItem('my-tasks', stringify);
}

function loadTask():TaskCheck[]{
    const allTaskJSON= localStorage.getItem('my-tasks');
    if(allTaskJSON == null){
      return [];
    }else{
      const taskOBT= JSON.parse(allTaskJSON);
      return taskOBT;
    }
    
}