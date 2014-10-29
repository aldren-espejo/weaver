;(function( $, window, document, undefined ) {

  var DropdownList = function(container, ootions){
    this.$container = $(container);
    this.$list = $(container).find('.select');
    this.$options = this.$list.find('li:not(:first-child)');
    this.$current = this.$list.find('.current');
    this.init();
  };

  DropdownList.prototype = {

    init: function(){
      var self = this;

      self.setContainerHeight();

      self.$list.find('.current').click(function(e){
        self.hideOthers();
        self.expand();
        e.stopPropagation();
      });

      self.$options.not('.current').each(function(i, el){
        $(this).click(function(e){
          self.select($(this));
          self.expand();
          e.stopPropagation();
        });
      });

    },

    select: function(selectedOption){
      var self = this;
      var text = selectedOption.text();
      var value = selectedOption.data('value');

      self.$current.text(text);
      self.$current.attr('data-value', value);
    },

    expand: function(){
      var self = this;
      self.$list.toggleClass('in-active-state');

      if((self.$list.outerHeight() + self.$list.offset().top) > $(window).height()){
        self.$list.toggleClass('position-above');
      }
    },

    hideOthers: function(){
      var self = this;

      // hide other dropdown list execept this one
      $('.select.in-active-state').not(self.$list).each(function(){
        $(this).removeClass('in-active-state position-above');
      });
    },

    setContainerHeight: function(){
      var self = this;
      var height = self.$list.outerHeight();
      this.$container.css({height:height});
    },

    value: function(value){
      var self = this;

      if(value) self.select(self.$list.find('[data-value="'+ value +'"]').not('.current'));
      return self.$current.attr('data-value');
    }

  };

  $.fn.dropdownList = function(options){
    var self = this;

    if(options === undefined || typeof options === 'object'){

      // create the instance if no parameters or an object parameter is passed
      return self.each(function(){
        var instance = new DropdownList($(this), options);
        $.data(this, 'dropdownList', instance);
      })

    } else if (typeof options === 'string' && arguments[0] !== 'init'){

      // call a plugin function if string parameter is passed
      switch (arguments[0]) {

        case "value":
          return self.data('dropdownList').value(arguments[1]);

        case "name":
          return self.data('name');
      }
    }

  };

  // Example Usage:
  // $('[role="dropdown-list"]').dropdownList();

}( jQuery, window, document ));
