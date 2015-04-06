$(function() {
  getList();
});

function getList() {
  var $list = $('.list');
  $list.fadeOut(function() {
    $list.children().remove();
    $.get('todo', function(todoLists) {
      if(todoLists.length === 0) {
        $list.append('<p class="err">リストがありません</p>');
      }
      else {
        $.each(todoLists, function(index, todo) {
          $list.append(todoLists.text);
        });
      }
      $list.fadeIn();
    });
  });
}