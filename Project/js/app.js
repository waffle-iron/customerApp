
// Save Data
function saveData(){
  alert('saveData() function is running');
  // Store value
  var name = $('#inputName').val();
  var plateNumber = $('#inputPlateNumber').val();
  var price = $('#inputPrice').val();
  var insideWash = $('#inWash').val();
  var outsideWash = $('#outWash').val();

  // Ajax function
  $.ajax({
    type: "POST",
    url: "service.php?p=add",
    data: "inputName="+name+"&inputPlateNumber="+plateNumber+"&inputPrice="+price+"&inWash="+insideWash+"&outWash="+outsideWash
//    success: function(msg){
//      alert('Success: Insert data');
//    }
  });
}
