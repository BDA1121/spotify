var express = require("express");
var request = require("request-promise");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
var user_id = "bda";
var token = "Bearer BQCHPhDoVhWO-dpf-CQ71FepQuxWLJOfaR2HGkKxrtv7x3XWqPGu7pE-bp9oasgMgYsrSoSNT5Pz2V9y1aO7lS9gV7ohdKzM1BF1U4HJL6NKVHovYUrX4XMpM4m0nnbP81jfGtHbfmrfwNpchTU_qsK8uCzzfuRCYAU";
app.get("/input",function(req,res){
    res.render("input")
})
app.post("/input",function(req,res){
	res.redirect("/result/"+req.body.id1+"/"+req.body.id2)
})
app.get("/result/:id1/:id2",async function(req,res){
	var xs = 0;
var truth = false; 
var x = 0,
    y = 0,
    i = 0,
    j = 0;
	var arrVisited = [];
var arr = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
arr[0][0] = req.params.id1; 
	console.log("asssssssss");
	 while(!truth){
		if(i === 21){
    i = 1;
    j++;
  };
  if(arr[i][j] === undefined){
     i = 1;
    j++;    
	  arr[0][x] = arr[i][j];
  }
  else{
	  arr[0][x] = arr[i][j];
  }
  
 await request({url:"https://api.spotify.com/v1/artists/"+arr[0][x]+"/related-artists",headers:{"Authorization":token}}) 
    .then(response =>{
     //console.log(JSON.parse(response));
	    var Main =  JSON.parse(response);
	  
       if(Main && Main["artists"]){
		   var ks = 1;
      for(var k = 0;k < 20;k++){
		 
		  // console.log(Main["artists"][k]["id"]+"------------"+ i +"--"+ x +"----------------------------------------------------------------");
       if( JSON.stringify(Main["artists"][k]["id"]) === "\""+req.params.id2+"\""){
xs = x;
    console.log("---------x----------x----------x---------------x-------------x------x-------------x------------------x-----------------x-------------x"+xs);
     
     truth = true;
}  
		  else{
			 var kx = 0;
			//console.log("loading");  
			  for(var l=0;l<arrVisited.length;l++){
				  if((Main["artists"][k]["id"]) === arrVisited[l]){
					  //console.log("hiiii"+ks);
					   var kx = -1;
				  } 
			  }
			  if(kx === 0){
				  arr[ks][x] = Main["artists"][k]["id"];
		  console.log( arr[ks][x]);
					  ks ++;
				  arrVisited.push(Main["artists"][k]["id"]);
			  }

		  }
		  
      }
		
    }
	 
    }).then(body =>{
    //	console.log("----");

    } ).catch(error =>{
    	console.log(error);
    }) ;///request ka end
x++;
i++;
	}
	var arrPath = [];
	arrPath.push(arr[0][xs]);
	while(xs !== 0){
	for(var xC = 0;xC < xs; xC ++ ){
            for(var yC = 1;yC<21;yC++){
              if(arr[yC][xC] === arr[0][xs]){
                    arrPath.push(arr[0][xC]);
				  xs = xC;
				  xC = -1;
			  }
			}
		}
	}
	var Strings = "";
	for(var string = arrPath.length-1;string>=0;string--){
		Strings = Strings +"----"+arrPath[string];
	}
	res.send("found"+Strings+"----"+id2);
})//// end of route




app.listen(7000, function(){
  console.log("server");
})