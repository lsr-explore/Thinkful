$(document).ready(function() {
    "use strict";



    $("#addItemButton").on("click", function() {
        event.preventDefault();
        handleAddEvent();
    });

    // Key handlers
    $("#itemField").keydown(function(event) {
        // Return key
        if (event.keyCode === 13) {
            handleAddEvent();
            return false;
        }
    });


    /*--- Check off the items ---*/
    $('#shoppingList').on('click', 'div.done', checkoff);

    /*--- Delete the item ---*/
    $('#shoppingList').on('click', 'div.delete', deleteItem);


    /*--- Delete Function ---*/
    function deleteItem(){
        console.log("Deleting...");
        if($(this).parent().hasClass("checked")) {

            $(this).parent().slideUp('slow', function(){
                $(this).remove();
            });
            console.debug($(this).parent());
            return false;
        } else {

            $(this).parent().slideUp('slow', function(){
                $(this).remove();
            });
            console.debug($(this).parent());
            return false;
        }

    }

    /*--- Check off Function ---*/
    function checkoff(){
        console.log("Checking Off...");
        if($(this).hasClass("checked")) {
            $(this).slideUp('slow', function(){
                $(this).slideDown('slow').prependTo('#shoppingList');
            });
            console.debug($(this));

        } else {
            $(this).slideUp('slow', function(){
                $(this).slideDown('slow').appendTo('#shoppingList');
            });
            console.debug($(this));

        }
        $(this).toggleClass("checked");

    }

    /*--- Add the new item to the list and increase the count ---*/
    function addItem(item) {

        $('<li class="item"><div class="done">~</div><span">' + item + '</span><div class="delete">X</div></li>').hide().prependTo('#shoppingList').slideDown('slow');
        console.log("You have now added " + item + "!");
        setFocus();
    }

    function handleAddEvent() {

        event.preventDefault();

        var newItem = $.trim($('#itemField').val());
        if (newItem === '') {
            setFocus();
        } else{
            addItem(newItem);
        }

    }

    /*--- Clear and Set focus to the inputbox ---*/
    function setFocus() {
        $('#itemField').val('');
        document.getElementById("itemField").focus();
    }


    function main() {
        $(document).foundation().foundation('joyride' , 'start');
        var shoppingList = $("#shoppingList");
        shoppingList.sortable();
    }

    main();

}) ;
