//********************************************************
// This is a simple shopping list app
//
//********************************************************

$(document).ready(function() {
    "use strict";

    // Delete the closest list item up the DOM
    function deleteItem(){
        $(this).closest('li').remove();
    }

    // User mistakenly marked an item as purchased.  Let them undo it
    // Move an item from the purchasedList to the shoppingList
    function restoreItem(){
        $(this).closest('li').prependTo('#shoppingList');
        $(this).toggleClass("todo") ;
        $(this).toggleClass("done") ;
    }

    // Mark an item as purchased.
    // Move an item from the shoppingList to the purchasedList
    function markComplete(){
        $(this).closest('li').appendTo('#purchasedList');
        $(this).toggleClass("todo") ;
        $(this).toggleClass("done") ;
    }

    // Add the item - include two divs:
    //      1) Mark as complete
    //      2) Delete
    //  The divs need &nbsp so that it will have a size, and the
    //  background image specified in the css will appear.
    //
    //[item] is filled in with what the user typed in.
    // <li class="item">
    //      <div>
    //          <div class="todo">&nbsp;</div>
    //          <span> [item] </span>
    //          <div class="delete">&nbsp;</div>
    //      </div>
    // </li>
    function addItem(item ) {
        $('<li class="item"><div><div class="todo">&nbsp;</div><span>' + item + '</span><div class="delete">&nbsp;</div></div></li>').prependTo("#shoppingList");
        setFocus();
    }

    // Handle the add event
    function handleAddEvent() {

        event.preventDefault();
        // Get the item that the user typed in
        // It is is..
        //   1) Blank - clear the field and set the focus
        //   2) 'test' - populate with test data
        //   3) anything else - add it to the list
        var newItem = $.trim($('#itemField').val());
        if (newItem === '') {
            setFocus();
        } else   if (newItem === 'test'){
            generateTestData();
        } else {
            addItem(newItem);
        }

    }

    // Test function to add an item to the purchased list
    function addItemToPurchasedList(item ) {
        $('<li class="item"><div><div class="done">&nbsp;</div><span>' + item + '</span><div class="delete">&nbsp;</div></div></li>').appendTo("#purchasedList");
        setFocus();
    }

    // Generate test data
    function generateTestData() {
        addItem("milk");
        addItem("juice");
        addItem("apples");
        addItem("bananas");
        addItem("salmon");
        addItem("chicken");
        addItem("spinach");
        addItem("mushrooms");

        addItemToPurchasedList("canned tomatoes");
        addItemToPurchasedList("coffee");
        addItemToPurchasedList("mint tea");
    }

    // Clear the text input and give it focus
    function setFocus() {
        $('#itemField').val('');
        document.getElementById("itemField").focus();
    }

    //************************************
    // Main routine called at runtime
    //**************************************************
    function main() {
        // Initialize Foundation
        $(document).foundation().foundation('joyride' , 'start');

        // Initialize jquery sortable/draggable items
        var shoppingList = $("#shoppingList");
        shoppingList.sortable({
            tolerance: 'touch'
        });

        var purchasedList = $("#purchasedList");
        purchasedList.sortable({
            tolerance: 'touch'
        });

        var item = $("#item");
        item.draggable({
            tolerance: 'touch'
        });

        // Mark item as complete
        $('#shoppingList').on('click', 'div.todo', markComplete);

        // Delete item from the shopping list
        $('#shoppingList').on('click', 'div.delete', deleteItem);

        // Restore an item incorrectly marked as purchased
        $('#purchasedList').on('click', 'div.done', restoreItem);

        // Delete an item from the purchased list
        $('#purchasedList').on('click', 'div.delete', deleteItem);

        // Add button
        $("#addItemButton").on("click", function() {
            event.preventDefault();
            handleAddEvent();
        });

        // Text input key handlers
        $("#itemField").keydown(function(event) {
            // Return key
            if (event.keyCode === 13) {
                handleAddEvent();
                return false;
            }
        });
    }

    // Main function
    main();

}) ;
