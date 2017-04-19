/*
* Using MVC approach with IIFE approach
* By Dler Hasan
*/

// Front-end (user-input)
var viewController = (function(){

  // Get DOM names
  var DOMdata = {
    bodyContainer: "body",
    inputUserNameContainer: '#inputName',
    inputPlateNumberContainer: '#inputPlateNumber',
    inputTotalPriceContainer: "#showPrice",
    inputCheckBoxContainer: "#sumCheckboxValues",
    inputButtonContainer: "#inputButton",
    inputUpdateContainer: ".inputUpdate",
    inputTotalPrice: "#totalPrice",
    inputDeleteContainer: ".inputDelete"
  };

  // Get user input
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

  // Get users updated input
  var updateUserInput = function(id){
    var name = $(DOMdata.inputUserNameContainer + "-" + id).val();
    var plateNumber = $(DOMdata.inputPlateNumberContainer + "-" + id).val();
    var totalPrice = $(DOMdata.inputTotalPrice + "-" + id).val();

    // Return values
    return{
      name: name,
      plateNumber: plateNumber,
      totalPrice: totalPrice
    };
  };

  // Return objects
  return{
    sumCheckbox: function(){
          var type = [];

          // Push value into array when checkbox is selected
          $("input[name=mybox]:checked").each(function(){
            var value = parseInt(this.value);
            type.push(value);
          });

          // Sum values in array
          var sum = 0;
          for (var i = 0; i < type.length; i++) {
            sum += type[i];
          }

          // Show price
          $(DOMdata.inputTotalPriceContainer).text(sum);

          // Return total value
          return sum;
        },
    saveData: function(){
      var input;

      // Get user input
      input = userInput();

      // Validate user input
      if (input.name === '' && input.plateNumber === '' && input.totalPrice === 0) {
        alert('Please fill out the marked inputfields');
      } else {
        // AJAX: Add data
        $.ajax({
          type: "POST",
          url: "service.php?p=add",
          data: "inputName=" + input.name + "&inputPlateNumber="+input.plateNumber+"&inputPrice="+input.totalPrice,
          success: function(msg){
            console.log('Success: Insert data');
          }
        });
      }
    },
    updateTable: function(){
      // Ajax: Update data
      $.ajax({
        type: "GET",
        url: "service.php",
        success: function(data){
          $('tbody').html(data);
        }
      });
    },
    updateRowData: function(){

      // Internal variables
      var input, tagName, array, id;

      // Convert id name to array by splitting with dash
      tagName = this.getAttribute("id");
      array = tagName.split("-");
      id = array[1];

      // Get users updated inputs with id as argument
      input = updateUserInput(id);

      // Check if input form is empty
      if (input.name === '' && input.plateNumber === '' && input.totalPrice === 0) {
        // Prompt user information.
        alert('Please fill out the marked inputfields');
      } else {
        // Ajax: Update/Add new values
        $.ajax({
          type: "POST",
          url: "service.php?p=edit",
          data: "inputName=" + input.name + "&inputPlateNumber=" + input.plateNumber + "&inputPrice=" + input.totalPrice + "&id=" + id,
          success: function(msg){
            console.log("Success: Data is updated");
          }
        });
      }
    },
    deleteRow: function(){
      // Internal Values
      var tagName, id;

      // Return tag name
      tagName = this.getAttribute("id");

      // Convert tagName to array
      id = tagName.split("-");

      // Ajax: Delete values
      $.ajax({
        type: "GET",
        url: "service.php?p=delete",
        data: "id=" + id[1],
        success: function(msg){
          console.log("AJAX Delete function works");
        }
      });
      viewController.updateTable();
    },
    getDOMdata: function(){
      return DOMdata;
    }
  };
})();

// Back-end (server)
var modelController = (function(){

  // Return methods
  return {

  };
})();

// Controller (logical calculations)
var controller = (function(viewCtrl, modelCtrl){

  // Show table
  viewCtrl.updateTable();

  // Placeholder for all click events
  var setupEventlistener = function(){
    // Import containers such as id or class names
    var DOMtag = viewCtrl.getDOMdata();

    // Listen to checkbox click events
    $(DOMtag.inputCheckBoxContainer).on("click", viewCtrl.sumCheckbox);

    // Listen to saveData event
    $(DOMtag.inputButtonContainer).on("click", viewCtrl.saveData);

    // Listen to inputUpdade, delegate() is used to load HTML body before JavaScript accesses it.
    $(DOMtag.bodyContainer).delegate(DOMtag.inputUpdateContainer, "click", viewCtrl.updateRowData);

    // Listen to delete events
    $(DOMtag.bodyContainer).delegate(DOMtag.inputDeleteContainer, "click", viewCtrl.deleteRow);
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
