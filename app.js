var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");
var user_id = "bda";
var token = "Bearer BQBLtLZnvO7v06WgVi6ZbYKarLiw6f7HExPQcBkLJg2lYjn1a2ub1IgUnr7dzsrO67GebLD9pHd_NFkmxBBu4o1JXUjDXw0upcqv7RYpvLt7K9FoBrWmExHrJB2RCOb6TL-v0yu1Z5aFmMPCre0OdWtfcMzTz-uef8M";
app.get("/",function(req,res){
     res.send("input");	
})

app.get("/s",function(req,res){
	var id1 = "5ZKMPRDHc7qElVJFh3uRqB",id2 = "0OdUWJ0sBjDrqHygGUXeCF";
var arr = [id1];
alg(id1,arr);

})

function alg(id,arr){
var x =0;
	id1 = "5ZKMPRDHc7qElVJFh3uRqB";
	id2 = "0OdUWJ0sBjDrqHygGUXeCF";
request({url:"https://api.spotify.com/v1/artists/"+id+"/related-artists",headers:{"Authorization":token}},function(error,response,body){
  if(!error){               
var Main = JSON.parse(body); 
	  if(Main && Main["artists"]){
		  console.log((Main["artists"][1]["id"]));
	  var arrb = [];
       for(var i=0;i<20;i++){
        var k = 0;
		  ;
for(var j=0;j<arr.length;j++){
  if(arr[j] !== JSON.stringify(Main["artists"][i]["id"] )){
       k++;
  }
}
if(k === arr.length){
  if(JSON.stringify(Main["artists"][i]["id"]) === "0OdUWJ0sBjDrqHygGUXeCF"){
res.render("name",{artists:arr,id1:id1,id2:id2}); 
x = -1;
}  
else{
  arrb.push((Main["artists"][i]["id"]));
}   
  }
        x++;
		    console.log(arrb);
}
if(x === 20){
 for(var i=0;i<arrb.length;i++){
	 console.log("-----------");
       var arrr = arr;
       arrr.push(arrb[i]);
       alg(arrb[i],arrr);
}
}
	  
	  }
	  

}})}

app.listen(5000, function(){
  console.log("server");
})
