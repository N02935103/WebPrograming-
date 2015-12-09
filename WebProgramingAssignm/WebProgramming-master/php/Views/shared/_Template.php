<html lang=en>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Fitness > Home</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="../style/style.css">

	</head>
	<body>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="index.php">Fitness</a>
				</div>
				<div>
					<ul class="nav navbar-nav">
						<li><a href="../index.php">Home</a>
						<li><a href="../exercise/exercise.php">Exercise</a></li>
						<li><a href="../meals/meal.php">Meals</a></li>
						<li><a href="../goals/goal.php">Goal</a></li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">Settings <span class="glyphicon glyphicon-cog"></span></a>
							<ul class="dropdown-menu dropdown-menu-right">
								<li><a href="views/profile.php">Profile <span class="glyphicon glyphicon-user"></span></a></li>
								<li><a href="#">Account Options <span class="glyphicon glyphicon-edit"></span></a></li>
								<li class="divider"></li>
								<li><a href="#">Sign Out <span class="glyphicon glyphicon-log-out"></span></a></li>
							</ul>
						</li>	
					</ul>
				</div>
			</div>
		</nav>			
		<div class="container">
			<?php include __DIR__ . "/../$view"; ?>
		</div>
	</body>
</html>