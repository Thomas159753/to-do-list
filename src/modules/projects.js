import hide_show from './hide-show';
import Mustache from 'mustache';

class Project {
  constructor(project) {
    this.project = project;
    this.cacheDom();
    this.render();
  }

  cacheDom() {
    this.$nav = $('.nav-bar');
    this.$projectModule = this.$nav.find('#projectModule');
    this.$ul = this.$projectModule.find('ul');
    // this.$template = this.$projectModule.find('#project-template').html();
  }

  render() {
    const data = {
      projects: this.project,
    };
    const template = '<li><span>{{projects}}</span><i class="del">X</i></li>'
    const renderedTemplate = Mustache.render(template, data);
    this.$ul.append(renderedTemplate);
  }
}

export default Project;