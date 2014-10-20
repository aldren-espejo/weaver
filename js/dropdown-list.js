;(function( $, window, document, undefined ) {

  var DropdownList = function( container, value ){
    this.$container = $(container);
    this.$list = $(container).find('.select');
    this.$options = $(container).find('[data-value]');
    this.$current = this.$list.find('li:first-child');
    this.init();

    if(value){
      this.select(this.$list.find('li[data-value="'+ value +'"]'));
    }
  };

  DropdownList.prototype = {

    init: function(){
      var self = this;

      self.setContainerHeight();
      self.$options.each(function(i, el){

        $(this).click(function(e){
          self.select($(this));
          self.expand();
          e.stopPropagation();
        });

      });

      // unexpand if user clicks outside the dropdown list
      $(document).click(function(){
        self.$list.removeClass('expanded');
      });

    },

    select: function(selectedOption){
      var self = this;
      var text = selectedOption.text();
      var value = selectedOption.data('value');

      self.$current.attr('data-value', value);
      self.$current.text(text);
      self.$container.attr('data-value',value);
    },

    expand: function(){
      var self = this;
      self.$list.toggleClass('expanded');
    },

    setContainerHeight: function(){
      var self = this;
      var height = self.$list.outerHeight();
      this.$container.css({height:height});
    }
  };

  $.fn.dropdownList = function(method, value){
    var self = this;

    if(method && !value){

      switch (method) {
        case "value":
          return self.find('.current').data('value');

        case "name":
         return self.data('name');
      }

    } else {

      return self.each(function(){
        var dropdownList = new DropdownList($(this), value);
        $.data(this, 'dropdownList', dropdownList);
      });
    }

  };

  // Example Usage:
  // $('[role="dropdown-list"]').dropdownList();

}( jQuery, window, document ));
