//********************************************************
// This is a simple shopping list app
//
//********************************************************



    // Delete the closest list item up the DOM
    function deleteItem(){
        "use strict";
        $(this).closest('li').remove();
    }

    // User mistakenly marked an item as purchased.  Let them undo it
    // Move an item from the purchasedList to the shoppingList
    function restoreItem(){
        "use strict";
        $(this).closest('li').prependTo('#shoppingList');
        $(this).toggleClass("todo") ;
        $(this).toggleClass("done") ;
    }

    // Mark an item as purchased.
    // Move an item from the shoppingList to the purchasedList
    function markComplete(){
        "use strict";
        $(this).closest('li').prependTo('#purchasedList');
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
        "use strict";
        $('<li class="item"><div><div class="todo">&nbsp;</div><span>' + item + '</span><div class="delete">&nbsp;</div></div></li>').prependTo("#shoppingList");
        setFocus();
    }

    // Handle the add event
    function handleAddEvent(event) {
        "use strict";
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
        "use strict";
        $('<li class="item"><div><div class="done">&nbsp;</div><span>' + item + '</span><div class="delete">&nbsp;</div></div></li>').prependTo("#purchasedList");
        setFocus();
    }

    // Generate test data
    function createEmptyLists(max) {
        "use strict";
        if (max === undefined) {
            max = 15;
        }

        for (var i = 0; i < max; i++) {
            addItem(" ");
            addItemToPurchasedList(" ");
        }
    }

    // Generate test data
    function generateTestData() {
        "use strict";
        clearTheList();
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
        "use strict";
        $('#itemField').val('');
        document.getElementById("itemField").focus();
    }

    function clearTheList() {

        "use strict";
        $("#shoppingList").empty();
        $("#purchasedList").empty();
        createEmptyLists();
    }

    function demo() {
        "use strict";
        $(document).foundation('joyride', 'start');
    }

    function handleOptionsSelection() {
        "use strict";

        switch (this.id) {
            case "clearTheList":
                clearTheList();
                break;
            case "loadTestList" :
                generateTestData();
                break;
            case "demo" :
                demo();
                break;

        }
    }

    //************************************
    // Main routine called at runtime
    //**************************************************
    function main() {

        "use strict";

        // Initialize Foundation
        $(document).foundation().foundation('joyride' , 'start');

        // Initialize jquery sortable/draggable items
        var shoppingList = $("#shoppingList");
        shoppingList.sortable({
            tolerance: 'touch'
        });

        // Mark item as complete
        shoppingList.on('click', 'div.todo', markComplete);

        // Delete item from the shopping list
        shoppingList.on('click', 'div.delete', deleteItem);

        var purchasedList = $("#purchasedList");
        purchasedList.sortable({
            tolerance: 'touch'
        });

        // Restore an item incorrectly marked as purchased
        purchasedList.on('click', 'div.done', restoreItem);

        // Delete an item from the purchased list
        purchasedList.on('click', 'div.delete', deleteItem);

        var item = $("#item");
        item.draggable({
            tolerance: 'touch'
        });

        createEmptyLists(15);

        var lis = document.getElementById("optionsList").getElementsByTagName('li');

        for (var i=0; i<lis.length; i++) {
            lis[i].addEventListener('click', handleOptionsSelection, false);
        }

        // Add button
        $("#addItemButton").on("click", function(event) {
            event.preventDefault();
            handleAddEvent(event);
        });

        // Text input key handlers
        $("#itemField").keydown(function(event) {
            // Return key
            if (event.keyCode === 13) {
                handleAddEvent(event);
                return false;
            }
        });
    }
$(document).ready(function() {
    "use strict";
    // Main function
    main();

}) ;
