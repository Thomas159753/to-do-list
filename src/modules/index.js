import Project from './projects.js'
import hide_show from './hide-show'

const application = (function() {
    //cache dom
    const $nav = $('.nav-bar');
    const $addProject = $nav.find('#new_project')
    // cache form dom
    const $form = $nav.find('#project_form');
    const $projectInput = $form.find('#project_input');
    const $btnAddProject = $form.find('.btn_add_project');
    const $btnCancelProject = $form.find('#btn_cancel_project');
    //cache project dom
    const $ul = $nav.find('ul');

    const project = new Project();

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', (event) => addProject())
        $ul.on('click', 'i.fa-regular', deleteProject);
        $addProject.on('click', hide_show)
    }

    const addProject = () => {
        const projectName = $projectInput.val()
        project.add(projectName)
        $projectInput.val('')
        hide_show();
    }
    const deleteProject = (e) => {
        project.del(e)
    }

    
    return bindEvents()
})()