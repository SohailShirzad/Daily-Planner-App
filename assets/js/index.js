
// get the current date element by Id.
const currentDateElement  = $("#currentDay");
var c = 0; // counter
const clearButton = $("#clear");




// assuming the day starts at 9 and finishes at 17:00
var numberOfBlocks = 18;

// assign current date to the now variable and format it using format method.
const now = dayjs().format('ddd, MMMM DD, YYYY, h:mm A');
// display it as text 
currentDateElement.text(now);

// get elements from html file
var container = $('.container');

//time blocl array to loop through all blocks
var timeBlock = [];

// local storage array
var notes = [];

// call start function 

start();

function start(){


//call createTimeBlocks function 

createTimeBlocks();

// call color function 

setTimeBlocksColor();

addNotes();

getNotes();





//create dynamic divs for time-blocks

function createTimeBlocks(){

    for(var i = 9; i < numberOfBlocks; i++){
        // convenient variable 
        var time = i;
        var row = $("<div>");
        row.addClass("row time-block");
        row.attr("data-hour", i);

        //now create the flex items 

          //create right column for save button

        const rightColumn = $("<div>");
        rightColumn.addClass("col-xs-2 col-sm-2 col-md-2 col-lg-1 d-flex justify-content-center align-items-center align saveBtn");
        const icon = $("<i>");
        icon.addClass("fas fa-save icon");
        rightColumn.append(icon);

        // create left column to show the time. 
        var lefColumn = $("<div>");
        lefColumn.addClass("hour col-xs-2 col-sm-2 col-md-2 col-lg-1")
        var leftP = $("<p>");
        leftP.addClass("mt-3 text-right");
        lefColumn.append(leftP);

        // Create center column 
        const centerColumn = $("<div>");
        centerColumn.addClass("time-block col-xs-8 col-sm-8 col-md-8 col-lg-10 description")
        const textArea = $("<textarea>");
        textArea.addClass("textArea");
        //need to assign id 09 instead of 9 else first columns will return undefined
        

        textArea.attr("id", i);

        centerColumn.append(textArea);


        // add them all inside the parent div with class row
        row.append(lefColumn, centerColumn, rightColumn);
        container.append(row);
        timeBlock.push(row);

        time < 12 ? leftP.text(i + " AM") : leftP.text(i + " PM");
        
    }

    
}

    // now assign color to the events (past, present, future)
function setTimeBlocksColor(){
    timeBlock.forEach(function(block, index){
        var currentId = block.attr("data-hour");
        var desc = block.find(".description");
        
        if(currentId < now ){
            desc.addClass("past");
        }else if(currentId  === now){
            desc.addClass("present");
        }else{
            desc.addClass("future")
        }

    })


    

};

function addNotes(){
    const saveBtn = $('.saveBtn');
    saveBtn.on('click', function(){
        var currentId = $(this).parent().attr("data-hour");
        var description = $('#'+currentId).val();
        localStorage.setItem(currentId, description);


    })

}



function clearNotes(){

    var confirmReset = confirm("Are you sure you want to clear all your notes?")
    var description = $('.textArea');
    isTrue = true;
    if(confirmReset === isTrue){
        for (var i = 9; i < numberOfBlocks; i++) {
          localStorage.removeItem(i);
          description.text("");
          
        }
        location.reload();
        
    }

}

clearButton.on('click', function(){
    clearNotes();
    

})


function getNotes(){
    for(var i = 9; i < numberOfBlocks; i++ ){
        var getNotes = localStorage.getItem(i);
        var description = $('#'+ i);
        description.text(getNotes);
    }
}




}
