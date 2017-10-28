<?php

    $title = 'This is a welcome Notification!';
    $message = 'Eat and Enjoy... More updates soon!!!!';
    $url = 'https://pushcrew.com';
    $subscriberId = $_POST['subscriber'];

    $apiToken = 'a378688fb8f6364fc58cd338745db333';
    //get it as shown here - https://support.pushcrew.com/solution/articles/9000064235-where-do-i-get-my-api-key-

    $curlUrl = 'https://pushcrew.com/api/v1/send/individual/';
    
    //set POST variables
    $fields = array(
      'title' => $title,
      'message' => $message,
      'url' => $url,
      'subscriber_id' => $subscriberId
    );

    $httpHeadersArray = Array();
    $httpHeadersArray[] = 'Authorization: key='.$apiToken;

    //open connection
    $ch = curl_init();

    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $curlUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeadersArray);

    //execute post
    $result = curl_exec($ch);

    $resultArray = json_decode($result, true);

    if($resultArray['status'] == 'success') {
        //success
        //echo $resultArray['request_id']; //ID of Notification Request
    }
    else if($resultArray['status'] == 'failure') {
        //failure
    }
    else {
        //failure
    }

?>