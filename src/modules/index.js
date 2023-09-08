import Project from './projects.js'
import hide_show from './hide-show'
import filter from './filter.js'

const application = (function() {
    //cache dom
    const $nav = $('.nav-bar');
    const $addProject = $nav.find('#new_project');
    const $inboxBtb = $nav.find('#inbox');
    const $todayBtb = $nav.find('#today');
    const $upcomingBtb = $nav.find('#upcoming');
    const $searchBar = $nav.find('#search');
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
    
    //------------- test
    // const project1 = new Project("Project A", 0);

// project1.addProjectTask("Task 1", 0); // No date
// project1.addProjectTask("Task 2", 1); // Today's date
// project1.addProjectTask("Task 3", 2); // Upcoming date

// const project2 = new Project("Project B", 1);

// project2.addProjectTask("Task A", 0); // No date
// project2.addProjectTask("Task B", 1); // Today's date
// project2.addProjectTask("Task C", 2); // Upcoming date

// projects.push(project1, project2);
    //---------------------

    // bind events
    const bindEvents = () => {
        $btnAddProject.on('click', () => addProject());
        $todayBtb.on('click', () => renderTasks(projectSearched, 'filter',filter(projects, 'today')));
        $inboxBtb.on('click', () => renderTasks(projectSearched, 'filter',filter(projects, 'all')));
        $upcomingBtb.on('click', () => renderTasks(projectSearched, 'filter',filter(projects, 'upcoming')));
        $searchBar.on('input', () => {renderTasks(projectSearched, 'filter', filter(projects, 'search', $searchBar.val()))});
        $ul.on('click', 'i.fa-trash-can', (e) => {
            e.stopPropagation();
            getIndex(e);
        });
        $ul.on('click', 'li.project-li', (e) => {getIndex(e)});
        $taskUl.on('click', 'i.fa-circle, i.fa-check-circle', (e) => {getIndex(e,e.currentTarget)});
        $taskUl.on('change', 'input.date', (e) => {getIndex(e,e.currentTarget)});
        $addProject.on('click', () => hide_show($form, $addProject, false));
        $btnShowTaskForm.on('click', () => hide_show($taskInputDiv, $btnShowTaskForm, false));
    }

    const getIndex = (e) => {
        const itemIndex = $(e.currentTarget).closest('.item').data('index');
        const item = $(e.currentTarget).closest('.item');
        
        if ($(e.currentTarget).hasClass('project-li')) {
            projectSearched = projects.find(project => project.dataIndex == itemIndex);
            renderTasks(projectSearched, 'task');
        }
        else if ($(e.currentTarget).hasClass('fa-circle') || $(e.currentTarget).hasClass('fa-check-circle') || $(e.currentTarget).hasClass('date')) {
            let taskIndex, taskSearched;
    
            if ($(e.currentTarget).hasClass('fa-circle') || $(e.currentTarget).hasClass('date')) {
                taskIndex = projectSearched.tasks.findIndex(task => task.dataIndex === itemIndex);
                taskSearched = projectSearched.tasks.find(task => task.dataIndex === itemIndex);
            } else {
                taskIndex = projectSearched.completedTasks.findIndex(task => task.dataIndex === itemIndex);
                taskSearched = projectSearched.completedTasks.find(task => task.dataIndex === itemIndex);
            }
    
            if (taskSearched) {
                if ($(e.currentTarget).hasClass('date')) {
                    const newDate = $(e.currentTarget).val();
                    projectSearched.addDate(taskSearched, newDate);
                }
                else{
                    projectSearched.completeTask(taskIndex, taskSearched);
                    renderTasks(projectSearched, 'task');
                }
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
        renderTasks(projectToDelete, 'delete');
    }
    const addTask = (projectSearched) => {
        projectSearched.addProjectTask($taskInput.val(), index++);
        $taskInput.val('');
        renderTasks(projectSearched, 'task');
    }
    // rendering tasks
    const renderTasks = (projectSearched, rendertype, filteredTasks) => {
        if (rendertype === 'delete'){
            $taskHeader.html("");
            hide_show(undefined, $btnShowTaskForm, true);
            $taskUl.empty();
            projectSearched.render(rendertype);
        }
        else if (rendertype === 'filter'){
            $taskHeader.html("");
            hide_show(undefined, $btnShowTaskForm, true);
            $taskUl.empty();
            projectSearched.render(rendertype, filteredTasks);
        }
        else {
            $taskHeader.html(projectSearched.name);
            $btnAddTask.off('click').on('click', () => addTask(projectSearched));
            hide_show($taskInputDiv, $btnShowTaskForm);
            projectSearched.render(rendertype);
        }
    }

    return bindEvents();
})()

//when i find bugs add the steps on how to replicate it
    //bugs
    // when tect is open to add task and then click on inbox task stays open
    // when adding project and hit enter the page resets
    //bug if you change the date on a tusk that is searched ie in inbox it doesnt save the date


// a bug thats potentially a feature now that when i complete a task i cant set a due date
    //complete the task and then try to set a due date it doesnt save it the code skips the if (taskSearched) line