var mysql = require("mysql");

module.exports =  {
    blank: function(){ return {} },
    get: function(id, ret){
        var conn = GetConnection();
        var sql = 'SELECT * FROM meals ';
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
        conn.query("DELETE FROM meals WHERE id = " + id, function(err,rows){
          ret(err);
          conn.end();
        });        
    },
    save: function(row, ret){
        var sql;
        var conn = GetConnection();
        if (row.id) {
				  sql = " Update meals "
							+ " Set mealname=?, date=? ,calories=?,updated=Now()"
						  + " WHERE id = ? ";
			  }else{
				  sql = "INSERT INTO meals (mealname, date, created,calories) VALUES (?, ?, Now() , ?)"			
			  }

        conn.query(sql, [row.mealname, row.date, row.calories,row.id],function(err,data){
          if(!err && !row.id){
            row.id = data.insertId;
          }
          ret(err, row);
          conn.end();
        });        
    },
    validate: function(row){
      var errors = {};
      
      if(!row.mealname) errors.mealname = "is required"; 
      
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