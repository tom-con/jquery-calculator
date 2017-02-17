$(document).ready(function() {
  var state = {
    'inpNum1': true,
    'inpNum2': false,
    'inpOper': false,
    'clear': true,
    'equals': true,
    'error': false
  };

  var current = {
    'num1': "",
    'num2': "",
    'oper': ""
  };

  var doMath = function() {
    switch (current.oper) {
      case "x":
        if ((Math.round((current.num1 * current.num2) * 100) / 100) === (current.num1 * current.num2)) {
          return current.num1 * current.num2;
        }
        return (Math.round((current.num1 * current.num2) * 100) / 100).toFixed(2);
      case "÷":
        if (current.num1 % current.num2 !== 0) {
          return (current.num1 / current.num2).toFixed(3);
        } else {
          return current.num1 / current.num2;
        }
        break;
      case "-":
        return current.num1 - current.num2;
      case "+":
        return parseFloat(current.num1) + parseFloat(current.num2);
    }
  };

  var equals = function() {
    if (state.equals === true) {
      if (current.num2 === "0" && current.oper === "÷") {
        $('#screen').text("ERROR");
        state.error = true;
      } else {
        current.num1 = doMath();
        $('#screen').text(current.num1);
        state.inpNum1 = false;
        state.inpNum2 = false;
        state.inpOper = true;
        state.clear = true;
      }
    }

    // console.log(state);
    // console.log(current);

  };
  var clears = function() {
    $('#screen').empty();
    current.num1 = '';
    current.num2 = '';
    current.oper = '';
    state.inpNum1 = true;
    state.inpNum2 = false;
    state.inpOper = false;
    state.clear = true;
    state.error = false;
    // console.log(state);
    // console.log(current);
  };

  $('span').not('.operator').click(function() {
    state.equals = true;
    if (state.inpNum1 && !state.error) {
      var text = $(this).text();
      if ($('#screen').text().length < 14) {
        $('#screen').text($('#screen').text() + text);
        current.num1 += text;
      }
      state.inpOper = true;
      current.num2 = "";
    }
    if (state.inpNum2 && !state.error) {
      var text1 = $(this).text();
      if ($('#screen').text().length < 14) {
        $('#screen').text($('#screen').text() + text1);
        current.num2 += text1;
      }
    }
    console.log(state);
    console.log(current);
  });

  $('.operator').not("#clear").not("#equals").click(function() {
    state.equals = false;
    current.num2 = "";
    if (state.inpOper && !state.error) {
      state.inpOper = false;
      state.inpNum1 = false;
      state.inpNum2 = true;
      current.oper = $(this).text();
      $("#screen").text($('#screen').text() + $(this).text());
    }
  });

  $('#clear').click(clears);

  $('#equals').click(equals);

  /* ---------------------------------
  ************************************
      ADDS KEYBOARD FUNCTIONALITY
  ************************************
  ----------------------------------*/

  $(document).keyup(function() {
    if (event.keyCode >= 48 && event.keyCode < 58 && event.shiftKey === false) {
      state.equals = true;
      state.inpOper = true;
      if (state.inpNum1 && !state.error) {
        current.num2 = "";
        $('#screen').text($('#screen').text() + (event.keyCode - 48));
        current.num1 += (event.keyCode - 48);
      } else if (state.inpNum2 && !state.error) {
        state.inpOper = false;
        $('#screen').text($('#screen').text() + (event.keyCode - 48));
        current.num2 += (event.keyCode - 48);
      }
      console.log(state);
      console.log(current);
    } else if (state.inpOper === true && !state.error) {
      state.inpNum1 = false;
      state.inpNum2 = true;
      state.inpOper = false;

      if ((event.keyCode === 56 && event.shiftKey) || event.keyCode === 106) {
        // multiply
        $('#screen').text($('#screen').text() + "x");
        current.oper = ("x");
        current.num2 = "";
      } else if (event.keyCode === 191 || event.keyCode === 111) {
        // divide
        $('#screen').text($('#screen').text() + "÷");
        current.oper = ("÷");
        current.num2 = "";
      } else if ((event.keyCode === 187 && event.shiftKey) ||
        event.keyCode === 107) {
        // add
        $('#screen').text($('#screen').text() + "+");
        current.oper = ("+");
        current.num2 = "";
      } else if (event.keyCode === 189 || event.keyCode === 109) {
        // subtract
        $('#screen').text($('#screen').text() + "-");
        current.oper = ("-");
        current.num2 = '';
      }
    } else if (event.keyCode === 13) {
      equals();
    } else if (event.keyCode === 27) {
      clears();
    }
  });
});
