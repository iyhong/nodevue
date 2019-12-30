const Mydb = require('./mydb');


module.exports = function(app, pool){
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
    
    app.put('/apis/replies/:bno/:rno', (req, res) =>{
        let bno = req.params.bno,
            rno = req.params.rno,
            replytext = req.body.replytext;
    
        let mydb = new Mydb(pool);
        mydb.executeTx(conn => {
            conn.query("update reply set replytext = ? where rno = ?", [replytext, rno], (err,ret)=>{
                if(err) {
                    console.log(err);
                    conn.rollback();
                }
                res.json(ret.affectedRows);
                conn.commit();
            });
        })
    });
    
    app.get('/apis/replies/:bno', (req, res) =>{
        let bno = req.params.bno;
        let mydb = new Mydb(pool);
        mydb.execute(conn => {
            conn.query("select * from reply where bno=?", [bno], (err,ret)=>{
                if(err) console.log(err);
                res.json(ret);
            });
        })
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
    
}