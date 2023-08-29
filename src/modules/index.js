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
    let projectSearched = null

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', () => addProject());
        $ul.on('click', 'i.fa-trash-can', (e) => {
            e.stopPropagation();
            getIndex(e);
        });
        $ul.on('click', 'li.project-li', (e) => {getIndex(e)});
        $taskUl.on('click', 'i.fa-circle, i.fa-check-circle', (e) => {getIndex(e,e.currentTarget)});            
        $addProject.on('click', () => hide_show($form, $addProject, false));
        $btnShowTaskForm.on('click', () => hide_show($taskInputDiv, $btnShowTaskForm, false));
    }

    const getIndex = (e) => {
        const itemIndex = $(e.currentTarget).closest('.item').data('index');
        const item = $(e.currentTarget).closest('.item');
        
        if ($(e.currentTarget).hasClass('project-li')) {
            projectSearched = projects.find(project => project.dataIndex == itemIndex);
            renderTasks(projectSearched);
        }
        else if ($(e.currentTarget).hasClass('fa-circle') || $(e.currentTarget).hasClass('fa-check-circle')) {
            let taskIndex, taskSearched;
    
            if ($(e.currentTarget).hasClass('fa-circle')) {
                taskIndex = projectSearched.tasks.findIndex(task => task.dataIndex === itemIndex);
                taskSearched = projectSearched.tasks.find(task => task.dataIndex === itemIndex);
            } else {
                taskIndex = projectSearched.completedTasks.findIndex(task => task.dataIndex === itemIndex);
                taskSearched = projectSearched.completedTasks.find(task => task.dataIndex === itemIndex);
            }
    
            if (taskSearched) {
                projectSearched.completeTask(taskIndex, taskSearched);
                renderTasks(projectSearched);
            }
        }
        else if ($(e.currentTarget).hasClass('fa-trash-can')) {
            const projectToDelete = projects.find(project => project.dataIndex == itemIndex);
            deleteProject(projectToDelete, itemIndex, item)
        }
    }
    const addProject = () => {
        const newProject = new Project($projectInput.val(), index++);
        projects.push(newProject);
        newProject.render('project');
        $projectInput.val('');
        hide_show($form, $addProject);
    }
    const deleteProject = (projectToDelete, projectIndex, $projectItem) => {  
        projects = projects.filter(project => project.dataIndex !== projectIndex);
        projectToDelete.deleteProject();
        $projectItem.remove();
        renderTasks(projectToDelete, true);
    }
    const addTask = (projectSearched) => {
        projectSearched.addProjectTask($taskInput.val(), index++);
        $taskInput.val('');
        renderTasks(projectSearched);
    }
    // rendering tasks
    const renderTasks = (projectSearched, index) => {
        if (index === true){
            $taskHeader.html("");
            hide_show(undefined, $btnShowTaskForm, true);
            $taskUl.empty();
        }
        else {
            $taskHeader.html(projectSearched.name);
            $btnAddTask.off('click').on('click', () => addTask(projectSearched));
            hide_show($taskInputDiv, $btnShowTaskForm);
        }
        projectSearched.render('task');
    }

    return bindEvents();
})()

//glitch on delete when nothing is display in tasks and delete the project add task button shows