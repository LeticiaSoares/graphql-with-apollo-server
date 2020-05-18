import mysql from 'mysql';

const database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
});

export const queryDB = (sql, args) => new Promise((resolve, reject) => {
    database.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

export default database
