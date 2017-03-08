init();

// Save Data
function saveData(){

  // Receive user input and set it to new variable.
  var name = $('#inputName').val();
  var plateNumber = $('#inputPlateNumber').val();
  var totalPrice = sumCheckboxValues();

  // Ajax post function
  $.ajax({
    type: "POST",
    url: "service.php?p=add",
    data: "inputName="+name+"&inputPlateNumber="+plateNumber+"&inputPrice="+totalPrice,
    success: function(msg){
      alert('Success: Insert data');
    }
  });
}

function sumCheckboxValues(){
  // Declare array
  var type = [];

  // Insert value if checbox is selected
  $("input[name=mybox]:checked").each(function(){
    // push value into array
    var value = parseInt(this.value);
    type.push(value);
  });

  // Add total sum of the checkboxes
  var sum = 0;
  for (var i = 0; i < type.length; i++) {
    sum += type[i];
  }

  // Set price value in html
  document.getElementById('showPrice').textContent = sum;

  return sum;
}

// Initialize Application
function init(){
  // Reset input values
  // Reset Checkboxes
  // Reset Prices
  document.getElementById('inputName').textContent = '';
  document.getElementById('inputPlateNumber').textContent = '';
  document.getElementById('inWash').checked = false;
  document.getElementById('outWash').checked = false;
  document.getElementById('showPrice').textContent = 0;
}
