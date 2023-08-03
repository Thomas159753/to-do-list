import Mustache from 'mustache';

class Project {
  constructor() {
    this.projects = []
      this.cacheDom()
  }

  cacheDom() {
    this.$nav = $('.nav-bar');
    this.$projectModule = this.$nav.find('#projectModule');
    this.$ul = this.$projectModule.find('ul');
    this.$template = this.$projectModule.find('#project-template').html();
  }

  render() {
    const data = {
      projects: this.projects,
    };
    this.$ul.html(Mustache.render(this.$template, data));
  }
  add(projectname){
    this.projects.push({ name: projectname});
    this.render()
  }
  del(e){
    const $remove = $(e.target).closest('li');
    const i = this.$ul.find('li').index($remove);
    this.projects.splice(i, 1);
    this.render();
  }
}

export default Project;