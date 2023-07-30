<?php
    // Load file json
    $file_json = "./index.json";  
    $fh = fopen($file_json, 'w') or die("can't open file"); 

    // Get file json from javascript
    $data_json = json_decode(file_get_contents('php://input'), true);
    $array_json['data'] = $data_json;
    $string_data = json_encode($array_json['data']);       
   
    // Save file json
    fwrite($fh, $string_data);
    fclose($fh);
    
    // Send response
    header("Content-type: application/json");
    echo json_encode("PHP Success!!!");
    
    //var_dump($data_json);
    //print_r($data_json);
    //die();
?>