const hide_show = (function() {
    //cash dom
    const $nav = $('.nav-bar')
    const $form = $nav.find('form')

    if ($form.css('display') === 'none') {
        $form.css('display', 'flex');
    } else {
        $form.css('display', 'none');
    }
})
export default hide_show