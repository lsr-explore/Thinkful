//********************************************************
// This is a simple shopping list app
//
//********************************************************



    // Delete the closest list item up the DOM
    function deleteItem(){
        "use strict";

        var content = this.parentNode.children[2].textContent.trim();
        if (content !== undefined && content.length > 0) {
            $(this).closest('li').remove();
        }
    }

    // User mistakenly marked an item as purchased.  Let them undo it
    // Move an item from the purchasedList to the shoppingList
    function restoreItem(){
        "use strict";

        var content = this.parentNode.children[2].textContent.trim();
        if (content !== undefined && content.length > 0) {

            $(this).closest('li').hide().prependTo('#shoppingList').slideDown('slow');
            this.parentNode.className = "todo";
            this.checked = false;

        }
    }

    // Mark an item as purchased.
    // Move an item from the shoppingList to the purchasedList
    function markComplete() {
        "use strict";

        var content = this.parentNode.children[2].textContent.trim();
        if (content !== undefined && content.length > 0) {

            $(this).closest('li').hide().prependTo('#purchasedList').slideDown('slow');
            this.parentNode.className = "done";
            this.checked = true;

        }

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

        /*
        var count = 0;
        $("#shoppingList li").each(function(li) {
            count++;
            if(item === $(this).children[2].textContent)
            {
                $('#duplicateDialog span').innterText = item + "is already on the list";
                $('#duplicateDialog').foundation('reveal', 'open');
            }else
            {
                $('<li class="item"><div class="todo"><div class="delete">&nbsp;</div><input type="checkbox" ><span>' + item + '</span> </div></li>').hide().prependTo("#shoppingList").slideDown('slow');
                setFocus();
            }

        });

        //Nothing in the list - just add the item
        if (count === 0) {
            $('<li class="item"><div class="todo"><div class="delete">&nbsp;</div><input type="checkbox" ><span>' + item + '</span> </div></li>').hide().prependTo("#shoppingList").slideDown('slow');
            setFocus();

        }
        */
        $('<li class="item"><div class="todo"><div class="delete">&nbsp;</div><input type="checkbox" ><span>' + item + '</span> </div></li>').hide().prependTo("#shoppingList").slideDown('slow');
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
        $('<li class="item"><div class="done"><div class="delete">&nbsp;</div><input type="checkbox" checked><span>' + item + '</span></div></li>').hide().prependTo("#purchasedList").slideDown('slow');;
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
        $(document).foundation();

        // Initialize jquery sortable/draggable items
        var shoppingList = $("#shoppingList");
        shoppingList.sortable({
            tolerance: 'touch'
        });

        // Mark item as complete
        shoppingList.on('change', 'input[type=checkbox]',markComplete );

        // Delete item from the shopping list
        shoppingList.on('click', 'div.delete', deleteItem);

        var purchasedList = $("#purchasedList");
        purchasedList.sortable({
            tolerance: 'touch'
        });

        // Restore an item incorrectly marked as purchased
        purchasedList.on('change', 'input[type=checkbox]',restoreItem );

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

        $("#addItemButton").click(function(event) {
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
