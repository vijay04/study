$(function(){
    $("#slug").autocomplete({
	source: base_url + "tags.php",
	select: function( event, ui ) {
	    create_html(ui.item.label);
	    //remove text as user has selected the option
	    this.value = '';
            return false;
	}
    });

    $("#change-slug").on("click", ".delete-tag", function() {
	var remove_tag = $(this).parent('.tag-item');
	remove_selected_item(remove_tag);
    });


    $("#change-slug").on("keydown", "input", function(event) {
	value = $(this).val();
	// If a comma was entered and there is none or more then one comma,
	// then enter the new term.
	if (event.which == 188 && (value.split('"').length - 1) != 1) {
            value = value.substr(0, value.length);
	    if (value) {
		create_html(value);
	    }
	    //remove text as user has selected the option
	    this.value = '';
            return false;
	}


	var last_element = $("#change-slug").children('.tag-item').last();
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


    function split( val ) {
	return val.split( /,\s*/ );
    }

    /** 
     * create markup for term
     **/
    function create_html(term) {
	var item_html = '<div class="tag-item"><span class="tag-name">'+term+'</span><span class="delete-tag" title="remove this tag"></span></div>';
	$(item_html).insertBefore('.autocomplete-container input');

	var prev_selections = $('#slug-id').val();
	if (prev_selections) {
	    var prev_selections = split(prev_selections);
	    prev_selections.push(term);
	    $('#slug-id').val(prev_selections.join(','));
	}
	else {
	    $('#slug-id').val(term);
	}
	//remove text as user has selected the option
	this.value = '';
        return false;
    }

    /**
      * remove selected item
     **/
    function remove_selected_item(remove_tag_object) {
	tag = remove_tag_object.children('.tag-name').text();
	remove_tag_object.remove();
	remove_prev_selections = $('#slug-id').val();
	if (remove_prev_selections) {
	    var remove_prev_selections = split(remove_prev_selections);
	    //remove value from hidden field
	    remove_prev_selections =  $.grep(remove_prev_selections, function(value) {
		return value != tag;
	    });
	    $('#slug-id').val(remove_prev_selections.join(','));
	}
    }
});
