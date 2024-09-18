const express = require('express')
const app = express()
const multer = require('multer')
// Multer, middleware to handle multipart/form-data, which is typically used for file uploads in NodeJS and can also process regular form fields. [REFERENCE]: https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/ for detail user guide on Multer

// const bcrypt = require('bcrypt')

const mysql = require('mysql2')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')    // cb is a callback function that takes 2 args. 1st arg is ERR, setting it to null indicates everything is fine, and u can proceed with storing the file in the  location specified in the 2nd argument
        
        // incase if destination is incorrect or /uploads does not exists the below err is shown
        // ERROR : ENOENT: no such file or directory, open '/uploads/1726157948970-TECHREPORT-2'
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    },
    // the destination and filename functions in multer.diskStorage are used to control where and how uploaded files are stored on the server.
})
const upload = multer({storage});



// CONNECT TO MySQL DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeet',
    password: '14/09/2022',
    database: 'dbms'
})

db.connect((err)=>{
    if(err){
        console.log("Error connecting to database: "+err.stack);
        return;
    }

})



// LISTEN TO REQUESTS 

app.post('/api/registerUser', async(req, res)=>{
    // console.log('register endpoint hit success: ', req.body)
    const {username,email, password} = req.body
   
    //check if user exists
    db.query(`SELECT * FROM users WHERE username = ? OR email=?`, [username, email],(error, result)=>{
        if (error) {
            console.error('Error occurred while userExist Query'+error);
            return res.status(500).json({message:'Server Error. Please Try Again Later'});
        } 
        if(result.length > 0)
            return res.status(200).json({message: 'User already Exists! Please try again with a new username or email'})  
        else {
            // const json = JSON.stringify(result);
            // console.log('result length: '+result.length)
            // console.log('username already exists:'+json)
            
            const addUser_sql = `INSERT INTO users(username, password_hash, email) VALUES(?, ?, ?)`;
            db.query(addUser_sql, [username, password, email], (error, result)=>{
                if(error)
                    return res.status(500).json({message: 'Error inserting the record:', error})
                return res.status(201).json({message: 'Registration Successful'})
            })
        }
    })
    // store this in the DB
})



app.post('/api/loginUser', (req,res)=>{
    // res.json({message: 'hello from Backend'})
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    db.query('SELECT id, username, password_hash FROM users WHERE username=? AND password_hash=?',[username,password], (error, result)=>{
        if(error){
            console.error('Error fetching students data from the database: ' + error.stack);
            return res.status(500).json({message:'An unexpected error occurred. Please Try Again Later'});
        }
        if(result.length){
            console.log("login: ",result[0])
            return res.status(200).json({message: `Welcome ${username}`, user_info: result[0]})
        }
        else
            return res.status(401).json({ message: 'Invalid Credentials' });
    })
})


app.post('/api/create-auction', upload.single('rulesFile'), (req,res)=>{
    // Explanation:
    // multer.none(): This middleware is used to handle regular multipart/form-data (without file uploads). It parses the FormData from the request and makes it available in req.body.
    // No file upload: If you are only sending form fields and no files, multer.none() is sufficient.
    // If you also want to handle file uploads, you can modify the code to use upload.single() or upload.fields() to handle both files and regular form data.
    
    try {
        if (!req.file.path) {
            return res.status(400).json({ message: 'Failed to Upload rulesFile' });
        }
        console.log("Create Auction Form fields",req.body);
        console.log("Create Auction Rules File",req.file);

        const rulesFilePath = req.file.path; 
        const {
            manager_id,
            name,
            description,
            startDate,
            startTime,
            timePerBid,
            maxTeams,
            maxPlayerPerTeam,
            minBidPrice,
            // startDateTimeUTC,

        } = req.body
        // console.log("startDateTimeUTC: ",startDateTimeUTC);
        

        // store the filename(path) in the db along with other fields
        const sql = `insert into auctions(manager_id, name, description, rules_file, start_date, start_time, time_per_bid, max_teams, players_per_team, min_bid_price) values(?,?,?,?,?,?,?,?,?,?)`

        db.query(sql, [manager_id, name, description, rulesFilePath, startDate, startTime, timePerBid, maxTeams, maxPlayerPerTeam, minBidPrice], (error, result)=>{
            if(error){
                console.log("SQL ERROR. Failed to insert new auction to DB: ", error)
                res.status(500).json({message: 'An unexpected error occurred. Please try again later'})
            }
            else{
                res.status(200).json({message: 'Auction created successfully!'})
            }
        })
    } catch (error) {
        console.log("Error while handling auction form submit: ", error)
        res.status(500).json({message: 'An unexpected error occurred. Please Try again later.'})
    }
})

app.get('/api/getAuctionsList/:uid', (req, res) => {
    const uid = req.params.uid;

    // Validate user ID
    if (!uid) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // Prepare SQL query
    const sql = `SELECT id, manager_id, name, description, rules_file, start_date, start_time, time_per_bid, max_teams, players_per_team, min_bid_price FROM auctions WHERE manager_id = ?`;

    // Execute the query and handle asynchronous errors in the callback
    db.query(sql, [uid], (err, result) => {
        if (err) {
            console.log("DB Query Failed: ", err);
            return res.status(500).json({ message: 'Failed to retrieve auctions. Please try again later.' });
        }

        // If query is successful, send the result
        res.send(result);
        console.log(result)
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});