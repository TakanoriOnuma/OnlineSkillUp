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
        $list.append('<p class="err">Todoリストがありません</p>');
      }
      else {
        $.each(todoLists, function(index, todoList) {
          $list.append('<p>' + todoList.listName + '</p>');
        });
      }
      $list.fadeIn();
    });
  });
}

function postList() {
  var listName = $('#text').val();
  $('#text').val('');

  $.post('todo', {listName: listName}, function(res) {
    console.log(res);
    getList();
  });
}