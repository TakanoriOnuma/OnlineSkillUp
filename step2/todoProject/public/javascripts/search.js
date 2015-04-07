$('#fm').submit(function() {
  postList();
  return false;
});

function postList() {
  var text = $('#text').val();

  $.get('/todoSearch', {word: text}, function(todos) {
    console.log(todos);
  });
}