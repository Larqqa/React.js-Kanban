<?php
//Allow for cross origin access?
header('Access-Control-Allow-Origin: *');

include('connect.php');

if (issett($_POST['id']))
{
  //Get projects from database
  try {
    $stmt = $conn->prepare("DELETE FROM `projects` WHERE `id` = $_POST['id']");
    $stmt->exec();

    echo 'Project deleted!';
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }
  //Disable connection
  $conn = null;
}

?>
