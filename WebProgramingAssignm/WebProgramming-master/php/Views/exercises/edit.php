
<form class="form-horizontal" method="post" action="?action=save" >
     <?php include __DIR__ . '/../shared/_Errors.php'; ?>
    <div class="form-group">
		<label class="control-label col-xs-3">Exercise:</label>
		<div class="col-xs-7"> 
			<select class="form-control" name="mealname">
		    	<option <?php if($exercises['mealname'] == 'Breakfast') echo"selected"; ?>>Breakfast</option>
		      	<option <?php if($exercises['mealname'] == 'Lunch') echo"selected"; ?>>Lunch</option>
		      	<option <?php if($exercises['mealname'] == 'Dinner') echo"selected"; ?>>Dinner</option>
		    	<option <?php if($exercises['mealname'] == 'Snack') echo"selected"; ?>>Snack</option>
		  	</select>
		 </div>
	</div>
	<div class="form-group">
		<label class="control-label col-xs-3">Calories:</label>
		<div class='col-xs-7'>
			<input type="number" name="calories" class="form-control" placeholder"Calories" value="<?=$exercises['calories']?>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="control-label col-xs-3">Minutes:</label>
		<div class='col-xs-7'>
			<input type="number" name="minutes2" class="form-control" placeholder"Minutes" value="<?=$exercises['minutes']?>"/>
		</div>
	</div>
	<div class="form-group">
			<label class="control-label col-xs-3">Date:</label>
			<div class="col-xs-7">
				<input type="text" name="date" id="txtDate" class="form-control" placeholder="Date" value="<?=$exercises['date']?>" />
			</div>
		</div>
	<div class="form-group">
		<div class='col-xs-offset-3 col-xs-9'>
			<input type='submit' value="Save" class="btn btn-primary"> 
			<input type="hidden" name="id" value="<?=$exercises['id']?>" />
			
			<a href='meals.php' class='btn btn-danger'>Cancel</a>
		</div>
	</div>
</form>
<script type="text/javascript">
	(function($){
		$(function(){
			$("#txtDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
		});
	})(jQuery);
</script>
