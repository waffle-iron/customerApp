<?php
  /*
  * Ananymous functions, are functions without name.
  * Arrow functions (->) is used to decrease code of Ananymous functions.
  ## REORDER IDs in phpmyAdmin
  *  SET @count = 0;
  *  UPDATE `crud` SET `crud`.`id` = @count:= @count + 1;
  *  ALTER TABLE `crud` AUTO_INCREMENT = 1;
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
  // Isset check if we have a P on the link.
  $page = isset($_GET['p'])?$_GET['p']:'';

  echo 'Server is connected';

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
    if($stmt->execute()){
      echo "Success Data";
    } else {
      echo "Data failed to store";
    }

  }else if($page == 'edite'){

    // // Store data into database
    // $name = $_POST['inputName'];
    // $plateNumber = $_POST['inputPlateNumber'];
    // $totalPrice = $_POST['inputPrice'];
    //
    // $stmt = $db->prepare("UPDATE table_name SET fullname = ?, platenumber = ?, totalprice = ? WHERE ID = 1");
    // $stmt->bindParam(1, $name);
    // $stmt->bindParam(2, $plateNumber);
    // $stmt->bindParam(3, $totalPrice);

  } else if($page == 'delete'){

  } else {
    // Retrieve data and order by latest data on top
    $stmt = $db->prepare("SELECT * FROM crud ORDER BY id desc");

    // Execute query
    $stmt->execute();

    // Fetch data continuesly
    while($row = $stmt->fetch()){
      // Inject HTML
      ?>
      <tr>
        <td><?php echo $row['id']?></td>
        <td><?php echo $row['fullname']?></td>
        <td><?php echo $row['platenumber']?></td>
        <td><?php echo $row['totalprice']?></td>
        <td>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editeModal-<?php echo $row['id']?>">Edite</button>
          <!-- User Input field -->
          <div class="modal fade" id="editeModal-<?php echo $row['id']?>" tabindex="-1" role="dialog" aria-labelledby="editeLabel-<?php echo $row['id']?>">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="editeLabel-<?php echo $row['id']?>">Edite data</h4>
                </div>

                <!--Input form-->
                <form>
                  <div class="modal-body">

                    <input type="hidden" id="id-<?php echo $row['id']?>">
                    <div class="form-group">
                      <label for="inputName">Full Name</label>
                      <input type="text" class="form-control" id="inputName-<?php echo $row['id']?>" value="<?php echo $row['fullname']?>">
                    </div>

                    <div class="form-group">
                      <label for="inputPlateNumber">Plate Number</label>
                      <input type="text" class="form-control" id="inputPlateNumber-<?php echo $row['id']?>" value="<?php echo $row['platenumber']?>">
                    </div>

                    <div class="form-group">
                      <label for="totalPrice">Total Price</label>
                      <input type="number" class="form-control" id="totalPrice-<?php echo $row['id']?>" value="<?php echo $row['totalprice']?>">
                    </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary inputUpdate" id="update-<?php echo $row['id']?>">Update</button>
                  </div>
               </form>

              </div>
            </div>
          </div>
        <p></p>
      </div>
          <button type="button" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      <?php
    }
  }



?>
