<?php
  /*
  * Ananymous functions, are functions without name.
  * Arrow functions (->) is used to decrease code of Ananymous functions.
  */
  // global variables
  //$servername = 'mysql:host=localhost;dbname=$customerApp';
  //$username = 'root';
  //$password = 'D123456789'; // Don't think I am that stupid..
  //$dpname = 'customerApp';

  // Connect to database
  //  $db = new PDO('mysql:host=localhost;dbname=customerApp', 'root', 'D123456789');

  $db = new pdo( 'mysql:host=localhost;dbname=customerApp','root','D123456789');

  // Isset: Check whether a variable is set or NULL, returns true or false.
  // Ternary operator, same as if-statement.
  $page = isset($_GET['p'])?$_GET['p']:'';

  echo 'Server is connected';
  //
  if($page == 'add'){

    // Store data into database
    $name = $_POST['inputName'];
    $plateNumber = $_POST['inputPlateNumber'];
    $totalPrice = $_POST['inputPrice'];

    // Query Database
    $stmt = $db->prepare("INSERT INTO crud VALUES('',?,?,?)");
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $plateNumber);
    $stmt->bindParam(3, $totalPrice);

    // Ananymous function with arrow.
    $stmt->execute();

  }else if($page == 'edite'){


  } else if($page == 'delete'){

  } else {
    // Query database
    $stmt = $db->prepare("SELECT * FROM crud");
    // Ananymous function with arrow.
    $stmt->execute();

    // Fetch data continuesly
    while($row = $stmt->fetch()){
      // Access html part
      // Echo outputs the parameters
      ?>
      <tr>
        <td><?php echo $row['id']?></td>
        <td><?php echo $row['fullname']?></td>
        <td><?php echo $row['platenumber']?></td>
        <td><?php echo $row['totalprice']?></td>
        <td>
          <button type="button" class="btn btn-warning">Edite</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      <?php
    }
  }



?>
