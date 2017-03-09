/*
* Using MVC approach with IIFE
*/

// Front-end (user-input)
var viewController = (function(){

  // Get DOM strings
  var DOMdata = {
    inputUserNameContainer: '#inputName',
    inputPlateNumberContainer: '#inputPlateNumber',
    inputTotalPriceContainer: "showPrice",
    inputCheckBoxContainer: "sumCheckboxValues",
    inputButtonContainer: "inputButton"
  };

  var userInput = function(){
    var name = $(DOMdata.inputUserNameContainer).val();
    var plateNumber = $(DOMdata.inputPlateNumberContainer).val();
    var totalPrice = sumCheckbox();
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
      alert('saveData()');
      var name = $(DOMdata.inputUserNameContainer).val();
      var plateNumber = $(DOMdata.inputPlateNumberContainer).val();
      var totalPrice = viewController.sumCheckbox();
      // Ajax post function
      $.ajax({
        type: "POST",
        url: "service.php?p=add",
        data: "inputName="+name+"&inputPlateNumber="+plateNumber+"&inputPrice="+totalPrice,
        success: function(msg){
          alert('Success: Insert data');
        }
      });
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
