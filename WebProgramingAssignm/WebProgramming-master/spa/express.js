var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
var meal = require("./Model/meal");
var exercise= require("./Model/exercise");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/meal", function(req, res){
  
  meal.get(null, function(err, rows){
    res.send(rows);
  })
    
})
.get("/meal/:id", function(req, res){
  
  meal.get(req.params.id, function(err, rows){
    res.send(rows[0]);
  })
  
})
.post("/meal", function(req, res){
  var errors = meal.validate(req.body);
  if(errors){
    res.status(500).send(errors);
    return;
  }
  meal.save(req.body, function(err, row){
    res.send(row);
  })
})
.delete("/meal/:id", function(req, res){
  
  meal.delete(req.params.id, function(err, rows){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(req.params.id);
      }
  })
  
})
.get("/exercise", function(req, res){
  
  exercise.get(null, function(err, rows){
    res.send(rows);
  })
    
})
.get("/exercise/:id", function(req, res){
  
  exercise.get(req.params.id, function(err, rows){
    res.send(rows[0]);
  })
  
})
.post("/exercise", function(req, res){
  var errors = exercise.validate(req.body);
  if(errors){
    res.status(500).send(errors);
    return;
  }
  exercise.save(req.body, function(err, row){
    res.send(row);
  })
})
.delete("/exercise/:id", function(req, res){
  
  exercise.delete(req.params.id, function(err, rows){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(req.params.id);
      }
  })
  
})

app.listen(process.env.PORT);