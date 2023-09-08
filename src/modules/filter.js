const filter = function (projects, parameter, seachBarVal) {
    const today = new Date();

    return projects.reduce((filteredTasks, project) => {
        let filteredProjectTasks = [];

        if (parameter === 'today') {
            filteredProjectTasks = project.tasks.filter(task =>
                new Date(task.date).toLocaleDateString() === today.toLocaleDateString()
            );
        } else if (parameter === 'upcoming') {
            filteredProjectTasks = project.tasks.filter(task =>
                new Date(task.date) > today
            );
        } else if (parameter === 'all') {
            filteredProjectTasks = [...project.tasks];
        } else if (parameter === 'search'){
            filteredProjectTasks = project.tasks.filter(task =>
                task.name === seachBarVal
            );
        }
        return [...filteredTasks, ...filteredProjectTasks];
    }, []);
};

export default filter;
