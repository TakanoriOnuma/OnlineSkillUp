function makeInformation(type, msg) {
  return '<p class="' + type + '">' + msg + '</p>';
}

function makeDateString(date) {
  var str = date.getFullYear() + '年';
  str += (date.getMonth() + 1) + '月';
  str += date.getDate() + '日';
  return str;
}

function getParams() {
  var url    = location.href;
  parameters = url.split("?");
  params     = parameters[1].split("&");
  var paramsArray = [];
  for ( i = 0; i < params.length; i++ ) {
    neet = params[i].split("=");
    paramsArray.push(neet[0]);
    paramsArray[neet[0]] = neet[1];
  }
  return paramsArray;
}

function setWatermark($textbox, msg) {
  $textbox
    .addClass('watermark')
    .val(msg)
    .attr('msg', msg)
    .focus(function() {
      $(this).removeClass('watermark');
      if($(this).val() === msg) {
        $(this).val('');
      }
    })
    .blur(function() {
      if($(this).val() === '') {
        $(this).val(msg);
        $(this).addClass('watermark');
      }
    })
    .submit(function() {
      if($(this).val() === msg) {
        $(this).val('');
      }
    });
}