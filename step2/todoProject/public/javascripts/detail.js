$(function() {
  showList();
});

function showList() {
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
        $info.append(makeInformation('err', 'Todoが作成されていません。'));
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