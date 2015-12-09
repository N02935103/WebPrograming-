<?php
    $today=getdate();
?>

<div class="modal fade" id="myDialog">
  <div class="modal-dialog">
    <div class="modal-content">
    </div>
  </div>
</div>


<div class="row">
	<div class="col-md-7">
		<div class="cardbg">
            <table class="table table-bordered">
            	<thead>
            		<tr>
            			<th>Exercise</th>
            			<th>Date</th>
            			<th>Calories</th>
            			<th>Minutes</th>
            		</tr>
            	</thead>
            	<?php foreach($exercises as $exercise): ?>
            		<tr>
            			<td><?=$exercise['exercisename']?></td>
            			<td><?=$exercise['date']?></td>
             			<td><?=$exercise['calories']?></td>
             			<td><?=$exercise['minutes']?></td>
             			<td> 
             				<a href="?action=edit&id=<?=$exercise['id']?>" title="Edit" class="btn btn-primary btn-sm ajax"><i class="glyphicon glyphicon-edit"></i></a>
              				<A href="?action=view&id=<?=$exercise['id']?>" title="View" class="btn btn-info btn-sm ajax"><i class="glyphicon glyphicon-eye-open"></i></a>
              				<a href="?action=delete&id=<?=$exercise['id']?>" title="Delete" class="btn btn-danger btn-sm ajax"><i class="glyphicon glyphicon-minus"></i></a>
             			</td>
            		</tr>
            	<?php endforeach; ?>
            </table>
	    </div>
    </div>
    <div class="col-md-5">
    	<div class="cardbg">
    		<h3 class="text-center">Add Exercise</h3>
    		<form class="form-horizontal" method="post" action="?action=save">
                <div class="form-group">
            		<label class="control-label col-xs-3">Exercise:</label>
            		<div class="col-xs-7"> 
            			<select class="form-control" name="exercisename">
            		    	<option <?php if($exercises['exercisename'] == 'Running') echo"selected"; ?>>Running</option>
            		      	<option <?php if($exercises['exercisename'] == 'Swimming') echo"selected"; ?>>Swimming</option>
            		      	<option <?php if($exercises['exercisename'] == 'Climbing') echo"selected"; ?>>Climbing</option>
            		    	<option <?php if($exercises['exercisename'] == 'Weight Lifting') echo"selected"; ?>>Weight Lifting</option>
            		  	</select>
            		 </div>
            	</div>
            	<div class="form-group">
            		<label class="control-label col-xs-3">Calories:</label>
            		<div class='col-xs-7'>
            			<input type="number" name="calories" class="form-control" value=0 />
            		</div>
            	</div>
                <div class="form-group">
	               	<label class="control-label col-xs-3">Minutes:</label>
	               	<div class='col-xs-7'>
        			    <input type="number" name="minutes" class="form-control" value=0 />
            		</div>
            	</div>
            	<div class="form-group">
            			<label class="control-label col-xs-3">Date:</label>
            			<div class="col-xs-7">

            				<input type="text" name="date" id="txtDate" class="form-control" value="<?php
            				echo $today['year'];
            				echo "-";
            				echo $today['mon'];
            				echo "-";
            				echo $today['mday'];
            				?>" />
            			</div>
            		</div>
            	<div class="form-group">
            		<div class='col-xs-offset-3 col-xs-9'>
            			<button type='submit' value="Save" class="btn btn-primary"><small><span class="glyphicon glyphicon-plus"></small> Add</button>
            			<input type="hidden" name="id" value="<?=$exercises['id']?>" />
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
