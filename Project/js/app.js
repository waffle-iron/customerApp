/*
* Using MVC approach with IIFE
* By Dler Hasan
* Create password that remembers always.
*/

// Front-end (user-input)
var viewController = (function(){

  // Get DOM strings
  var DOMdata = {
    inputUserNameContainer: '#inputName',
    inputPlateNumberContainer: '#inputPlateNumber',
    inputTotalPriceContainer: "#showPrice",
    inputCheckBoxContainer: "#sumCheckboxValues",
    inputButtonContainer: "#inputButton",
    inputUpdateContainer: ".inputUpdate",
    getIDContainer: "#idValue"
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
          // Declare arra
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
          //document.getElementById(DOMdata.inputTotalPriceContainer).textContent = sum;
          $(DOMdata.inputTotalPriceContainer).text(sum);

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
        // ? Means it comes variables
        // url: place we want to open
        // POST: I will send you data via post request
        $.ajax({
          type: "POST",
          url: "service.php?p=add",
          data: "inputName=" + input.name + "&inputPlateNumber="+input.plateNumber+"&inputPrice="+input.totalPrice,
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
      // Explode
      var tagName = this.getAttribute("id");
      var array = tagName.split("-");
      var id = array[1];
      alert(id);

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

  // Show table
  viewCtrl.viewTable();

  // Placeholder for all click events
  var setupEventlistener = function(){
    // Import containers such as id or class names
    var DOMtag = viewCtrl.getDOMdata();

    // Listen to checkbox click events
    $(DOMtag.inputCheckBoxContainer).on("click", viewCtrl.sumCheckbox);

    // Listen to saveData event
    $(DOMtag.inputButtonContainer).on("click", viewCtrl.saveData);

    // Listen to inputUpdade, delegate() is used to load HTML body before JavaScript accesses it.
    //$("body").delegate(DOMtag.inputUpdateContainer, "click", viewCtrl.updateTable);
    $("body").delegate(DOMtag.inputUpdateContainer, "click", viewCtrl.updateTable);
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

// function inputUpdate(id){
//   alert(id);
// }

// Run application
controller.init();
