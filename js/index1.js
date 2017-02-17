$(document).ready(function() {

  var current = {
    'operator': "",
    'num1': "",
    'num2': ""
  };

  function doMath() {
    switch (current.operator) {
      case "x":
        return current.num1 * current.num2;
      case "÷":
        return current.num1 / current.num2;
      case "-":
        return current.num1 - current.num2;
      case "+":
        return parseInt(current.num1) + parseInt(current.num2);
    }
  }
  var doNum = function() {
    if($('#screen').text() === 'ERROR'){
      return null;
    }
    var curr = $(this);
    if (curr.hasClass("operator")) {} else if (current.operator === "") {
      var text = $(event.target).text();
      if ($('#screen').text().length < 15) {
        current.num1 += $(event.target).text();
        $('#screen').text(current.num1);
      }
    } else {
      var text = $(event.target).text();
      if ($('#screen').text().length < 15) {
        current.num2 += parseInt($(event.target).text());
        $('#screen').append(text);
      }
    }
    console.log("num1", current.num1);
    console.log("num2", current.num2);
    console.log("operator", current.operator);
  };
  var doOper = function() {
    if($('#screen').text() === 'ERROR'){
      return null;
    }
    switch ($(this).text()) {
      case "x":
        current.operator = "x";
        $('#screen').append(current.operator);
        current.num2 = "";
        break;
      case "÷":
        current.operator = "÷";
              $('#screen').append(current.operator);
              current.num2 = "";
        break;
      case "-":
        current.operator = "-";
              $('#screen').append(current.operator);
              current.num2 = "";
        break;
      case "+":
        current.operator = "+";
              $('#screen').append(current.operator);
              current.num2 = "";
        break;
      case "=":
        $('#screen').text(current.num1);
        break;
      default:
        current.operator = "";
    }
    // if($('#screen').text().match(/[\d]*[\W x][\d]*[\W x]/)){
    if($('#screen').text().match(/(^[\D]\-\.)|([\d]*[\W x][\d]*[\W x])/)){
      $('#screen').text("ERROR");
    }
  };

  $('#clear').on('click', function() {
    current.num1 = "";
    current.num2 = "";
    current.operator = "";
    $('#screen').empty();
  });

  $('#equals').on('click', function() {
    current.num1 = JSON.stringify(doMath());
    // $('span').off();
    // if($('span').hasClass("operator")){
    //   $('span').on('click', doOper);
    // }
  });

  $('span').on('click', doNum);
  $('span[class=operator]').click(doOper);
});
