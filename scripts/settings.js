const settingsIcon = document.querySelector('.settings-icon');
const settingsList = document.querySelector('.settings-list');

const timeSwitch = document.querySelector('.time-switch');
const dateSwitch = document.querySelector('.date-switch');
const greetingSwitch = document.querySelector('.greeting-switch');
const weatherSwitch = document.querySelector('.weather-switch');
const playerSwitch = document.querySelector('.player-switch');

const timeContainer = document.querySelector('.time');
const dateContainer = document.querySelector('.date');
const weather = document.querySelector('.weather');
const greetingContainer = document.querySelector('.greeting-container');
const playerContainer = document.querySelector('.player');

let rotateSettings = -360;
settingsIcon.addEventListener('click', () => {
   rotateSettings += 180;
   settingsIcon.style.transform = `rotate(${rotateSettings}deg)`;
   settingsIcon.style.transition = '0.75s';
   settingsList.classList.toggle("settings-list-active");
   settingsIcon.classList.toggle("settings-icon-active");
   
   // settingsList.style.display = 'block';
})

timeSwitch.addEventListener('click', () => {
   timeSwitch.classList.toggle("switch-on");
   timeContainer.classList.toggle("hide");
})

dateSwitch.addEventListener('click', () => {
   dateSwitch.classList.toggle("switch-on");
   dateContainer.classList.toggle("hide");
})
greetingSwitch.addEventListener('click', () => {
   greetingSwitch.classList.toggle("switch-on");
   greetingContainer.classList.toggle("hide");
})
weatherSwitch.addEventListener('click', () => {
   weatherSwitch.classList.toggle("switch-on");
   weather.classList.toggle("hide");
   
})
playerSwitch.addEventListener('click', () => {
   playerSwitch.classList.toggle("switch-on");
   playerContainer.classList.toggle("hide");
})



const todoIcon = document.querySelector('.todo-icon');
const todoList = document.querySelector('.todo-list');
const push = document.querySelector('.push');
const todoValue = document.querySelector('.todo-input');

todoIcon.addEventListener('click', () => {
   todoList.classList.toggle("show");
   todoIcon.classList.toggle("todo-icon-active");
   
})


push.addEventListener('click', () => {
      document.querySelector('.tasks').innerHTML 
      += `
         <div class="task"> 
            <span class="taskname"> 
               ${todoValue.value}
            </span>
            
               <div class="circle"></div>
               <div class="bin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </div>
            
         </div>   
      `;

      // <div class="tasks-icons">
   toLocal();

   var currentTask = document.querySelectorAll('.bin');
   for (var i=0; i<currentTask.length; i++) {
      currentTask[i].onclick = function() {
      this.parentNode.remove();
    }
   }

   var completed = document.querySelectorAll('.circle');
   for (var i=0; i<completed.length; i++) {
      completed[i].onclick = function() {
      this.parentNode.classList.toggle('completed');
      this.classList.toggle('circle-active')
      
    }
   }

   document.querySelector('.todo-input').value = "";
})

const task = document.querySelectorAll('.task');
const tasks = document.querySelectorAll('.tasks');
var todos;

if(localStorage.getItem('task')){
   tasks.innerHTML = localStorage.getItem('todos');
}
function toLocal(){
   todos = task.innerHTML;
   localStorage.setItem('todos',todos);
}

      // function setLocalStorageTodo() {
      //    localStorage.setItem('taskname', taskname.value);
      // }
      //  window.addEventListener('beforeunload', setLocalStorageTodo);

      // function getLocalStorageTodo() {
      //    if(localStorage.getItem('taskname')) {
      //  taskname.value = localStorage.getItem('taskname');
      //     }
      // }
      // window.addEventListener('load', getLocalStorageTodo);

//  window.addEventListener('load', getLocalStorageTodo)


