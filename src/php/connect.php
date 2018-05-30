<?php
//MySQL variables
$servername = "localhost";
$username = "admin_user";
$password = "test";
$db = 'kanban_project_manager';

//Set MySQL connection
try {
  $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  //echo "Connected successfully ";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

//Check if table exists
function tableExists($conn, $table) {
  try {
    $result = $conn->query("SELECT 1 FROM $table LIMIT 1");
  } catch (PDOException $e) {
    return FALSE;
  }

  return $result !== FALSE;
}

//If table is not created, create table
if (!tableExists($conn, 'projects'))
{
  try {
    // sql to create table
    $sql = "CREATE TABLE projects (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(30) NOT NULL,
      category VARCHAR(30),
      stage VARCHAR(10),
      content VARCHAR(50)
    )";
    // use exec() because no results are returned
    $conn->exec($sql);

    echo 'Table succesfully createad';
  } catch(PDOException $e) {
    echo 'Table already createad';
  }
}

?>
