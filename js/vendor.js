(function(exports) {

   exports.vendor = {
    init: function() {
      // Vendor initialization (fullpage.js, typed.js)
      $('#fullpage').fullpage({
        anchors: [
          "objective", "work", "education",
          "skills", "projects", "random"
        ],
        onLeave: function(idx, nIdx, direction) {
          // log('do some computation on current screen');
        },
        afterLoad: function(anchorLink, idx) {
          // ONLY do one thing:
          //     mutate application state
          //     those UI state listeners (who subscribes to app state) will be automatically updated by the setter method [[state.active]]
          state.active = anchorLink;
        }
      });

      var emulateTyping = function(options) {
        if (typeof options !== "object")
          throw new Error('options must be an object');

        var typedStrings = "";
        if (options.hasOwnProperty('typedStrings'))
          typedStrings = options['typedStrings'];

        $('#fullpage .description').hide()
        $("#fullpage .typed-element").typed({
          strings: typedStrings,
          typeSpeed: 20,
          backSpeed: 20,
          startDelay: 0,
          backDelay: 500,
          shuffle: false,                     // shuffle the strings
          loop: false,
          // loopCount: false,                   // false = infinite
          showCursor: true,
          cursorChar: "🁢",
          contentType: 'html',                 // or 'text'
          callback: function() {              // call when done
            $('#fullpage .typed-element').hide();
            $('#fullpage .typed-cursor').hide();
            $('#fullpage .description').show();
          }
        });
      };

      emulateTyping({
        typedStrings: [
          "To be rather <strong>simple</strong>",
          "I promise <strong>NOT</strong> to pull down the <strong>average</strong> <i>IQ</i> of my team",
          "Oh, wait, just kidding ヽ(´▽`)/  ............."
        ],
      });
    }
  };

})(window);
