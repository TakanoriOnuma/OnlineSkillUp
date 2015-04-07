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
          var checkText = (todo.isCheck === true) ? '完了' : '未完了';
          var htmlTag = '<table class="item"><tr><td>' + todo.text + '</td>';
          htmlTag += '<td rowspan="3"><input type="button" value="' + checkText + '" key="' + todo._id + '"></td></tr>';
          htmlTag += '<tr><td>期限：' + makeDateString(new Date(todo.limitDate)) + '</td></tr>';
          htmlTag += '<tr><td>作成日：' + makeDateString(new Date(todo.createdDate)) + '</td></tr></table>';
          $list.prepend(htmlTag);
        });
        $list.fadeIn();
        $('.list input').click(function() {
          var key = $(this).attr('key');
          $.post('/todoCheck', {key: key}, function(res) {
            var $info = $('.info');
            $info.children().remove();
            $info.append(makeInformation('notice', 'ToDoチェックの変更が完了しました。'));
            getList();
          });
        });
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