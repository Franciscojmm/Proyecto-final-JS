<?php
session_cache_limiter();
session_start();


echo json_encode($_SESSION); 
?>