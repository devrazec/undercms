<?php
    // Name file json
    $file_json = "./index.json"; 
    
    // Check the file
    if (file_exists($file_json)) {
        $fh = fopen($file_json, 'w') or die("Errors in PHP file_exists()");

        // Get file json from javascript
        $data_json = json_decode(file_get_contents('php://input'), true);
        $array_json['data'] = $data_json;
        $string_data = json_encode($array_json['data']); 

        // Save file json
        fwrite($fh, $string_data);
        fclose($fh);

        // Text message
        header("Content-type: application/json");
        echo json_encode("Success in PHP fwrite()");
       
    } else {
        // Text message
        header("Content-type: application/json");
        echo json_encode("Errors in PHP file_exists()");
    }
            
    
    //var_dump($data_json);
    //print_r($data_json);
    //die();
?>