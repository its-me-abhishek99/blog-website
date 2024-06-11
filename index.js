import express from "express";

const app = express();

const port = 3000;
app.use(express.urlencoded({extended :true}));
app.use(express.static("public"));

app.listen(port,()=>{
    console.log(`${port}`);
});



app.get("/",(req,res)=>{
    res.render("index.ejs",{
    
    });
});

app.get("/newentry",(req,res)=>{
res.render("create.ejs");
});

app.get("/view",(req,res)=>{
    
    //send the array to view.ejs and iterate over the array with some combination of divs to output it as various blog posts
    res.render("view.ejs",{
       blogs:array
    });

});



const array = new Array();

//below route to submit blogs
app.post("/submit",(req,res)=>{
   
    let author = req.body["author"];
    let title =req.body["title"];
    let content = req.body["blog"];
    
 
 
    array.push({
        author,
        title,
        content
    });
    // console.log(req.body);
    res.redirect("/newentry");
});

//below route for going to update form
app.post("/update",(req,res)=>{
    let title_update = req.body["title"];
    let author_update=req.body["author"];
    let content_update =req.body["content"];
    let tail=Number(req.body["idx"]);
    
    let obj1 ={
        title_update,
        author_update,
        content_update,
        tail
    };
    
res.render("update.ejs",{
    obj1
});
});

//below route to redirect to view after updating blog
app.post("/view",(req,res)=>{
let point = Number(req.body["index_update"]);

array[point].author = req.body["author"];
array[point].title = req.body["title"];
array[point].content = req.body["blog"];
res.redirect("/");
});

//delete function for blogs
function del_el(el){
    
array.splice(el,1);
}

//route for deleting blog from the delete button in update form
app.post("/delete",(req,res)=>{
    let i = Number(req.body["updated_idx"]);
    del_el(i);
    res.redirect("/view");
});




