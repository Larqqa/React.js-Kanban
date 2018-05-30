<?php
//Allow for cross origin access?
header('Access-Control-Allow-Origin: *');

if (isset($_POST['data']))
{
  $data = $_POST['data'];
  print_r($data);

  //Include connection to database
  include('connect.php');

  //Insert project into database
  try {
    $sql = "INSERT INTO `projects`(`title`, `category`, `stage`, `content`)
    VALUES ('$data[title]', '$data[category]', '$data[stage]', '$data[content]')";
    $conn->exec($sql);
    $last_id = $conn->lastInsertId();
    echo 'Prject added succesfully, last id was: ' . $last_id;
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }
  //Disable connection
  $conn = null;
}

?>
