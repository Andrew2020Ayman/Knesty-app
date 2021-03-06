const mongoose=require('mongoose');

var bodyParser = require('body-parser');
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
require('dotenv').config();
var cors = require ('cors');

const PORT = process.env.PORT || 5000 ;


  // DB Connection____________________________________________

/* const uri =  process.env.ATLAS_URI; */
const uri =  'mongodb+srv://AndrewDev:dev1234@cluster0-gi7lg.mongodb.net/Tickets_Knestyapp?retryWrites=true&w=majority';
var options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
};
 mongoose.connect(uri, options);
  const connection =mongoose.connection;  
 
connection.once('connected', ()=>{
    console.log('MongoDB database connection established successfully');
})  

//__________________________________________________________________________


const ticket_router = require('./src/routers/ticket.router');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .engine('html', require('ejs').renderFile)
  .set('view engine', 'html')
  
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))

  .use(cors())
  .use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  })

  .use(bodyParser.json())
  
  .use('/tickets',ticket_router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  