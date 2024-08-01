$('.hamburger-menu').click(function() {
    $('aside').toggleClass('close')
})

$('.menu').click(function() {
    $(this).siblings('.menu').removeClass('active')
    $(this).addClass(('active'));

    $(this).next('.menu').siblings('.menu-dropdown').children('.sub-menu').slideUp()
    $(this).next('.menu-dropdown').siblings('.menu-dropdown').children('.sub-menu').slideUp()
    $(this).next('.menu-dropdown').children('.sub-menu').slideToggle()

    $(this).next().siblings('.menu-dropdown').children('.sub-menu').children('.menu').removeClass('active')
})