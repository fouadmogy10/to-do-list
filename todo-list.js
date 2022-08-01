let inp=document.querySelector(".input");
let AddBtn=document.querySelector(".add"),
tasksDiv=document.querySelector(".tasks"),
arrOfTasks=[];
if(localStorage.getItem("tasks")){
    arrOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

class functionsToDo{
    addTaskToArr(taskText){
        const tasks={
            id:Date.now(),
            title:taskText,
            completed:false,
        }
        arrOfTasks.push(tasks);
    }
    addTasksToPage(arrOfTasks){
        tasksDiv.innerHTML="";
        arrOfTasks.forEach((task) => {
            let div=document.createElement("div");
            div.className="task";
            if(task.completed){
                div.className="task done"
            }
            div.setAttribute("data-id",task.id);
            div.appendChild(document.createTextNode(task.title));
            let span=document.createElement("span");
            span.className="del";
            span.appendChild(document.createTextNode("Delete"));
            div.appendChild(span);
            tasksDiv.appendChild(div);
            console.log(div);
        });
    }
    addTaskToLS(arrOfTasks){
        window.localStorage.setItem("tasks",JSON.stringify(arrOfTasks));
    }
    getDataFromLS(){
        let data=window.localStorage.getItem("tasks");
        if(data){
            let tasks=JSON.parse(data);
            this.addTasksToPage(tasks);
        }
    }
    deleteTaskFromLS(taskId){
        arrOfTasks= arrOfTasks.filter( (task) => task.id != taskId);
        this.addTaskToLS(arrOfTasks);
    }
    togglestatus(taskId){
        //  For Explain Only
  for (let i = 0; i < arrOfTasks.length; i++) {
    if(arrOfTasks[i].id == taskId){
        arrOfTasks[i].completed==false? ( arrOfTasks[i].completed=true):(arrOfTasks[i].completed=false)
    }
    }
    this.addTaskToLS(arrOfTasks);
    }
}

let obj=new functionsToDo;
obj.getDataFromLS();


AddBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(inp.value!==""){
        obj.addTaskToArr(inp.value);
        obj.addTaskToLS(arrOfTasks);
        inp.value="";
        obj.addTasksToPage(arrOfTasks)
        console.log(arrOfTasks);
    }
})
tasksDiv.addEventListener("click",
(e)=>{
    if (e.target.classList.contains("del")){
        obj.deleteTaskFromLS(e.target.parentElement.getAttribute("data-id"));

        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")){
        obj.togglestatus(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
})

