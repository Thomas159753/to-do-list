import Project from './projects.js'
import hide_show from './hide-show'

const application = (function() {
    //cache dom
    const $nav = $('.nav-bar');
    const $addProject = $nav.find('#new_project');
    // cache form dom
    const $form = $nav.find('#project_form');
    const $projectInput = $form.find('#project_input');
    const $btnAddProject = $form.find('.btn_add_project');
    const $btnCancelProject = $form.find('#btn_cancel_project');
    //cache project dom
    const $ul = $nav.find('ul');
    //cache task
    const $taskDiv = $('.tasks-preview');
    const $btnShowTaskForm = $taskDiv.find('.add-task-show');
    const $taskInputDiv = $taskDiv.find('.task-input-div');
    const $taskInput = $taskDiv.find('#task_input');
    const $btnAddTask = $taskDiv.find('.btn_add_task');
    const $taskUl = $taskDiv.find('#tasks-list');
    const $taskHeader = $taskDiv.find('.task-header');
    
    let projects = [];
    let index = 0;

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', () => addProject());
        $ul.on('click', 'i.fa-trash-can', deleteProject);
        $ul.on('click', 'li.project-li', (e) => {
            getIndex(e)
            hide_show(undefined, $btnShowTaskForm, false)});
        $taskUl.on('click', 'li.task-li', getIndex)
        $addProject.on('click', () => hide_show($form, $addProject));
        $btnShowTaskForm.on('click', () => hide_show($taskInputDiv, $btnShowTaskForm));
    }
    const renderProjectTasks = (projectSearched) => {
        $taskHeader.html(projectSearched.name);
        $taskUl.empty();
        $btnAddTask.off('click').on('click', () => addTask(projectSearched));
        projectSearched.render('task');
    }
    const getIndex = (e) => {  //modafie to swap betwen task and project
        const projectIndex = $(e.currentTarget).closest('.item').data('index');
        console.log(projectIndex)
        const projectSearched = projects.find(project => project.dataIndex == projectIndex);
        renderProjectTasks(projectSearched);
    }
    const addProject = () => {
        const newProject = new Project($projectInput.val(), index++);
        projects.push(newProject);
        newProject.render('project');
        $projectInput.val('');
        hide_show($form, $addProject);
    }
    const deleteProject = (e) => {
        // project.del(e)
    }
    const addTask = (projectSearched) => {
        const project = projectSearched;
        project.addProjectTask($taskInput.val(), index++);
        project.render('task');
        $taskInput.val('');
        hide_show($taskInputDiv, $btnShowTaskForm);
    }

    
    return bindEvents();
})()