var mysql = require("mysql");

module.exports =  {
    blank: function(){ return {} },
    get: function(id, ret){
        var conn = GetConnection();
        var sql = 'SELECT * FROM exercises ';
        if(id){
          sql += " WHERE id = " + id;
        }
        conn.query(sql, function(err,rows){
          ret(err,rows);
          conn.end();
        });        
    },
    delete: function(id, ret){
        var conn = GetConnection();
        conn.query("DELETE FROM exercises WHERE id = " + id, function(err,rows){
          ret(err);
          conn.end();
        });        
    },
    save: function(row, ret){
        var sql;
        var conn = GetConnection();
        //  TODO Sanitize
        if (row.id) {
				  sql = " Update exercises "
							+ " Set exercisename=?, date=? ,calories=? , minutes=?,updated=now()"
						  + " WHERE id = ? ";
			  }else{
				  sql = "INSERT INTO exercises (exercisename, date, created,calories) VALUES (?, ?, Now() , ?)"			
			  }

        conn.query(sql, [row.exercisename, row.date, row.calories,row.id],function(err,data){
          if(!err && !row.id){
            row.id = data.insertId;
          }
          ret(err, row);
          conn.end();
        });        
    },
    validate: function(row){
      var errors = {};
      
      if(!row.exercisename) errors.exercisename = "is required"; 
      
      return errors.length ? errors : false;
    }
};  

function GetConnection(){
        var conn = mysql.createConnection({
          host: "localhost",
          user: "arto",
          password: "7177",
          database: "fitnessdb"
        });
    return conn;
}