const textList = [
    "Fix your credit",
    "Educate you",
    "Remove negative items"
  ];
  const typingSpeed = 200; // In milliseconds
  const pauseBetweenLoops = 2000; // In milliseconds
  const typewriterText = document.getElementById("typewriter-text");
  const words = textList.map(text => text.split(" "));
  let currentTextIndex = 0;
  let currentWordIndex = 0;
  
  function typeWord() {
    if (currentWordIndex < words[currentTextIndex].length) {
      typewriterText.textContent += words[currentTextIndex][currentWordIndex] + " ";
      currentWordIndex++;
      setTimeout(typeWord, typingSpeed);
    } else {
      // Finished typing current text, pause before starting next loop
      setTimeout(startNextLoop, pauseBetweenLoops);
    }
  }
  
  function startNextLoop() {
    // Reset the typewriterText content
    typewriterText.textContent = "";
  
    // Move to the next text, or restart from the first if at the end
    currentTextIndex = (currentTextIndex + 1) % textList.length;
  
    // Reset the currentWordIndex
    currentWordIndex = 0;
  
    // Start typing again
    typeWord();
  }
  
  // Start typing
  typeWord();

  // mobile reviews

  $(document).ready(function() {
    $(".info-modal").on("click touchstart touchend", function() {
        event.preventDefault(),
        $("body").addClass("modal-open"),
        $("#overlayBox").show(),
        $("#disclaimer-modal").show()
    }),
    $("#overlayBox, .closeBtn").on("click touchstart touchend", function() {
        $("#overlayBox").hide(),
        $("body").removeClass("modal-open"),
        $("#disclaimer-modal").hide()
    })
});

// Mobile Navigation
var MobileSiteNav = {

  isOpen: false,
  currentNav: null,
  sectionHeader: null,
  menuHeight: null,
  menuHeightPadding: 40,
  menuHeightInitial: null,

  init: function () {

      // Hack to not display nav until page is loaded. Some people don't like seeing partially loaded pages.
      $('.mobile_menu_wrapper').css('opacity', '1');

      // open or close nav
      $('#top_nav_mobile_navigation_link').on('click.mobileSiteNav', function (e) {
          e.stopPropagation();
          if (MobileSiteNav.isOpen) {
              MobileSiteNav.close();
          } else {
              MobileSiteNav.open();
          }
      });

  
      // move back
      $('.nav_temp_backward').on('click.mobileSiteNav', function () {
          MobileSiteNav.moveBack(this);
      });
      // move back to main nav
      $('.nav_main').on('click.mobileSiteNav', function () {
          MobileSiteNav.moveToMain();
      });

      function mobileViewUpdate() {
          if ($(window).width() >= 960) {
              MobileSiteNav.close();
          }
      }

      $(window).resize(mobileViewUpdate);
  },
  open: function () {
      $('.inner_wrap').addClass('move_right');
      $('.top_callout_slider.secondary').addClass('move_right');
      $('.mobile_menu_wrapper').addClass('mobile_nav_visible');
      //$('.inner_wrap').css('padding-top', ($('.nav-bar-cont .top_nav').height()) + "px" );
      $('.cta_nav_bar').addClass('active-2');
      $('.top_bar_nav').addClass('active-2');
      $('.mobile_login_bar').addClass('active-2');
      $('.inner_wrap').on('click.mobileSiteNav', function () {
          MobileSiteNav.close();
      });

      MobileSiteNav.isOpen = true;
  },
  close: function () {
      $('.inner_wrap').removeClass('move_right');
      $('.top_callout_slider.secondary').removeClass('move_right');
      $('.mobile_menu_wrapper').removeClass('mobile_nav_visible');
      $('.cta_nav_bar').removeClass('active-2');
      $('.top_bar_nav').removeClass('active-2');
      $('.mobile_login_bar').removeClass('active-2');
      $('#first-level .menu-toggle').each(function() {  
          if( $(this).hasClass("open") ) {
              $(this).toggleClass("open");
              $(this).next().slideToggle();
          }
      });
      // if ($(window).width() < 960) {
      //         $('.inner_wrap').css('padding-top', ($('.nav-bar-cont').height()) + "px" );
      // }
      $('.inner_wrap').off('click.mobileSiteNav');
      MobileSiteNav.isOpen = false;
  }

};


var Branding = {
  setBrand: function (t) {
      Branding.changeLogo(t), $.cookie("lexingtonlaw_state", t, {path: "/"})
  }, changeLogo: function (t) {
      if (Branding.isJCHbranded(t)) {
          ($("a.company_logo").html('<img src="/content/dam/lexington-law/assets/images/JCH-logo-blue.png" alt="John C Heath">'), $.cookie("lexingtonlaw_state_logo", "true", {path: "/"}))
      } else {
          ($("a.company_logo").html('<img class="no-offset logo-invert-blue" src="/content/dam/lexington-law/assets/images/company-logo-blue.png" alt="Lexington Law"><img class="top-offset logo-invert-blue" src="/content/dam/lexington-law/assets/images/company-logo-short-blue.png" alt="Lexington Law">'), $.cookie("lexingtonlaw_state_logo", "false", {path: "/"}))
      }
  }, isJCHbranded: function (t) {
      return -1 != ["GA", "IN", "IA", "KY", "MS", "NE", "NV", "NJ", "NY", "OH", "TX"].indexOf(t)
  }
};

//State Selector
var StateSelector = {
  init: function () {
      $('.state_select').on('change', function () {
          var state = $(this).val();
          $('.state_select').val(state);
          Branding.setBrand(state);
      });
  }
};


$(function () {
  MobileSiteNav.init();
  StateSelector.init();

  $('#first-level').find('.menu-toggle').click(function(){  
      $(this).toggleClass("open");
      $(this).next().slideToggle();
  });
});


//similiar mobile navigatin in mobile footer
$(document).ready(function ($) {
  $('#second-level').find('.menu-toggle').click(function(){  
      $(this).toggleClass("open");
      $(this).next().slideToggle();
  });
});
