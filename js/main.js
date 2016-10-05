
$(document).ready(function() {
  app.start();
});

(function(exports) {

  exports.app = {
    start: function() {
      state.init();
      vendor.init();
      this.registerEventHandlers();
    },
    registerEventHandlers: function() {
      // Register event handlers
      $('#quick-menu label').on('click', function(e) {
        var targetSection = $(this).attr('for').trim();
        $.fn.fullpage.moveTo(targetSection);
      });

      $('#main .upper').on('click', function(e) {
        $.fn.fullpage.moveSectionUp();
      });

      $('#main .lower').on('click', function(e) {
        $.fn.fullpage.moveSectionDown();
      });

      (function prepareMenu() {
        var menu = document.getElementById("menu");
        menu.onclick = function(event) {
          styles = getComputedStyle(event.target.parentNode);
          transform = styles.getPropertyValue("transform");

          var values = transform.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var c = values[2];
          var d = values[3];

          var scale = Math.sqrt(a * a + b * b);
          var sin = b / scale;
          var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          log(angle);

          var rotateAngle = 60 - angle;
          menu.style.transform = "rotate(" + rotateAngle + "deg)";
        };
      })();
    }
  };

  // Application state/models
  //    the state object contains only one property
  //    an accessor descriptor: state.active
  exports.state = {
    init: function() {
      Object.defineProperty(this, 'active', {
        set: function(val) {
          this.currSection = val;
          var currIdx = ['objective', 'work', 'education', 'skills', 'projects', 'random'].indexOf(val) + 1;

          //  rotate and switch active circle menu
          var menu = document.getElementById('menu'),
            angle = currIdx - 1 <= 3 ? 60*(currIdx - 1)  :  (60*(currIdx - 1)  - 360),
            rotateAngle = 60 - angle;
          menu.style.transform = "rotate(" + rotateAngle + "deg)";

          $('#menu li a')
            .removeClass('active-menu')
            .filter(function(index) {
              return $(this).parent().attr('class') === val;
            })
            .addClass('active-menu');

          //  reset prev/next button state
          $('#main .btn').show();
          if (currIdx === 1) {
            $('#main .upper').hide();
          } else if (currIdx === 6) {
            $('#main .lower').hide();
          }
          $('#main').hover(function mouseIn() {
            $('.btn', this).show();
            if (currIdx === 1) {
              $('#main .upper').hide();
            } else if (currIdx === 6) {
              $('#main .lower').hide();
            }
          }, function mouseOut() {
            $('.btn', this).hide();
          });

          // switch active quick menu
          $('#quick-menu .quick-btn')
            .removeClass('active-main')
            .filter(function() {
              return $(this).attr("for") === val;
            })
            .addClass('active-main');
        },
        get: function() {
          return this.currSection;
        },
        enumerable: true,
        configurable: true
      });
    }
  };

})(window);
