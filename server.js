const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const mysql = require('mysql');
const { RSA_X931_PADDING } = require("constants");
const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'test'
});

db.connect((error)=>{
    if(error){console.log(error);}
   

})
rl.question("What is the Artist name ? ", function(name) {
    rl.question("What the name of the song ? ", function(song) {
      rl.question("What Year The Song Release ?",function(year){
        rl.question("What The Name Of the album ?",function(album){
            db.query(`INSERT INTO playlist (Artist,NamaLagu,TahunRilis,NamaAlbum) VALUES("${name}","${song}",${year},"${album}")`,(error,result)=>{
                if(error){console.log(error)}
                console.table(result);
                console.log("data berhasil di Input")
                db.query('SELECT * FROM playlist',(error,result)=>{
                    if(error)throw error;
                    console.table(result);
                    console.log("Thank You For Submit Your Data");
                    process.exit(0);
                    
                });
               
            });

        });
      });     
    });
});


rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

