;(function( $, window, document, undefined ) {

  var Swapper = function(el, options){
    this.$el = $(el);
    this.options = $.extend({}, $.fn.swapper.defaults, options);
    this.data = this.$el.data('swap').split(',');
    this.breakpoints = {
      small: 'only screen',
      medium: 'only screen and (min-width:40.063em)',
      large: 'only screen and (min-width:64.063em)'
    };

    this.init();
  };

  Swapper.prototype = {

    init: function(){
      var self = this;

      self.swap();
      
      $(window).resize(function(){
        self.swap();
      });
    },

    swap: function(){
      var self = this;
      var breakpoints = Object.keys(self.breakpoints).map(function(key) { return self.breakpoints[key] });

      for(var i = 0; i < self.data.length; i++){
        if(Modernizr.mq(breakpoints[i])){
          if(self.elemType() === 'src') {
            self.$el.attr('src', self.data[i]);
          }
        }
      }

     self.options.afterLoad.call(this);
    },

    elemType: function(){
      var self = this;
      if(/IMG/.test(self.$el[0].nodeName)){
        return 'src';
      }      
    }
  }

  $.fn.swapper = function(options){
    var self = this;

    return self.each(function(){
      var instance = new Swapper(this, options);
      $.data(this, 'swapper', instance);
    });

  }

  $.fn.swapper.defaults = {
    afterLoad: function(){}
  }  

  // Example Usage:
  // $('[data-swap]').swapper();

}( jQuery, window, document ));