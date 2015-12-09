<?php
$arr=[
                
                {id:123,meal_name:'pizza', calories:'500', date_added: today , marked:false},
                {id:321,meal_name:'burger', calories:'500', date_added: today , marked:false},
                {id:132,meal_name:'salad', calories:'300', date_added: today , marked:false}
            ];
			
			
header('Content-Type: application/json');
echo json_encode($arr);
?>