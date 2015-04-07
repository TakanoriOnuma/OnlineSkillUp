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
          $list.append('<p>' + todo.text + '</p>');
        });
        $list.fadeIn();
      }
    });
  });
}