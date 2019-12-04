const util      = require('util'),
      Promise   = require('bluebird');

const Pool = require('../pool');

const pool = new Pool();
// const sql1 = "update user set lastlogin=now() where uid='u001'";
const sql1 = "select * from user where uid='u001'";
const sql2 = "update user set lastlogin=now() where uid='u002'";

execute ( conn => {
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
    ]).then(r => {
        util.log('End of Then !!!!!!!!');
        // util.log('sql1=' , r[0].affectedRows);
        util.log(r[0]);
        util.log('sql2=' , r[1].affectedRows);
        conn.commit();
        pool.end();
    }).catch(err =>{
        util.log('ERRRRRRR');
        conn.rollback();
        pool.end();
    });
});

function execute(fn) {
    Promise.using( pool.connect(), conn => {
        conn.beginTransaction( txerr => {
            fn(conn);
        });
    });
}

// Promise.using( pool.connect() , conn => {
//     conn.beginTransaction ( txerr =>{
//         Promise.all([
//             conn.queryAsync(sql1),
//             conn.queryAsync(sql2)
//         ]).then(r => {
//             util.log('End of Then !!!!!!!!');
//             util.log('sql1=' , r[0].affectedRows);
//             util.log('sql2=' , r[1].affectedRows);
//             conn.commit();
//             pool.end();
//         }).catch(err =>{
//             util.log('ERRRRRRR');
//             conn.rollback();
//             pool.end();
//         });
//     });
// });

// Promise.using( pool.connect(), conn => {
//     conn.queryAsync(sql1)
//         .then((console.log))
//         .catch(err => {
//             util.log(err)
//         });

//     pool.end();
// });

// const sql1 = "update user set lastlogin=now() where uid='u001'";
// Promise.using( pool.connect(), conn => {
//     conn.queryAsync(sql1, (err, ret) => {
//         util.log('sql1= ', ret.affectedRows);
//     });

//     pool.end();
// });