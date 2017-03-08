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

  echo 'Server is connected';
  //
  if($page=='add'){

    // Store data into database
    $name = $_POST['inputName'];
    $plateNumber = $_POST['inputPlateNumber'];
    $totalPrice = $_POST['inputPrice'];

    $stmt = $db->prepare("insert into crud values('',?,?,?)");
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $plateNumber);
    $stmt->bindParam(3, $totalPrice);

    $stmt->execute();

  }



?>
