$(function() {
  showTodoList();
  makeDeadlineForm();

  $("#regForm").submit(function() {
    if(!window.confirm("登録してもよろしいですか？")) {
      return false;
    }
    var now = new Date();
    var key = "todo" + now.getTime();
    var deadline = $("#deadline").children();
    var deadDay = [ deadline.val(),   // year
      deadline.next().val(),          // month
      deadline.next().next().val()    // day
    ];
    deadDay = deadDay.filter(function(element) { return (element !== ""); });
    deadDay = (deadDay.length !== 3) ? "" : new Date(deadDay[0], deadDay[1] - 1, deadDay[2]);
    var saveItems = {"isCheck" : false,
      "created" : now,
      "deadline" : deadDay,
      "title" : $("#title").val(),
      "detail" : $("#detail").val()
    };
    var value = JSON.stringify(saveItems);

    localStorage.setItem(key, value);
  });
});

function makeDeadlineForm() {
  var deadline = $("#deadline");
  var now = new Date();
  deadline.children().remove();
  var selYear = makeSelection(now.getFullYear(), now.getFullYear() + 100, "year");
  deadline.append(selYear + "年");
  var selMonth = makeSelection(1, 12, "month");
  deadline.append(selMonth + "月");
  var selDay = makeSelection(1, 31, "day");
  deadline.append(selDay + "日");
}

function makeSelection(min, max, name) {
  var sel = '<select name="' + name + '">';
  sel += '<option value="">--</option>';
  for(var i = min; i <= max; i++) {
    sel += '<option value="' + i + '">' + i + '</option>';
  }
  sel += '</select>';
  return sel;
}

function escapeText(text) {
  return $("<div>").text(text).html();
}

function showTodoList() {
  var todoList = $("#todoList");
  var colums = ["完了", "タイトル", "締切", "登録日"];
  todoList.children().remove();
  makeMainContents = function(key, items) {
    var contents = ['<input type="checkbox" key=' + key + ((items["isCheck"] === true) ? ' checked' : ' ') + '>'];
    contents.push(escapeText(items["title"]));
    if(items["deadline"] === '') {
      contents.push("指定なし")
    }
    else {
      var day = new Date(items["deadline"]);
      contents.push([day.getFullYear(), day.getMonth() + 1, day.getDate()].join("/"));
    };
    var day = new Date(items["created"]);
    contents.push([day.getFullYear(), day.getMonth() + 1, day.getDate()].join("/"));
    return contents;
  };
  makeSubContents = function(key, items) {
    var contents = [escapeText(items["detail"])];
    return contents;
  };

  for(var i = localStorage.length - 1; i >= 0; i--) {
    var key = localStorage.key(i);
    if(key.match(/^todo/)) {
      var table = '<table border="1">';
      table += "<tr><th>" + colums.join("</th><th>") + "</th></tr>";
      var value = localStorage.getItem(key);
      var items = JSON.parse(value);
      var mainContents = makeMainContents(key, items);
      var subContents  = makeSubContents(key, items);
      table += "<tr><td>" + mainContents.join("</td><td>") + "</td></tr>";
      table += '<tr><td colspan="' + colums.length + '"><dl><dt><img src="plus.png" />詳細</dt><dd>' + subContents[0] + '</dd></dl></td></tr>';
      table += '</table>';
      todoList.append(table);
      todoList.append("<br>");
    }
  }

  $("#todoList dd").hide();
  $("#todoList dt").click(function() {
    if($('img', this).attr("src") === "plus.png") {
      $('img', this).attr("src", "minus.png");
    }
    else {
      $('img', this).attr("src", "plus.png");
    }
    $('+dd', this).slideToggle(500);
  });

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
