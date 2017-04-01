/*
* Using MVC approach with IIFE
* By Dler Hasan
*/

// Front-end (user-input)
var viewController = (function(){

  // Get DOM strings
  var DOMdata = {
    inputUserNameContainer: '#inputName',
    inputPlateNumberContainer: '#inputPlateNumber',
    inputTotalPriceContainer: "showPrice",
    inputCheckBoxContainer: "sumCheckboxValues",
    inputButtonContainer: "inputButton",
    showIDContainer: "showID",
    updateTableContainer: "updateTable"
  };

  var userInput = function(){
    var name = $(DOMdata.inputUserNameContainer).val();
    var plateNumber = $(DOMdata.inputPlateNumberContainer).val();
    var totalPrice = viewController.sumCheckbox();

    // Return values
    return{
      name: name,
      plateNumber: plateNumber,
      totalPrice: totalPrice
    };
  };


  //return methods
  return{
    sumCheckbox: function(){
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
          document.getElementById(DOMdata.inputTotalPriceContainer).textContent = sum;

          return sum;
        },
    saveData: function(){
      var input;
      // Get user input values
      input = userInput();

      // Check if input form is empty
      if (input.name === '' && input.plateNumber === '' && input.totalPrice === 0) {
        // Prompt user information.
        alert('Please fill out the marked inputfields');
      } else {
        // Ajax post function
        $.ajax({
          type: "POST",
          url: "service.php?p=add",
          data: "inputName="+input.name+"&inputPlateNumber="+input.plateNumber+"&inputPrice="+input.totalPrice,
          success: function(msg){
            alert('Success: Insert data');
          }
        });
      }
    },
    viewTable: function(){
      $.ajax({
        type: "GET",
        url: "service.php",
        success: function(data){
          $('tbody').html(data);
        }
      });
    },
    updateTable: function(){
      alert(DOMdata.showIDContainer);
    },
    getDOMdata: function(){
      return DOMdata;
    }
  };
})();

// Back-end (database)
var modelController = (function(){

  // Return methods
  return {

  };
})();

// Controller (logical calculations)
var controller = (function(viewCtrl, modelCtrl){

  var setupEventlistener = function(){

    // Import containers such as id or class names
    var DOMtag = viewCtrl.getDOMdata();

    // Listen to checkbox click events
    document.getElementById(DOMtag.inputCheckBoxContainer).addEventListener("click", viewCtrl.sumCheckbox);

    // Listen to saveData event
    document.getElementById(DOMtag.inputButtonContainer).addEventListener("click", viewCtrl.saveData);

    // Update table
    document.getElementById(DOMtag.updateTableContainer).addEventListener("click", viewCtrl.updateTable);


    // Show table
    viewCtrl.viewTable();



  };


  // Return methods
  return{
    init: function(){
      console.log('Application is running');

      // Reset input values, Checkboxes, Prices
      document.getElementById('inputName').textContent = '';
      document.getElementById('inputPlateNumber').textContent = '';
      document.getElementById('inWash').checked = false;
      document.getElementById('outWash').checked = false;
      document.getElementById('showPrice').textContent = 0;
      setupEventlistener();
    }
  };

})(viewController, modelController);


// Run application
controller.init();
