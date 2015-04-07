$('#fm').submit(function() {
  postList();
  return false;
});

function postList() {
  var text = $('#text').val();

  var $list = $('.list');
  var $info = $('.info');
  $list.fadeOut(function() {
    $list.children().remove();
    $info.children().remove();
    $.get('/todoSearch', {word: text}, function(todos) {
      if(todos.length === 0) {
        $info.append(makeInformation('err', '対象のToDoは見つかりません。'));
        $info.fadeIn();
      }
      else {
        $info.append(makeInformation('notice', todos.length + '件見つかりました。'));
        $info.fadeIn();
        $.each(todos, function(index, todo) {
          var listName = decodeURI(todo.listName);
          var htmlTag = '<table class="item"><tr><td class="todoTitle">' + todo.text + '</td>';
          htmlTag += '<td>期限：' + makeDateString(new Date(todo.limitDate)) + '</td></tr>';
          htmlTag += '<tr><td>リスト：<a href="/detail?listName=' + listName + '">' + listName + '</a></td>';
          htmlTag += '<td>作成日：' + makeDateString(new Date(todo.createdDate)) + '</td></tr>';
          $list.prepend(htmlTag);
        });
        $list.fadeIn();
      }
    });
  });
}