window.onscroll = function() {scrollFunction()};
var header = $('#header');
function scrollFunction() {
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
    header.removeClass('fade-transparent').addClass('fade-background')
  }
  else{
    header.removeClass('fade-background').addClass('fade-transparent')
  }
}
