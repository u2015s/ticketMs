const { config } = require('../config');
const util = require( 'util' );
const mysql = require('mysql');

// var mysql      = require('mysql');

// async function query(sql, params) {
//     const connection = await mysql.createConnection(config.db);
//     const [results, ] = await connection.execute(sql, params);
  
//     return results;
//   }
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
//   });


  // const connection = mysql.createConnection(config.db);
  


  let connection
  function makeDb( config ) {
    connection = mysql.createConnection( config );
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL Server!');
    });
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }

  var db = makeDb(config.db)
 
  module.exports = {
    db,
    connection
  }