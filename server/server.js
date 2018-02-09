const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"dbmysql"
});

app.post('/view',(req,res)=>{
    con.connect(function(err) {
        if (err){
            return console.log('error in connecting1');
        }
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) //throw err;
            {
                return console.log('error in Selecting');
            }
            console.log(result);
            res.send(result);
            //console.log(fields);
            //con.end();
        });
    });
});
app.get('/view/:id',(req,res)=>{
    var id=req.params.id;
    con.connect(function(err) {
        if (err){
            return console.log('error in connecting1');
        }
        con.query("SELECT * FROM users where uid="+id, function (err, result, fields) {
            if (err) //throw err;
            {
                return console.log('error in Selecting');
            }
            console.log(result);
            res.send(result);
            //console.log(fields);
            //con.end();
        });
    });
});

app.post('/insert',(req,res)=>{
    console.log('in');
    var n=req.body.nm;
    var a=req.body.ad;
    var sql = "INSERT INTO users (unm, uaddress) VALUES ('"+n+"', '"+a+"')";
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) //throw err;
        {
            return console.log('error in inserting');
        }
        console.log(result);
        res.status(200).send(result);
    });
});
app.listen(3000,()=>{
    console.log('connected to 3000');
});
/*con.connect(function(err) {
    if (err){
        return console.log('error in connecting');
    } //throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (unm, uaddress) VALUES ('mayur1', 'udhna')";
    con.query(sql, function (err, result) {
        if (err) //throw err;
        {
            return console.log('error in inserting');
        }
        console.log(result);
    });
    con.query("DELETE FROM users where unm='mayur1'", function (err, result) {
        if (err) //throw err;
        {
            return console.log('error in Selecting');
        }
        console.log(result);
        //console.log(fields);
    });
    con.query("update users set uaddress='pandesara' where uaddress='udhna'",(err,result)=>{
        if(err){
            return console.log('error in updating');
        }
        console.log(result);
    });
    con.query("SELECT * FROM users order by unm limit 2", function (err, result, fields) {
        if (err) //throw err;
        {
            return console.log('error in Selecting');
        }
        console.log(result);
        //console.log(fields);
        con.end();
    });
});*/
