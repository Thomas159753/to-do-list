const hide_show = function(element, btn, isVisible) {
    const $element = $(element)
    const $btn = $(btn)
    if ($element.css('display') === 'none' && $btn.css('display') === 'flex' && isVisible === false) {
        $element.css('display', 'flex');
        $btn.css('display', 'none')
    } 
    else if ($btn.css('display') === 'none' && isVisible === false) {
        $btn.css('display', 'flex');
    }
    else if ($btn.css('display') === 'flex' && isVisible === true) {
        $btn.css('display', 'none');
        console.log('here')
    }  else {
        $element.css('display', 'none');
        $btn.css('display', 'flex')
    }
}
export default hide_show