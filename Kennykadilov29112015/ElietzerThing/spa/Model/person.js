var mysql = require("mysql");

module.exports =  {
    get: function(id, ret){
        var conn = GetConnection();
        var sql = 'SELECT * FROM mydb';//Original: var sql = 'SELECT * FROM 2015Fall_Persons ';
        if(id){
          sql += " WHERE id = " + id;
        }
        conn.query(sql, function(err,rows){
          if(err) throw err;
          ret(rows);
          conn.end();
        });        
    },
    delete: function(id, ret){
        var conn = GetConnection();
        conn.query('DELETE FROM mydb',function(err,rows){//Original: conn.query('SELECT * FROM 2015Fall_Persons',function(err,rows){
          if(err) throw err;
          ret(rows);
          conn.end();
        });        
    },
    save: function(row, ret){
        var conn = GetConnection();
        //IF STATEMENT IS NEEDED HERE: IF ___ IS EMPTY CREATE, IF ___ EXISTS THEN UPDATE
        conn.query('INSERT INTO FROM Person',function(err,rows){//Original: conn.query('SELECT * FROM 2015Fall_Persons',function(err,rows){
          if(err) throw err;
          ret(rows);
          conn.end();
        });        
    },
    validate: function(row){
      var errors = {};
      
      if(!row.Name) errors.Name = "is required"; 
      
      return errors.length ? errors : false;
    }
};  

function GetConnection(){
        var conn = mysql.createConnection({
          host: "localhost",
          user: "ken",
          password: "123",
          database: "c9"
        });
        
        /*var conn = mysql.createConnection({
          host: "localhost",
          user: "blabla",
          password: "1212",
          database: "c9"
        });*/
    return conn;
}