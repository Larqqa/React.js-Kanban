<?php
//Allow for cross origin access?
header('Access-Control-Allow-Origin: *');

if (isset($_POST['id']))
{
  $dir = $_POST['dir'];
  $stage = $_POST['stage'];

switch ($stage) {
  case 'toDo':
    $stage = 'inProgress';
    break;
  case 'inProgress':
    if ($dir === 'backward')
    {
        $stage = 'toDo';
    } else {
      $stage = 'finished';
    }
    break;
  case 'finished':
    $stage = 'inProgress';
    break;

  default:
    break;
}

  include('connect.php');
  //Get projects from database
  try {
    $sql = "UPDATE `projects` SET `stage` = '".$stage."' WHERE `id` = ".$_POST['id'];
    $conn->exec($sql);
    //echo $sql;
    echo $stage;

    //echo 'Project moved!';
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }
  //Disable connection
  $conn = null;
}

?>
