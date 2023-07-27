import hide_show from './hide-show'

class Project {
    constructor(project) {
        this.project = project;
    }

    hideForm() {
        hide_show();
      }

    returnName(){
        return this.project
    }
}

export default Project