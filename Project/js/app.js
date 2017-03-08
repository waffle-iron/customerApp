/*
* Using MVC approach with IIFE
*/

// Front-end (user-input)
var viewController = (function(){

  // // Get DOM strings
  // var DOMdata = {
  //   inputUserNameContainer: 'inputName',
  //   inputPlateNumberContainer: 'inputPlateNumber',
  //
  // };

  var sumCheckbox = document.getElementById('sumCheckboxValues').addEventListener("click", function(){
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
      });

      console.log('This is the total sum of the checkbox' + sumCheckbox);


  //return methods
  return{
    saveData: function(){
      // Receive user input and set it to new variable.
      var name = $('#inputName').val();
      var plateNumber = $('#inputPlateNumber').val();
      console.log('in viewController = ' + sumCheckboxValues());
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
    }
  };

})(viewController, modelController);


// Run application
controller.init();
