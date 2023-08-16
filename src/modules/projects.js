import Mustache from 'mustache';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.dataIndex = name;
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
    <li class="project-li" data-project-index="{{dataIndex}}">
        <span class="btn__icon"><i class="fa-solid fa-list"></i></span>
        <span class="btn__text">{{name}}</span>
        <span class="btn__icon"><i class="fa-regular fa-trash-can"></i></span>
    </li>
    `;
    const taskTemplate =`
      <li>
        <span class="btn_icon"><i class="fa-light fa-circle"></i></span>
        <span class="btn_text">{{task}}</span>
      </li>
    `;
    if (i === 'project'){
      this.$ul.append(Mustache.render(projectTemplate, {name: this.name, dataIndex: this.dataIndex}));
    }
    else if (i === 'task'){
      this.$taskUl.empty();
      this.tasks.forEach(task => {
        this.$taskUl.append(Mustache.render(taskTemplate, {task: task.name}));
      })
    }
  }
  addProjectTask(taskName) {
    this.tasks.push({ name: taskName });   
  }
  // del(e){
  //   const $remove = $(e.target).closest('li');
  //   const i = this.$ul.find('li').index($remove);
  //   this.projects.splice(i, 1);
  //   this.render();
  // }
}

export default Project;