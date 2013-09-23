angular.module('autocompleteui.config', []).value('autocompleteui.config', {});
angular.module('autocompleteui.directives', ['autocompleteui.config']);
angular.module('autocompleteui', ['autocompleteui.directives', 'autocompleteui.config']);

angular.module('autocompleteui.directives').directive('uiauto',  function () {
  return {
    restrict: 'A', // supports using directive as element, attribute and class
    require: '?ngModel',
    link: function ($scope, element, attrs, controller) {
      // do nothing if no controller i.e. require ng-model in input
      if(!controller) return;


      /** helper function to split **/
    	function split( val ) {
				return val.split(';');
    	}
	    /**
	     * create markup for term
	     **/
	    function create_html(term) {
				var item_html = '<div class="tag-item"><span class="tag-name">'+term+'</span><span class="delete-tag" title="remove this tag"></span></div>';
				$(item_html).insertBefore(element);

        //get the old values  to avoid duplicates and add new values
        var prev_selections =  element.parent('.autocomplete-container').children('.prev-selection').val();

        if (prev_selections) {
          var prev_selections = split(prev_selections);
          prev_selections.push(term);
          var prev_selections = prev_selections.join(';');
        }
        else {
          var prev_selections = term;
        }

        //set the hidden field value for future request
        element.parent('.autocomplete-container').children('.prev-selection').val(prev_selections);


        //set the model values
        controller.$setViewValue(prev_selections);
	    }

			/**
			 * save sortable divs
			 */
			function sortable_html() {
				//get the old values  to avoid duplicates and add new values
				var sortable_selection = [];
				angular.forEach(element.parent('.autocomplete-container').find('.tag-name'), function(value, key){
					sortable_selection.push(value.innerText);
				});
				var sortable_selection_val = sortable_selection.join(';');

				//set the model values
				controller.$setViewValue(sortable_selection_val);
			}

			//add wrapper for css and selected item to put
			element.wrap('<div id="'+ attrs.id+'_sortable_wrapper" class="autocomplete-container" />');
      //add hidden field to store selections
			$('<input type="hidden" class="prev-selection"/>').insertAfter(element);

			element.autocomplete({
				//source: base_url + "doctors/get",
        //to exclude prev selected
        source: function( request, response ) {
          exclude_list = element.parent('.autocomplete-container').children('.prev-selection').val();
					$.getJSON( base_url + attrs.autoDataUrl, {
						term: request.term, exclude_list : exclude_list
					}, response );
        },
				minLength: 0,
				select: function( event, ui ) {
          create_html(ui.item.label);
          //remove text as user has selected the option
          this.value = '';
          return false;
				}

	    });
      
      //add sorting functionality for selected items
			$( '#' + attrs.id + '_sortable_wrapper').sortable({
				items: ".tag-item",
				stop: function( event, ui ) {
					sortable_html();
				}
			});



      /**
       * When comma inserted add new term
       */
			$(".autocomplete-container").on("keydown", "#"+attrs.id , function(event) {
        value = $(this).val();
        // If a comma was entered and there is none or more then one comma,
        // then enter the new term.

				//check if new term enter is allowed or not
				var new_term = 'yes';
				if (attrs.autoDataNew && attrs.autoDataNew == 'no') {
					new_term = 'no';
				}

        if (event.which == 186 && (value.split('"').length - 1) != 1 && new_term == 'yes') {
          value = value.substr(0, value.length);
          if (value) {
            create_html(value);
          }
          //remove text as user has selected the option
          this.value = '';
          return false;
        }
        var last_element = $(".autocomplete-container").children('.tag-item').last();
        // If the Backspace key was hit and the input is empty
        if (event.which == 8 && value == '') {
          // then mark the last item for deletion or deleted it if already marked.
          if (last_element.hasClass('autocomplete-deluxe-item-focus')) {
            remove_selected_item(last_element);
          } else {
            last_element.addClass('autocomplete-deluxe-item-focus');
          }
        } else {
          // Remove the focus class if any other key was hit.
          last_element.removeClass('autocomplete-deluxe-item-focus');
        }
      });

      //remove tag
      $(".autocomplete-container").on("click", ".delete-tag", function() {
        var remove_tag = $(this).parent('.tag-item');
        remove_selected_item(remove_tag);
      });

			/**
       * remove selected item
       **/
      function remove_selected_item(remove_tag_object) {
        tag = remove_tag_object.children('.tag-name').text();
        remove_tag_object.remove();

         remove_prev_selections = element.parent('.autocomplete-container').children('.prev-selection').val();
         if (remove_prev_selections) {
           var remove_prev_selections = split(remove_prev_selections);
           //remove value from hidden field
           remove_prev_selections =  $.grep(remove_prev_selections, function(value) {
           return value != tag;
         });
           element.parent('.autocomplete-container').children('.prev-selection').val(remove_prev_selections.join(','));
           //set the model values
           controller.$setViewValue(remove_prev_selections.join(','));
         }
      }

			controller.$render = function () {
				//if old values are present then build markup for it
				if (controller.$modelValue) {
					$.each(split(controller.$modelValue), function( key, value ) {
						create_html(value);
					});
				}
			};

			if ( controller ) {
				// Force a render to override whatever is in the input text box
				controller.$render();
			}


    }
  };
});