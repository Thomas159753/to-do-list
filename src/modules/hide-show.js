const hide_show = function(element, btn, isVisible) {
    const $element = $(element)
    const $btn = $(btn)
    if ($element.css('display') === 'none' && $btn.css('display') === 'flex' && isVisible === false) {
        $element.css('display', 'flex');
        $btn.css('display', 'none')
    } 
    else if (isVisible === true) { // for delete
        $btn.css('display', 'none');
    }  else {
        $element.css('display', 'none');
        $btn.css('display', 'flex')
    }
}
export default hide_show