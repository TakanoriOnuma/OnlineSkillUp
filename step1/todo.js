$(function() {
  showTodoList();

  $("#regForm").submit(function() {
    if(!window.confirm("登録してもよろしいですか？")) {
      return false;
    }
    var now = new Date();
    var key = "todo" + now.getTime();
    var saveItems = {"isCheck" : false,
      "created" : now,
      "title" : $("#title").val(),
      "detail" : $("#detail").val()};
    var value = JSON.stringify(saveItems);
    localStorage.setItem(key, value);
  });
});

function escapeText(text) {
  return $("<div>").text(text).html();
}

function showTodoList() {
  var todoList = $("#todoList");
  var colums = ["完了", "登録日", "タイトル"];
  todoList.children().remove();
  makeMainContents = function(key, items) {
    var contents = ['<input type="checkbox" key=' + key + ((items["isCheck"] === true) ? ' checked' : ' ') + '>'];
    var regDay = new Date(items["created"]);
    contents.push([regDay.getFullYear(), regDay.getMonth() + 1, regDay.getDate()].join("/"));
    contents.push(escapeText(items["title"]));
    return contents;
  };
  makeSubContents = function(key, items) {
    var contents = [escapeText(items["detail"])];
    return contents;
  };

  for(var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(key.match(/^todo/)) {
      var table = '<table border="1">';
      table += "<tr><th>" + colums.join("</th><th>") + "</th></tr>";
      var value = localStorage.getItem(key);
      var items = JSON.parse(value);
      var mainContents = makeMainContents(key, items);
      var subContents  = makeSubContents(key, items);
      table += "<tr><td>" + mainContents.join("</td><td>") + "</td></tr>";
      table += '<tr><td colspan="' + colums.length + '"><dl><dt>詳細</dt><dd>' + subContents[0] + '</dd></dl></td></tr>';
      table += '</table>';
      todoList.append(table);
      todoList.append("<br>");
    }
  }

  $("#todoList input").mousedown(function() {
    var message = "";
    if($(this).attr("checked") === undefined) {
      message = "このTODOを完了してもよろしいですか？\n\n";
    }
    else {
      message = "このTODOの完了を取り消してもよろしいですか？\n\n";
    }
    var tdObj = $(this).parent().next();
    for(var i = 1; i < colums.length; i++) {
      message += colums[i] + ":" + tdObj.text() + "\n";
      tdObj = tdObj.next();
    }
    if(window.confirm(message)) {
      toggleCheck($(this));
      showTodoList();
    }
  });
}

function toggleCheck(chObj) {
  var key   = chObj.attr("key");
  var value = localStorage.getItem(key);
  var items = JSON.parse(value);
  items["isCheck"]  = !items["isCheck"];
  localStorage.setItem(key, JSON.stringify(items));
}
