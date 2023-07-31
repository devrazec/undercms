<?php
/**
* This file is part of UnderCMS, simple, fast, and modern CMS.
*
* @author       Cezar Souza <maxchip@outlook.com>
* @copyright    2023 Created by Devrazec
* @license      https://github.com/devrazec/undercms
* @link         https://undercms.com
*/
    // Name file json
    $index_json = "./index.json"; 
    $user_json = "./user.json"; 
    $admin_json = "./admin.json"; 
    
    // Check the file
    if (file_exists($index_json)) {        

        // Get file json from javascript        
        $data_json = json_decode(file_get_contents('php://input'), true);

        //var_dump($data_json);
        //die();

        if ($data_json) {
            $fh = fopen($index_json, 'w') or die("Error in admin.php file_exists()");
            $array_json['data'] = $data_json;
            $string_data = json_encode($array_json['data']); 

            // Save file json
            fwrite($fh, $string_data);
            fclose($fh);

            // Text message
            header("Content-type: application/json");
            echo json_encode("Success in admin.php fwrite()");
        } else {
            // Text message
            header("Content-type: application/json");
            echo json_encode("Error in admin.php file_get_contents()");
        }           
    } else {
        // Text message
        header("Content-type: application/json");
        echo json_encode("Error in admin.php file_exists()");
    }            
    
    //var_dump($data_json);
    //print_r($data_json);
    //die();
?>