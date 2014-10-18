;(function( $, window, document, undefined ) {

  var DropdownList = function( container ){
    this.$container = $(container);
    this.$list = $(container).find('.select');
    this.$options = $(container).find('[data-value]');
    this.$current = this.$list.find('li:first-child');
    this.tempOptions = [];
    this.init();
  };

  DropdownList.prototype = {

    init: function(){
      var self = this;

      self.$options.each(function(i, el){

        self.tempOptions.push(this);

        $(this).click(function(e){
          self.select($(this));
          e.stopPropagation();
        });

      });

      // unexpand if user clicks outside the dropdown list
      $(document).click(function(){
        self.$list.removeClass('expanded');
      });

      this.setContainerHeight();
    },

    select: function(selectedOption){
      var self = this;
      var text = selectedOption.text();
      var value = selectedOption.data('value');

      self.expand();
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

  $.fn.dropdownList = function(){
    var self = this;

    return self.each(function(){
      var dropdownList = new DropdownList( $(this) );
      $.data(this, 'dropdownList', dropdownList);

    });
  };

  // Example Usage:
  // $('[role="dropdown-list"]').dropdownList();

}( jQuery, window, document ));
