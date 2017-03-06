
// Save Data
function saveData(){
  var name = $('#inputName').val();
  var plateNumber = $('#inputPlateNumber').val();
  var price = $('#inputPrice').val();
  var insideWash = $('#inWash').val();
  var outsideWash = $('#outWash').val();

  // ajax send request
  $.ajax({
    type: "POST",
    url: "service.php?p=add",
    data: "inputName=" + name +"&inputPlateNumber=" + plateNumber + "inputPrice=" + price + "&inWash=" + inWash + "&outWash=" + outWash,
    success: function(msg){
      alert('Success: Insert data');
    }
  });
}
