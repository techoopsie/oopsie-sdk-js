
var siteId = "6a4a3a28-23af-4693-a5fb-ab93bca9c803";
var customerId = "fefa1dbf-5f6d-4d38-aac1-1298fa80d4cf";
var todos = [];
var apiUrl = 'http://oopsie-dev.techoopsie.com/api/api/v1';
//apiUrl = 'http://localhost:8080/api/v1';

var oopsieSite = new OopsieSite(apiUrl, siteId, customerId);

var todoResource, query;
oopsieSite.init(err => {
    if (err) {
        Materialize.toast("Failed: Please contact admin.", 4000);
        return;
    }
    // Shouldn't be used in browser, should be kept secret.
    oopsieSite.setApiKey('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMzJlZjY5MS0xODQyLTQ4ZDMtODI0ZS1iNDNhN2ZjYjkxNzEiLCJkZXNjciI6IlRvZG8iLCJzaXRlIjoiNmE0YTNhMjgtMjNhZi00NjkzLWE1ZmItYWI5M2JjYTljODAzIiwiaXNzIjoiZmVmYTFkYmYtNWY2ZC00ZDM4LWFhYzEtMTI5OGZhODBkNGNmIiwidHlwZSI6ImFwaUtleSIsImlhdCI6MTUwMjk4NzU2NSwianRpIjoiYzMyZWY2OTEtMTg0Mi00OGQzLTgyNGUtYjQzYTdmY2I5MTcxIn0.0Hfch2uIO9KHNlBb2tK4zBtTCZXwRGk5zkqMeMcoAFo');
    todoResource = oopsieSite.getApp('TodoAppWithoutAuth').getResource('Todo');
    getTodos();
});

function getTodos() {
    query = todoResource.get().limit(1).execute((err, result) => {

        if (err) {
            if (err.status === 401) {
                showLogin();
            }
            return;
        }
        showNextPage(query);
        showPrevPage(query);
        todos = result.entities;
        fillTodoTable(todos);
    });
}

function fillTodoTable(todos) {
    $('#thetable tr').not(':first').not(':last').remove();
    var html = '';
    for(var i = 0; i < todos.length; i++) {
        html += '<tr><td>' + todos[i].name + 
                '</td><td>' + todos[i].description +
                '</td><td>' + todos[i].done + '</td></tr>';
    }
    $('#thetable tr').first().after(html);
}

function nextPage(event) {

    event.preventDefault();
    query.nextPage((err, result) => {
        showNextPage(query);
        showPrevPage(query);
        todos = result.entities;
        fillTodoTable(todos);
    });
}

function prevPage(event) {

    event.preventDefault();
    query.prevPage((err, result) => {
        showNextPage(query);
        showPrevPage(query);
        todos = result.entities;
        fillTodoTable(todos);
    });
}

function showPrevPage(query) {
    if (!query.hasPrevPage()) {
        $("#prevPage").removeClass("waves-effect waves-light submit").addClass('disabled');
    } else {
        $("#prevPage").addClass("waves-effect waves-light submit").removeClass('disabled');
    }
}

function showNextPage(query) {
    if (!query.hasNextPage()) {
        $("#nextPage").removeClass("waves-effect waves-light submit").addClass('disabled');
    } else {
        $("#nextPage").addClass("waves-effect waves-light submit").removeClass('disabled');
    }
}

// Init materialize select
$(document).ready(function() {
    $('select').material_select();
    $("#createTodoForm").on('submit', createTodo);
    $("#nextPage").on('click', nextPage);
    $("#prevPage").on('click', prevPage);
});


function createTodo(event) {
    event.preventDefault();
    var $inputs = $('#createTodoForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    values.done = false;

    todoResource.create().withParams(values).execute((err, result) => {
        if (err) {
            Materialize.toast("Failed: Please contact admin.", 4000);
            return;
        }
        todos.push(result);
        fillTodoTable(todos);
        Materialize.toast('Created Todo', 4000);
    });
}