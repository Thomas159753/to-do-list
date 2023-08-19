const hide_show = function(element, btn, isVisible) {
    const $element = $(element)
    const $btn = $(btn)
    if ($element.css('display') === 'none' && $btn.css('display') === 'flex') {
        $element.css('display', 'flex');
        $btn.css('display', 'none')
    } 
    else if ($btn.css('display') === 'none' && isVisible === false) {
        $btn.css('display', 'flex');
    } else {
        $element.css('display', 'none');
        $btn.css('display', 'flex')
    }
}
export default hide_show