const express= require('express');
const app = express(),
      testJson = require('./test/test.json');

const Pool = require('./pool');
const Mydb = require('./mydb');

app.use(express.static('public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const pool = new Pool();

app.get('/', (req, res) =>{
    // res.send("Hello Node js!!");
    // res.json(testJson);
    res.render('index', {name:'hong inyong'});
});

app.get('/test/:email', (req, res)=>{
    testJson.email = req.param.email;
    testJson.aa = req.query.aa; 
    res.json(testJson);
});

app.get('/dbtest/:user', (req, res) =>{
    let user = req.params.user;
    let mydb = new Mydb(pool);
    mydb.execute(conn => {
        conn.query("select * from user where uid=?", [user], (err,ret)=>{
            res.json(ret);
        });
    })
});

const server = app.listen(7000, ()=>{
    console.log("Express's started on port 7000");
});