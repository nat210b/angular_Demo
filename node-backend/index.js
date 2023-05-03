let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser= require('body-parser'),
    mongoDb = require('./database/db')
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify:false
}).then(()=>{
    console.log("Connected");
},error=>{
    console.log('Database Error ' + error)
})
const bookRoute = require('./route/book.routes');
const multer = require('multer');

const app = express();

var storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
var upload = multer({storage:storage}).single("file");
app.use(express(mongoDb))
app.post('/file',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        console.log("File uploaded")
        console.log(req.file.path)

    })
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))


app.use(cors());

//set path  
app.use(express.static(path.join(__dirname,'dist/')))

//set homepage
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

//api root
app.use('/api',bookRoute);

//port

const port = process.env.PORT||8000;

app.listen(port,()=>{
    console.log('port'+port)
})

app.use((req,res,next)=>{
    // next(createError(404));
})

app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message)
}
)
    