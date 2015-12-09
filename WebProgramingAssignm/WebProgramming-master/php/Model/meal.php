<?php
require_once '../inc/global.php';

class Meal {
    public static function Get($id = null){
        $sql = "SELECT * from meals";
        
		if($id){
			$sql .= " WHERE id=$id ";
			$ret = FetchAll($sql);
			return $ret[0];
		}else{
			return FetchAll($sql);			
		}
		
    }
    
    static public function Delete($id)
	{
		$conn = GetConnection();
		$sql = "DELETE FROM meals WHERE id = $id";
		$results = $conn->query($sql);
		$error = $conn->error;
		$conn->close();
		
		return $error ? array ('sql error' => $error) : false;
	}
	
	static public function Blank()
	{
		return array();
	}

	static public function Validate($row)
	{
		$errors = array();
		if(strtotime($row['date']) > time()) $errors['date'] = "You cannot record a meal from the future";
		if(!$row['calories'] || $row['calories']<=0 ||is_nan($row['calories'])) $errors['calories']="You must enter a valid number for Calories";
		return count($errors) > 0 ? $errors : false ;

	}

	static public function Save(&$row)
	{
		$conn = GetConnection();
		
		$row2 = escape_all($row, $conn);
		$row2['date'] = date( 'Y-m-d H:i:s', strtotime( $row2['date'] ) );
		if (!empty($row['id'])) {
			$sql = "Update meals
						Set mealname='$row2[mealname]', date='$row2[date]' ,calories='$row2[calories]',updated=Now()
					WHERE id = $row2[id]
					";
		}else{
			$sql = "INSERT INTO meals
					(mealname, date, created,calories)
					VALUES ('$row2[mealname]', '$row2[date]', Now() , $row[calories]) ";				
		}
		
		$results = $conn->query($sql);
		$error = $conn->error;
		
		if(!$error && empty($row['id'])){
			$row['id'] = $conn->insert_id;
		}
		
		$conn->close();
		
		return $error ? array ('sql error' => $error) : false;
	}


}


