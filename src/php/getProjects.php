<?php
//Allow for cross origin access?
header('Access-Control-Allow-Origin: *');

include('connect.php');

//Get projects from database
try {
  $stmt = $conn->prepare("SELECT * FROM `projects` WHERE `stage` = 'todo'");
  $stmt->execute();
  // set the resulting array to associative
  $toDo = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $toDo = $toDo;

  $stmt = $conn->prepare("SELECT * FROM `projects` WHERE `stage` = 'inprogress'");
  $stmt->execute();
  // set the resulting array to associative
  $inProg = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $stmt = $conn->prepare("SELECT * FROM `projects` WHERE `stage` = 'finished'");
  $stmt->execute();
  // set the resulting array to associative
  $finished = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}
//Disable connection
$conn = null;

$results = (object) [
  'toDo' => $toDo,
  'inProgress' => $inProg,
  'finished' => $finished,
];

echo json_encode($results);

?>
