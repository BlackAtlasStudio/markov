let output;
let input;

var mat;

$(document).ready(() => {
  output = document.getElementById("output");
  input = document.getElementById("input");

  $("#status").addClass("status-failed");
});

$("#input").focus(() => {
  $("#status").addClass("status-failed");
  $("#status").removeClass("status-succeed");
})

$("#gen").click(function() {
  //output.innerText = "Generating Chain";
  console.log("Generating Matrix");

  //Create empty matrix
  mat = new Array(27);
  for (var i = 0; i < 27; i++) {
    mat[i] = new Array(27);
    for (var j = 0; j < 27; j++) {
      mat[i][j] = 0;
    }
    //mat[i][26] = 1;
  }

  //Iterate through data counting numbers
  var data = input.value.toLowerCase();
  for (var i = 0; i < data.length-1; i++) {
    var c = getCharCode(i);
    var cn = getCharCode(i+1);

    if (c != 26) {
      mat[c][cn]++;
    }
  }

  //Calculate weighted percentages for each letter
  for (var i = 0; i < 27; i++) {
    //Get totals
    var total = 0;
    for (var j = 0; j < 27; j++) {
      total += mat[i][j];
    }

    //Change count to weights
    for (var j = 0; j < 27; j++) {
      if (mat[i][j] == 0) {
        mat[i][j] = 0;
      } else {
        mat[i][j] /= total;
      }
    }
  }

  console.log(mat);

  $("#status").removeClass("status-failed");
  $("#status").addClass("status-succeed");

  $("#chain").click();

  function getCharCode(index) {
    var code = data.charCodeAt(index) - 97;
    if (code == -65) {
      code = 26;
    }
    return code;
  }
});

$("#chain").click(function() {

  if (mat === undefined) {
    return;
  }

  //Clear area
  output.value = "";

  //Pick random starting letter and find chain
  var names = new Array(5);

  for (var i = 0; i < 5; i++) {
    var name = GenerateChain();
    if (i != 0)
      output.value += "\n";
    output.value += name.charAt(0).toUpperCase() + name.slice(1);
  }

  function GenerateChain() {
    var name = "";

    var curChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    console.log("Starting character", curChar);

    while (name.length < 10) {
      name += curChar;
      curChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    }

    return name;
  }
})
