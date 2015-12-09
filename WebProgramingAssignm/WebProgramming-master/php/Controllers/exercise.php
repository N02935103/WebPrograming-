<?php
    include_once '../Model/exercise.php';

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;
$method = $_SERVER['REQUEST_METHOD'];
$format = isset($_REQUEST['format']) ? $_REQUEST['format'] : 'web';
$view 	= null;

switch ($action . '_' . $method) {
	case 'create_GET':
		$exercises = Exercise::Blank();
		$view = "exercises/edit.php";
		break;
	case 'save_POST':
			$sub_action = empty($_REQUEST['id']) ? 'created' : 'updated';
			$errors = Exercise::Validate($_REQUEST);
			if(!$errors){
				$errors = Exercise::Save($_REQUEST);
			}
			
			if(!$errors){
				if($format == 'json'){
					header("Location: ?action=edit&format=json&id=$_REQUEST[id]");
				}else{
					header("Location: ?sub_action=$sub_action&id=$_REQUEST[id]");
				}
				die();
			}else{
				$exercises = $_REQUEST;
				$view = "exercises/edit.php";		
			}
			break;
	case 'edit_GET':
		$exercises = Exercise::Get($_REQUEST['id']);
		$view = "exercises/edit.php";		
		break;
	case 'delete_GET':
		$exercises = Exercise::Get($_REQUEST['id']);
		$view = "exercises/delete.php";		
		break;
	case 'delete_POST':
		$errors = Exercise::Delete($_REQUEST['id']);
		if($errors){
				$exercises = Exercise::Get($_REQUEST['id']);
				$view = "exercises/delete.php";
		}else{
				header("Location: ?sub_action=$sub_action&id=$_REQUEST[id]");
				die();			
		}
		break;
	case 'search_GET':
		$exercises = Exercise::Search($_REQUEST['q']);
		$view = 'exercises/meal.php';		
		break;
	case 'meal_GET':
	case 'view_GET':
		$exercises = Exercise::Get($_REQUEST['id']);
		$view = "exercises/view.php";		
		break;
	default:
		$exercises = Exercise::Get();
		$view = 'exercises/exercise.php';		
		break;
}

switch ($format) {
	case 'json':
		echo json_encode($exercises);
		break;
	case 'plain':
		include __DIR__ . "/../Views/$view";		
		break;		
	case 'web':
	default:
		include __DIR__ . "/../Views/shared/_Template.php";		
		break;
}

