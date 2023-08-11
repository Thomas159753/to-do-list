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
    
    let projects = [];

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
        const newProject = new Project(projectName)
        projects.push(newProject)
        newProject.render();
        $projectInput.val('');
        hide_show($form, $addProject);
        console.log(projects)
    }
    const deleteProject = (e) => {
        project.del(e)
    }
    const addTask = (projectIndex) => {
        const taskName = $taskInput.val();
        const project = projects.find(project => project.dataIndex === projectIndex);
        project.addProjectTask(taskName);
        // project.render();
        $taskInput.val('')
        hide_show($taskInputDiv, $btnShowTaskForm);
    }

    
    return bindEvents()
})()