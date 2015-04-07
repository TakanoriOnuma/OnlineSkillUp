$(function() {
  getList();
});

$('#fm').submit(function() {
  postList();
  return false;
});

function getList() {
  var $list = $('.list');
  $list.fadeOut(function() {
    $list.children().remove();
    $.get('todo', function(todoLists) {
      if(todoLists.length === 0) {
        var $info = $('.info');
        $info.children().remove();
        $info.append(makeInformation('err', 'Todoリストがありません。'));
        $info.fadeIn();
      }
      else {
        $.each(todoLists, function(index, todoList) {
          var todoNum   = 0;
          var todoNumOk = 0;
          var limitDate;
          $.get('/todoDetail', {listName: todoList.listName}, function(todos) {
            $.each(todos, function(index, todo) {
              todoNum += 1;
              if(todo.isCheck === true) {
                todoNumOk += 1;
              }
            });
            var httpTag = '<p><a href="detail?listName=' + todoList.listName + '">' + todoList.listName + '</a><br>';
            if(todoNum === 0) {
              httpTag += 'ToDoはありません。';
            }
            else {
              httpTag += todoNum + '個中' + todoNumOk + '個がチェック済み</p>';
            }

            $list.prepend(httpTag);
          });

        });
        $list.fadeIn();
      }
    });
  });
}

function postList() {
  var listName = $('#text').val();
  $('#text').val('');
  $.post('todo', {listName: listName}, function(res) {
    var $info = $('.info');
    $info.children().remove();
    if (res === true) {
      $info.append(makeInformation('notice', '新しいTodoリストが作成されました。'));
    }
    else {
      $info.append(makeInformation('err', 'Todoリストの登録に失敗しました。'));
    }
    getList();
  });
}