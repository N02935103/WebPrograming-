<?php
    include_once '../Model/meal.php';

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;
$method = $_SERVER['REQUEST_METHOD'];
$format = isset($_REQUEST['format']) ? $_REQUEST['format'] : 'web';
$view 	= null;

switch ($action . '_' . $method) {
	case 'create_GET':
		$meals = Meal::Blank();
		$view = "meals/edit.php";
		break;
	case 'save_POST':
			$sub_action = empty($_REQUEST['id']) ? 'created' : 'updated';
			$errors = Meal::Validate($_REQUEST);
			if(!$errors){
				$errors = Meal::Save($_REQUEST);
			}
			
			if(!$errors){
				if($format == 'json'){
					header("Location: ?action=edit&format=json&id=$_REQUEST[id]");
				}else{
					header("Location: ?sub_action=$sub_action&id=$_REQUEST[id]");
				}
				die();
			}else{
				$meals = $_REQUEST;
				$view = "meals/edit.php";		
			}
			break;
	case 'edit_GET':
		$meals = Meal::Get($_REQUEST['id']);
		$view = "meals/edit.php";		
		break;
	case 'delete_GET':
		$meals = Meal::Get($_REQUEST['id']);
		$view = "meals/delete.php";		
		break;
	case 'delete_POST':
		$errors = Meal::Delete($_REQUEST['id']);
		if($errors){
				$meals = Meal::Get($_REQUEST['id']);
				$view = "meals/delete.php";
		}else{
				header("Location: ?sub_action=$sub_action&id=$_REQUEST[id]");
				die();			
		}
		break;
	case 'search_GET':
		$meals = Meal::Search($_REQUEST['q']);
		$view = 'meals/meal.php';		
		break;
	case 'meal_GET':
	case 'view_GET':
		$meals = Meal::Get($_REQUEST['id']);
		$view = "meals/view.php";		
		break;
	default:
		$meals = Meal::Get();
		$view = 'meals/meal.php';		
		break;
}

switch ($format) {
	case 'json':
		echo json_encode($meals);
		break;
	case 'plain':
		include __DIR__ . "/../Views/$view";		
		break;		
	case 'web':
	default:
		include __DIR__ . "/../Views/shared/_Template.php";		
		break;
}

