// I know that the code could be better.
// If you have some tips or improvement, please let me know.

/*$('.img-parallax').each(function(){
    var img = $(this);
    var imgParent = $(this).parent();
    function parallaxImg () {
      var speed = img.data('speed');
      var imgY = imgParent.offset().top;
      var winY = $(this).scrollTop();
      var winH = $(this).height();
      var parentH = imgParent.innerHeight();
  
  
      // The next pixel to show on screen      
      var winBottom = winY + winH;
  
      // If block is shown on screen
      if (winBottom > imgY && winY < imgY + parentH) {
        // Number of pixels shown after block appear
        var imgBottom = ((winBottom - imgY) * speed);
        // Max number of pixels until block disappear
        var imgTop = winH + parentH;
        // Porcentage between start showing until disappearing
        var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
      }
      img.css({
        top: imgPercent + '%',
        transform: 'translate(-50%, -' + imgPercent + '%)'
      });
    }
    $(document).on({
      scroll: function () {
        parallaxImg();
      }, ready: function () {
        parallaxImg();
      }
    });
  });*/

  /*let parallaxRT = document.querySelector('.parallax');*/
  let disappear = document.querySelector('.disappear');
  let appear = document.querySelector('.appear');
  
  function scrollParallax() {
    let scrollTop = document.documentElement.scrollTop;
  }

  window.addEventListener('scroll', scrollParallax);

  $(window).on('scroll', function() {
    var scrolled = $(this).scrollTop();

    $('.animate-in').filter(function() {
         return scrolled >= $(this).offset().top-550;
    }).addClass('appear');

    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 200) {
            $("header").addClass("header-fixed");
            $(".logo-inside").addClass("logo-scroll");
        } else{
          $(".logo-inside").removeClass("logo-scroll");
          $("header").removeClass("header-fixed");
        }
    });

    
});