const MarktaskComplete = function(icon, task) {
    if (task.completed === false) {
        $(icon).removeClass('fa-circle').addClass('fa-check-circle');
    } else {
        $(icon).removeClass('fa-check-circle').addClass('fa-circle');
    }
}

export default MarktaskComplete;