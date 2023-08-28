import Mustache from 'mustache';
class Project {
  constructor(name, index) {
    this.name = name;
    this.tasks = [];
    this.completedTasks = [];
    this.dataIndex = index;
    this.cacheDom();
  }

  cacheDom() {
    this.$nav = $('.nav-bar');
    this.$projectModule = this.$nav.find('#projectModule');
    this.$ul = this.$projectModule.find('ul');

    this.$tasksPreview = $('.tasks-preview');
    this.$taskUl = this.$tasksPreview.find('#tasks-list');
  }

  render(i) {
    const projectTemplate = `
    <li class="project-li item" data-index="{{dataIndex}}">
        <span class="btn__icon"><i class="fa-solid fa-list"></i></span>
        <span class="btn__text">{{name}}</span>
        <span class="btn__icon"><i class="fa-regular fa-trash-can"></i></span>
    </li>
    `;
    const taskTemplate =`
      <li class="item" data-index="{{dataIndex}}">
        <span class="task_icon"><i class="fa-regular fa-circle"></i></span>
        <span class="task_text">{{task}}</span>
        <input class="date" type="date" id="dateInput" name="date">
      </li>
    `;
    const taskCompleteTemplate = `
    <li class="item" data-index="{{dataIndex}}">
      <span class="task_icon"><i class="fa-regular fa-check-circle"></i></span>
      <span class="task_text">{{task}}</span>
      <input class="date" type="date" id="dateInput" name="date">
    </li>
  `;
    if (i === 'project'){
      this.$ul.append(Mustache.render(projectTemplate, {name: this.name, dataIndex: this.dataIndex}));
    }
    else if (i === 'task'){
      this.$taskUl.empty();
      this.tasks.forEach(task => {
        this.$taskUl.append(Mustache.render(taskTemplate, {task: task.name, dataIndex: task.dataIndex}));
      })
      this.completedTasks.forEach(task => {
        this.$taskUl.append(Mustache.render(taskCompleteTemplate, {task: task.name, dataIndex: task.dataIndex}));
      })
    }
  }
  addProjectTask(taskName, index) {
    this.tasks.push({ name: taskName, completed: false, dataIndex: index});
  }
  completeTask(taskIndex, taskSearched) {
    if(taskSearched.completed === false){
      const completedTask = this.tasks.splice(taskIndex, 1)[0];
      completedTask.completed = true;
      this.completedTasks.push(completedTask);
    }
    else{
      const unCompletedTask = this.completedTasks.splice(taskIndex, 1)[0];
      unCompletedTask.completed = false;
      this.tasks.push(unCompletedTask);
    }
  }
  deleteProject(){
    this.tasks = [];
    this.completedTasks = [];
  }
}

export default Project;