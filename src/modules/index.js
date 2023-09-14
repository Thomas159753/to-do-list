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
    
    let index = JSON.parse(localStorage.getItem("index")) || 0;
        if (index === 0){
            localStorage.setItem("index", JSON.stringify(index));
        }
    let projectSearched = null

    // bind events
    const bindEvents = () => {
        render(undefined, 'project')
        $form.on('submit', (e) =>{
            e.preventDefault();
            addProject();
        });
        $todayBtb.on('click', () => render(projectSearched, 'filter',filter('today')));
        $inboxBtb.on('click', () => render(projectSearched, 'filter',filter('all')));
        $upcomingBtb.on('click', () => render(projectSearched, 'filter',filter('upcoming')));
        $searchBar.on('input', () => {render(projectSearched, 'filter', filter('search', $searchBar.val()))});
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
            const searchedProject = JSON.parse(localStorage.getItem(itemIndex)); //find project in storage by index
            projectSearched = new Project(searchedProject.name, searchedProject.dataIndex, searchedProject.tasks, searchedProject.completedTasks); //remake project
            render(projectSearched, 'task');
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
                    render(projectSearched, 'task');
                }
            }
        }
        else if ($(e.currentTarget).hasClass('fa-trash-can')) {
            const foundProject = JSON.parse(localStorage.getItem(itemIndex)); //find project in storage by index
            const projectToDelete = new Project(foundProject.name, foundProject.dataIndex, foundProject.tasks, foundProject.completedTasks); //remake project
            deleteProject(projectToDelete, item)
        }
        localStorage.setItem(`${projectSearched.dataIndex}`, JSON.stringify(projectSearched)); //update the data in storage
    }
    const addProject = () => {
        const newProject = new Project($projectInput.val(), index++);
        localStorage.setItem("index", JSON.stringify(index)) // update the index
        newProject.render('project');
        $projectInput.val('');
        hide_show($form, $addProject);
        localStorage.setItem(`${newProject.dataIndex}`, JSON.stringify(newProject)); //add project to storage
    }
    const deleteProject = (projectToDelete, $projectItem) => {
        projectToDelete.deleteProject();
        $projectItem.remove();
        localStorage.removeItem(projectToDelete.dataIndex); //delete project from local storage
        render(projectToDelete, 'delete');
    }
    const addTask = (projectSearched) => {
        projectSearched.addProjectTask($taskInput.val(), index++);
        localStorage.setItem("index", JSON.stringify(index)) // update the index
        $taskInput.val('');
        localStorage.setItem(`${projectSearched.dataIndex}`, JSON.stringify(projectSearched)); //update storage by adding task
        render(projectSearched, 'task');
    }
    // rendering tasks
    const render = (projectSearched, rendertype, filteredTasks) => {
        if (rendertype === 'delete'){
            $taskHeader.html("");
            hide_show(undefined, $btnShowTaskForm, true);
            $taskUl.empty();
            projectSearched.render(rendertype);
        }
        else if (rendertype === 'project'){
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const dataFromLocalStorage = localStorage.getItem(key);
        
                let parsedData = null;
                let newProject
                if (dataFromLocalStorage) {
                    parsedData = JSON.parse(dataFromLocalStorage);
                }
                if (parsedData instanceof Object) {
                    newProject = new Project(parsedData.name, parsedData.dataIndex, parsedData.tasks, parsedData.completedTasks); //remake project
                    newProject.render('project')
                }
            }
        }
        else if (rendertype === 'filter'){
            $taskHeader.html("");
            hide_show(undefined, $btnShowTaskForm, true);
            hide_show(undefined, $taskInputDiv, true);
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

    // store somewhare the index count in storage so it doesnt reset
        //make a new page for the first load and for the index in that place