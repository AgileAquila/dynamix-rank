<?php
    $address = $_POST['address'];
    $player_name = $_POST['player_name'];
    $title = $_POST['title'];
    $message = $_POST['message'];

    if($address == "" & $title == "" & $message == ""){
        echo"alert(\"enter\");\r\n";
    }
?>