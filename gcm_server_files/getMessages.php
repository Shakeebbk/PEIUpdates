<?php
require_once('loader.php');

$regId  = $_COOKIE["regId"];
$url = $_COOKIE["url"];
if( isregIdExisted($regId) == true ){
   Header("Location: $url");
} else { 
   Header("Location: http://192.168.43.188:8080/AccessDenied.html");
}
?>