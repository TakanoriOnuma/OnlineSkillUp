$(function() {
  getList();
});

$('#btn').click(function() {
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
          $list.append('<p>' + todoList.listName + '</p>');
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