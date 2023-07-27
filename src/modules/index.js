import Project from './projects.js'
import hide_show from './hide-show'

const application = (function() {
    //cache dom
    const $nav = $('.nav-bar');
    const $addProject = $nav.find('#new_project')
    const $form = $nav.find('#project_form');
    const $projectInput = $form.find('#project_input');
    const $btnAddProject = $form.find('.btn_add_project');
    const $btnCancelProject = $form.find('#btn_cancel_project');

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', (event) => addProject())
        $addProject.on('click', hide_show)
    }

    const addProject = () => {
        const project = new Project($projectInput.val());
        hide_show();
    }

    bindEvents()
})()