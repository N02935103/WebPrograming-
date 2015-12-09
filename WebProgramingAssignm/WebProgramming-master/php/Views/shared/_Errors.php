  		<?php if(!empty($errors)): ?>
  			<div class="alert alert-danger">
  				<ul>
  				<?php foreach ($errors as $key => $value): ?>
					  <li><?= $value ?></li>
				<?php endforeach; ?>
				</ul>
  			</div>
  		<?php endif; ?>
