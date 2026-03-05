function hello()
{
    console.log("Hello World");
}
// An example of changing the logic exec
function saveTask(){
    console.log("Saving Task");
    // get the values from the form
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    // create a new task object
    const task = new Task(title,desc,color,date,status,budget);
    console.log(task);
    //Send to server
    
    $.ajax({
        type:"POST",//HTTP Verb: Create
        url:API,
        data:JSON.stringify(task),
        contentType:"application/json",
        success: function(created){
            displayTask(created); 
            console.log(created);
        },
        error: function(err){
            console.log(err);
        }
     })  
}

// minichallenge 
// use put method to update one of the existing entrys
// tip: you must use the ID - url: API/# -- 
// https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/#
// modify the entry with the ID=1, using a title that says "Hello my name is - your name"



function displayTask(task){
    let syntax = `
    <div class="task" id="${task.id}" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: ${task.budget}</label>
        
        <div>
        <button class="btn-delete">Delete</button>
        </div>

        </div>
    </div>`;
    
  // Inject the new HTML into the DOM Tree
  $(".list").append(syntax);
  

}

//define the URL of the server
const API="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTasks(){

    $.ajax({
        type:"GET",// HTTP method - READ
        url: API,
        dataType: "json",//Expected formal
        success: function(data){
            console.log("Data received", data);
        },
        error: function(error){
            console.log("Error", error);
        }
    })
}

function deleteTask(){
    console.log("Delete task");
    //1.Context: "this" is the specific button that was clicked
    let btn = $(this);
    //2. Find the parent div 
    let taskElement = btn.parents(".task");
    // btn.closest
    //3. Extraction: get the ID we saved in the HTML
    let id = taskElement.attr("id");
    console.log("Element to delete", id);
    if (!id){
        console.log("No id found");
        return;
    }    
    //4. server communication
    $.ajax(
        {
            type:"DELETE",//HTTP: Verb Delete
            url: API + "/" + id,
            success:function(){
                //remove the element
                taskElement.fadeOut(500,function(){
                    $(this).remove();//remove from the DOM 
                });
            },
            error:function(err)
            {
                console.log(err);
            }
        }
    )

}

function init ()
{
    hello();
    console.log("Hello this is the DOM");
    // hook events
    $("#btnSave").click(saveTask);
    // $(".btn-delete").click();
    $(".list").on("click",".btn-delete", deleteTask);
    // load data from the server
    loadTasks();


}
// force to my logic to run the html and css first - and when they finish the logic 
// will be executed
window.onload = init;


