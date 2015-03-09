$(function() {
  showTodoList();

  $("#regForm").submit(function() {
    if(!window.confirm("登録してもよろしいですか？")) {
      return false;
    }
    var now = new Date();
    var key = "todo" + now.getTime();
    var saveItems = [false, now, $("#title").val(), $("#detail").val()];
    var value = JSON.stringify(saveItems);
    localStorage.setItem(key, value);
  });
});

function showTodoList() {
  var todoList = $("#todoList");
  var colums = ["完了", "登録日", "タイトル", "詳細"];
  todoList.children().remove();
  todoList
    .append("<caption>TODOリスト</caption>")
    .append("<tr><th>" + colums.join("</th><th>") + "</th></tr>");
  for(var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(key.match(/^todo/)) {
      var value  = localStorage.getItem(key);
      var items  = JSON.parse(value);
      items[0] = '<input type="checkbox" key=' + key + ((items[0] === true) ? ' checked' : ' ') + '>';
      var regDay = new Date(items[1]);
      items[1] = [regDay.getFullYear(), regDay.getMonth() + 1, regDay.getDate()].join("/");
      todoList.append("<tr><td>" + items.join("</td><td>") + "</td></tr>");
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
  items[0]  = !items[0];
  localStorage.setItem(key, JSON.stringify(items));
}
