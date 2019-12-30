const express= require('express');
const app = express(),
      testJson = require('./test/test.json'),
      cors = require('cors'),
      bodyParser = require('body-parser');

const Pool = require('./pool'),
      Mydb = require('./mydb'),
      rest = require('./rest');

app.use(express.static('public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(cors());
// Access-Control-Allow-Origin 해결
// app.use( (req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", req.header.origin);
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//     if(req.method==='OPTIONS'){
//         res.status(200).end();
//     }else {
//         next();
//     }
// });

app.use(bodyParser.json({limit : '10mb'}));
app.use(bodyParser.urlencoded({limit : '10mb', extended:true}));


const pool = new Pool();

rest(app, pool);

const server = app.listen(7000, ()=>{
    console.log("Express's started on port 7000");
});