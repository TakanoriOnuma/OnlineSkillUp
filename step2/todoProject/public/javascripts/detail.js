$(function() {
  getList();
});

$('#fm').submit(function() {
  postList();
  return false;
});

function getList() {
  var params = getParams();
  var $listName = $('#listName');
  $listName.children().remove();
  $listName.append('<p>' + decodeURI(params['listName']) + '</p>');
  var $list = $('.list');
  $list.fadeOut(function() {
    $list.children().remove();
    $.get('/todoDetail', {listName : decodeURI(params['listName'])}, function(todos) {
      if(todos.length === 0) {
        var $info = $('.info');
        $info.children().remove();
        $info.append(makeInformation('err', 'ToDoが作成されていません。'));
        $info.fadeIn();
      }
      else {
        $.each(todos, function(index, todo) {
          var htmlTag = '<table border="1"><tr><td>' + todo.text + '</td>';
          htmlTag += '<td rowspan="3">' + todo.isCheck + '</td></tr>';
          htmlTag += '<tr><td>期限：' + todo.limitDate + '</td></tr>';
          htmlTag += '<tr><td>作成日：' + todo.createdDate + '</td></tr></table>';
          $list.prepend(htmlTag);
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

  $.post('/todoDetail', {listName: decodeURI(params['listName']), text: text, limit: limitDate}, function(res) {
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