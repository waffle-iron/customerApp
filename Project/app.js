

var viewController = (function(){})();

var modelController = (function(){

  return {
    runCode: function(){
        alert('Called from IIFE modelController');
    }
  };


})();

var controller = (function(viewCtrl, modelCtrl){

  // Run test code from IIFE(Immediately Invoked Function Expression) modelController
  modelCtrl.runCode();

})(viewController, modelController);
