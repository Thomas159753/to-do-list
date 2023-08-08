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
    //cache task
    const $taskDiv = $('.tasks-preview')
    const $btnShowTaskForm = $taskDiv.find('.add-task-show')
    const $taskInputDiv = $taskDiv.find('.task-input-div');
    const $taskInput = $taskDiv.find('#task_input');
    const $btnAddTask = $taskDiv.find('.btn_add_task')
    const project = new Project();

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', () => addProject());
        $ul.on('click', 'i.fa-trash-can', deleteProject);
        $ul.on('click', 'span.btn__text', getIndex);
        $addProject.on('click', () => hide_show($form, $addProject));
        $btnShowTaskForm.on('click', () => hide_show($taskInputDiv, $btnShowTaskForm));
    }
    const getIndex = (e) => {
        const projectIndex = $(e.currentTarget).closest('.project-li').data('project-index');
        $btnAddTask.on('click', () => addTask(projectIndex));
        
    }
    const addProject = () => {
        const projectName = $projectInput.val();
        project.add(projectName);
        $projectInput.val('');
        hide_show($form, $addProject);
    }
    const deleteProject = (e) => {
        project.del(e)
    }
    const addTask = (projectIndex) => {
        console.log(projectIndex)
        const taskName = $taskInput.val();
        project.addTask(projectIndex, taskName);
        $taskInput.val('')
        hide_show($taskInputDiv, $btnShowTaskForm);
    }

    
    return bindEvents()
})()