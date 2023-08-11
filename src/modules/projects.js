import Mustache from 'mustache';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.dataIndex = name;
      this.cacheDom()
  }

  cacheDom() {
    this.$nav = $('.nav-bar');
    this.$projectModule = this.$nav.find('#projectModule');
    this.$ul = this.$projectModule.find('ul');
    this.$template = this.$projectModule.find('#project-template').html();

    this.$tasksPreview = $('.tasks-preview');
    this.$tasktemplate = this.$tasksPreview.find('#tasks-template').html();
    this.$taskUl = this.$tasksPreview.find('#tasks-list');
  }

  render() {
    const data = {
      projects: [{name: this.name, dataIndex: this.dataIndex}]
    };
    // const allTasks = this.projects.reduce((tasks, project) => tasks.concat(project.tasks), []);
    
    // data.tasksList = allTasks;

    this.$ul.html(Mustache.render(this.$template, data));
    // this.$taskUl.html(Mustache.render(this.$tasktemplate, { tasklist: allTasks }));
  }
  addProjectTask(taskName) {
    this.tasks.push({ name: taskName });
    console.log(this.tasks)
  }
  // del(e){
  //   const $remove = $(e.target).closest('li');
  //   const i = this.$ul.find('li').index($remove);
  //   this.projects.splice(i, 1);
  //   this.render();
  // }
}

export default Project;