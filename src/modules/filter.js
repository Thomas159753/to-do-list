const filter = function(projects) {
    const today = new Date();

    projects.forEach(project => {
        project.tasks = project.tasks.filter(task => {
            const taskDate = new Date(task.date).toLocaleDateString();
            const todayDate = today.toLocaleDateString();
            
            if (taskDate === todayDate) {
                console.log(task);
                return true;
            }
            
            return false;
        });
    });
};

export default filter;
