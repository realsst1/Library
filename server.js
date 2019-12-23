if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const expressLayouts=require("express-ejs-layouts");
const indexRouter=require("./routes/index");
const authorRouter=require("./routes/authors")
const bookRouter=require("./routes/books");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const methodOverride=require("method-override")

app.set("view engine","ejs");
app.set("views",__dirname+"/views");
app.set("layout","layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}));


app.use("/books",bookRouter);
app.use("/authors",authorRouter);
app.use("/",indexRouter);


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("Connected to database"));



port=process.env.PORT || 3000;

app.listen(port)