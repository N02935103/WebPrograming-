<?php
    ?>
<form class="form-horizontal" action="?action=delete" method="post" >
  <div class="modal-header">
    <a href="?" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></a>
    <h4 class="modal-title" id="myModalLabel">Delete an Exercise</h4>
  </div>
  	<div class="modal-body">
        <?php include __DIR__ . '/../shared/_Errors.php'; ?>
  		<h5>Are you sure you want to delete <?=$exercises['exercisename']?> on <?=$exercises['date']?>?</h5>
  	</div>
	<div class="modal-footer">
		<input type="hidden" name="id" value="<?=$exercises['id']?>" />
		<input type="submit" name="submit" class="btn btn-danger" value="Delete" />
		<a href="?" class="btn btn-default" data-dismiss="modal" >Cancel </a>
		
	</div>
</form>