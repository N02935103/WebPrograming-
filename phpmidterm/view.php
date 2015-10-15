<?php
session_start();
	$food = $_SESSION['food'];
	if(isset($_GET['id'])){
		$meal = $food[$_GET['id']];
	}else{
		$meal = array();
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	    <title>View Meal</title>

	    <!-- Bootstrap -->
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	</head>
	<body>
	    <div class="container">
            <h1>View Meal <small><?=$meal['Name']?></small></h1>
	    	<div class="row">
	        	<div class="col-md-8 col-xs-10">
	            	<table class="table table-condensed table-striped table-bordered table-hover">
              			<thead>
                			<tr>
                  				<th>Name</th>
                  				<th>Time</th>
                  				<th>Calories</th>
                			</tr>
              			</thead>
              			<tbody>
                			<tr>
                  				<td><?=$meal['Name']?></td>
                  				<td><?=date("M d Y  h:i:sa", $meal['Time'])?></td>
                  				<td><?=$meal['Calories']?></td>
                			</tr>
              			</tbody>
            		</table>
            		<br />
            		<a href="./" class="btn btn-danger">Go Back</a>
        		</div>
      		</div>
      		<div>
      			
      		</div>
    	</div>

    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  	</body>
</html>