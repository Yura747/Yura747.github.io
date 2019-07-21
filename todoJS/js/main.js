
/*
    ********************************
    **                            **
    **          LESSON 28         **
    **                            **
    ********************************
                        
    ! Тема: sessionStorage; localStorage; cookie

	TODO:
  Делаем список todo:

  у нас списк и кнопка, при сохранении новой задачи она появляется в списке ниже
  рядом с каждой задачей есть чекбокс, если его нажать, то задача становится выполненной 
  и текст должен быть зачеркнутым (если хотите)
  также рядом с каждой задачей есть крестик,
   при клике на который задача удаляется из списка
  все данные храним в localStorage и используем только js (можно es2015)

*/

const input=document.querySelector(".input"),ul=document.querySelector(".ul-tasks-list");class TODO{constructor(a){this.task=a||null,this.id=new Date,this.checkboxState=!1,this.createNewTask(a),this.renderList()}updateLS(a){return a&&localStorage.setItem("tasks",JSON.stringify(a)),JSON.parse(localStorage.getItem("tasks"))}createNewTask(a){const b={id:this.id,checkboxState:this.checkboxState,task:this.task};if(a){const a=this.updateLS();if(a)a.push(b),this.updateLS(a);else{const a=[];a.push(b),this.updateLS(a)}}}renderList(){ul.innerHTML="";const a=this.updateLS();a&&a.forEach(a=>{ul.innerHTML+=`
          <li class="li-task ${a.checkboxState}" data-id="${a.id}"> ${a.task}
            <button class="delete"></button>
            <button class="edit"></button>
            <span class="checkbox-wr">
              <input type="checkbox" class="checkbox" ${a.checkboxState}>
            </span>
          </li>`})}}document.querySelector(".add").addEventListener("click",()=>{let a=input.value;new TODO(a);input.value=""}),document.addEventListener("keypress",a=>{if(13==a.which){let a=input.value;new TODO(a);input.value=""}}),ul.addEventListener("click",a=>{const b=a.target.parentElement.getAttribute("data-id"),c=todo.updateLS();if(a.target.classList.contains("delete")){const a=c.filter(a=>a.id!==b);todo.updateLS(a),todo.renderList()}if(a.target.classList.contains("edit")){const[a]=c.filter(a=>a.id==b),d=prompt("Entry task",a.task);d&&(a.task=d,todo.updateLS(c),todo.renderList())}if(a.target.classList.contains("checkbox")){const b=a.target.parentElement.parentElement.getAttribute("data-id"),[d]=c.filter(a=>a.id==b);d.checkboxState=!!a.target.checked&&"checked",todo.updateLS(c),todo.renderList()}}),document.querySelector(".clear").addEventListener("click",()=>{localStorage.clear(),todo.renderList()});const todo=new TODO;