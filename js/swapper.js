;(function( $, window, document, undefined ) {

  var Swapper = function(el){
    this.$el = $(el);
    this.data = this.$el.data('swap').split(',');
    this.breakpoints = {
      small: 'only screen',
      medium: 'only screen and (min-width:40.063em)',
      large: 'only screen and (min-width:64.063em)'
    }

    Object.prototype.keys = function() {    
      return Object.keys(this);
    }

    Object.prototype.values = function() {    
      return this.keys().map(function(key){ return this[key]; }, this);
    }

    this.init();
  }

  Swapper.prototype = {

    init: function(){
      var self = this;

      self.swap();
      
      $(window).resize(function(){
        self.swap();
      })
    },

    swap: function(){
      var self = this;
      var dataLength = self.data.length;

      for(var i = 0; i < dataLength; i++){
        if(Modernizr.mq(self.breakpoints.values()[i])){
          if(self.elemType() === 'src') {
            self.$el.attr('src', self.data[i]);
          }
        }
      }
    },

    elemType: function(){
      var self = this;
      if(/IMG/.test(self.$el[0].nodeName)){
        return 'src';
      }      
    }
  }

  $.fn.swapper = function(){
    var self = this;

    return self.each(function(){
      var instance = new Swapper(this);
      $.data(this, 'swapper', instance);
    });

  }

  // Example Usage:
  // $('[data-swap]').swapper();

}( jQuery, window, document ));