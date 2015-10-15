<?php
session_start();
	$excercise = $_SESSION['excercise'];
	if($_POST){
		if(isset($_GET['id'])){
			$excercise[$_GET['id']] = $_POST;
		}else{
			$excercise[] = $_POST;
		}
		
		$_SESSION['excercise'] = $excercise;
		header('Location: ./');
	}
	
	if(isset($_GET['id'])){
		$work = $excercise[$_GET['id']];
	}else{
		$work = array();
	}
?>

<!DOCTYPE html>
<html lang="en">
	
	
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>Edit Excercise Log</title>

		<!-- Bootstrap -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" type="text/css" />
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="/WebPrograming-/phpmidterm/main.css">

	</head>
	<body>
		<div class="container">

			<div class="page-header">
				<h1>Excercise Log</h1>
			</div> 
			<form id="entry" class="form-horizontal" action="" method="post" >
				<div class='alert' style="display: none" id="myAlert">
					<button type="button" class="close" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h3></h3>
				</div>
				<div class="form-group">
					<label for="txtName" class="col-sm-2 control-label">Workout</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="txtName" name="Name" placeholder="Type of Workout" value="<?=$work['Name']?>">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="txtCalories">Calories</label>
						<div class="col-sm-10">
							<input type="number" class="form-control" id="txt" name="Calories" placeholder="Calories burned"  value="<?=$work['Calories']?>">
						</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="txtDate">When did you excercise</label>
					<div class="col-sm-10">
						<input type="text" class="form-control date" id="txtDate" name="Time" placeholder="Date" value="<?=$work['Time']?>">
					</div>
				</div>
				
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" class="btn btn-success" id="submit">Record</button>
						<a href="" class="btn btn-danger">Cancel</a>
					</div>
				</div>
			</form>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script type="text/javascript">
			(function($){
				$(function(){
					
					$("#entry").on('submit', function(e){
						
						if(!$("#txtName").val()){
			                $("#submit").prop("disabled", false).html("Try Again");
			                $("#myAlert").removeClass("alert-success").addClass("alert-danger").show()
			                	.find("h3").html("You must enter a name");
			                toastr.error("You must enter a name");
			                return false;
			            }else if(!$("#txt").val()){
			                $("#submit").prop("disabled", false).html("Try Again");
			                $("#myAlert").removeClass("alert-success").addClass("alert-danger").show()
			                	.find("h3").html("You must enter a Calorie amount");
			                toastr.error("You must enter a value");
			                return false;
						}else if(!$("#txtDate").val()){
			                $("#submit").prop("disabled", false).html("Try Again");
			                $("#myAlert").removeClass("alert-success").addClass("alert-danger").show()
			                	.find("h3").html("You must enter a date");
			                toastr.error("You must enter a date");
			                return false;
				        }else{
				        	// Display success
				            $("#myAlert").removeClass("alert-danger").addClass("alert-success").show()
				               	.find("h3").html("Edit complete");
				            toastr.success("Edit complete.")
				        }
					});
					$(".close").on('click', function(e) {
						$(this).closest(".alert").slideUp()
					});
					$("input[type='number']").spinner();
					$("input.date").datepicker();
				});
			})(jQuery);
		</script>
	</body>
</html>