<?php
  // global variables
  //$servername = 'mysql:host=localhost;dbname=$customerApp';
  //$username = 'root';
  //$password = 'D123456789'; // Don't think I am that stupid..
  //$dpname = 'customerApp';

  // Connect to database
  //  $db = new PDO('mysql:host=localhost;dbname=customerApp', 'root', 'D123456789');

  $db = new pdo( 'mysql:host=localhost;dbname=customerApp','root','D123456789');

  // Check whether a variable is set or not, returns true or false.
  // Question mark is called ternary operator, used for: if first operand evaluates true, evaluate as second operand, else evaluate as third operand.
  $page = isset($_GET['p'])?$_GET['p']:'';

  echo 'working..';

  //
  if($page=='add'){

    // Store data into database
    $name = $_POST['inputName'];
    $plateNumber = $_POST['inputPlateNumber'];
    $price = $_POST['inputPrice'];
    $inWash = $_POST['inWash'];
    $outWash = $_POST['outWash'];

    $stmt = $db->prepare("insert into crud values('',?,?,?,?,?)");
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $plateNumber);
    $stmt->bindParam(3, $price);
    $stmt->bindParam(4, $inWash);
    $stmt->bindParam(5, $outWash);
    $stmt->execute();

  }



?>
