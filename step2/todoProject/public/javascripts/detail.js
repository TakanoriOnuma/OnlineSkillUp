/*
$(function() {
  getList();
});

$('#fm').submit(function() {
  postList();
  return false;
});

function getList() {
  var $listName = $('#listName');
  var params = getParams();
  $listName.append('<p>' + params['listName'] + '</p>');
  var $list = $('.list');
  $list.fadeOut(function() {
    $list.children().remove();
    $.get('/todoDetail', {listName : params['listName']}, function(todos) {
      if(todos.length === 0) {
        var $info = $('.info');
        $info.children().remove();
        $info.append(makeInformation('err', 'ToDoが作成されていません。'));
        $info.fadeIn();
      }
      else {
        $.each(todos, function(index, todo) {
          $list.append('<p>' + todo.listName + '</p>');
        });
        $list.fadeIn();
      }
    });
  });
}

function postList() {
  var params    = getParams();
  var text      = $('#text').val();
  var limitDate = new Date($('#limit').val());

  $('#text').val('');
  $('#limit').val('');

  $.post('/todoDetail', {listName: params['listName'], text: text, limit: limitDate}, function(res) {
    var $info = $('.info');
    $info.children().remove();
    if (res === true) {
      $info.append(makeInformation('notice', '新しいTodoが作成されました。'));
    }
    else {
      $info.append(makeInformation('err', 'Todoの登録に失敗しました。'));
    }
    getList();
  });
}

*/