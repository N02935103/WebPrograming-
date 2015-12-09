<?php
?>

q


<div class="row">
	<div class="col-md-7">
		<div class="cardbg">
            <table class="table table-bordered">
            	<thead>
            		<tr>
            			<th>Meal</th>
            			<th>Date</th>
            			<th>Callories</th>
            		</tr>
            	</thead>
            	<?php foreach($meals as $meal): ?>
            		<tr>
            			<td><?=$meal['mealname']?></td>
            			<td><?=$meal['date']?></td>
             			<td><?=$meal['calories']?></td>
             			<td> 
             				<a href="?action=edit&id=<?=$meal['id']?>" title="Edit" class="btn btn-primary btn-sm ajax"><i class="glyphicon glyphicon-edit"></i></a>
              				<A href="?action=view&id=<?=$meal['id']?>" title="View" class="btn btn-info btn-sm ajax"><i class="glyphicon glyphicon-eye-open"></i></a>
              				<a href="?action=delete&id=<?=$meal['id']?>" title="Delete" class="btn btn-danger btn-sm ajax"><i class="glyphicon glyphicon-minus"></i></a>
             			</td>
            		</tr>
            	<?php endforeach; ?>
            </table>
	    </div>
    </div>
    <div class="col-md-5">
    	<div class="cardbg">
    		<h3 class="text-center">Add Meal</h3>
    		<form class="form-horizontal" method="post" action="?action=save">
                <div class="form-group">
            		<label class="control-label col-xs-3">Meal:</label>
            		<div class="col-xs-7"> 
            			<select class="form-control" name="mealname">
            		    	<option <?php if($meals['mealname'] == 'Breakfast') echo"selected"; ?>>Breakfast</option>
            		      	<option <?php if($meals['mealname'] == 'Lunch') echo"selected"; ?>>Lunch</option>
            		      	<option <?php if($meals['mealname'] == 'Dinner') echo"selected"; ?>>Dinner</option>
            		    	<option <?php if($meals['mealname'] == 'Snack') echo"selected"; ?>>Snack</option>
            		  	</select>
            		 </div>
            	</div>
            	<div class="form-group">
            		<label class="control-label col-xs-3">Calories:</label>
            		<div class='col-xs-7'>
            			<input type="number" name="calories" class="form-control" placeholder"Calories" value="<?=$meals['calories']?>"/>
            		</div>
            	</div>
            
            	<div class="form-group">
            			<label class="control-label col-xs-3">Date:</label>
            			<div class="col-xs-7">
            				<input type="text" name="date" id="txtDate" class="form-control" placeholder="Date" value="<?=$meals['date']?>" />
            			</div>
            		</div>
            	<div class="form-group">
            		<div class='col-xs-offset-3 col-xs-9'>
            			<button type='submit' value="Save" class="btn btn-primary"><small><span class="glyphicon glyphicon-plus"></small> Add</button>
            			<input type="hidden" name="id" value="<?=$meals['id']?>" />
            		</div>
            	</div>
            </form>
    	</div>
    </div>
</div>

				

<script type="text/javascript">
    $(function(){
        $(".ajax").click(function(){
            $.get(this.href + "&format=plain").then(function(data){
                $("#myDialog .modal-content").html(data);
                $("#myDialog").modal('show');
            });
            return false;
        });
    });

	(function(){
		$(function(){
			$("#txtDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
		});
	})(jQuery);

</script>
