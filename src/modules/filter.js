const filter = function (parameter, seachBarVal) {
    const today = new Date();

    const projects = [];
    // get all projects from LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const dataFromLocalStorage = localStorage.getItem(key);

        let parsedData = null;
        if (dataFromLocalStorage) {
            parsedData = JSON.parse(dataFromLocalStorage);
        }
        if (parsedData) {
            projects.push(parsedData);
        }
    }

    let filteredTasks = [];

    projects.forEach((project) => {
        let filteredProjectTasks = [];

        if (parameter === 'today') {
            filteredProjectTasks = project.tasks.filter((task) =>
                new Date(task.date).toLocaleDateString() === today.toLocaleDateString()
            );
        } else if (parameter === 'upcoming') {
            filteredProjectTasks = project.tasks.filter((task) =>
                new Date(task.date) > today
            );
        } else if (parameter === 'all') {
            filteredProjectTasks = [...project.tasks];
        } else if (parameter === 'search') {
            filteredProjectTasks = project.tasks.filter((task) =>
                task.name === seachBarVal
            );
        }
        filteredTasks = [...filteredTasks, ...filteredProjectTasks];
    });
    return filteredTasks;
};

export default filter;
