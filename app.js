//Server
var server				=	require('express')();
var http					=	require('http').Server(server);
var httpl 				= require('http');
var net						=	require('net');
var express				=	require('express');
var fs						=	require('fs');   
var bodyParser		=	require('body-parser');    
var session				=	require('express-session');
var nodemailer 		= require('nodemailer');
const dotenv 			=	require('dotenv');
var cookieParser	=	require('cookie-parser');
var crypto				=	require('crypto');
const {MongoClient}	=	require('mongodb');

dotenv.config();
const uri 		=	process.env.mongourl;
const client 	= 	new MongoClient(uri,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});


server.set('view engine','ejs');
var viewArray	=	[__dirname+'/views'];
var viewFolder	=	fs.readdirSync('views');
for(var i=0;i<viewFolder.length;i++){
	if(viewFolder[i].split(".").length==1){
		viewArray.push(__dirname+'/'+viewFolder[i])
	}
}
server.set('views', viewArray);
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());  
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session({
	secret: process.env.sessionsecret,
    resave: true,
    saveUninitialized: true
}));

var obavestenjaDB;

//PORT Listening
http.listen(process.env.PORT, function(){
  console.log('Server Started');
	client.connect()
    .then(() => {
    	console.log("Database connected");
    	obavestenjaDB	=	client.db("25Maj").collection('Obavestenja');
    })
    		
    .catch(error => console.log('Failed to connect', error))
});

var sifra = process.env.sifra;

var mainFileVersion	=	new Date().getTime();

server.get('/',async (req,res)=>{
	  obavestenjaDB.find({}).toArray()
    	.then((obavestenja) => {
    		res.render('home',{
					fileVersion: mainFileVersion,
					title: "SRC 25.Maj",
					ogtitle: "SRC 25.Maj", 
					description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
					image: "https://25maj.rs/images/ogImage.jpg",
					url: "https://25maj.rs",
					obavestenja: JSON.stringify(obavestenja) 
				});	
    	})
    	.catch(error => {
    		console.log(error);
    		res.render('home',{
					fileVersion: mainFileVersion,
					title: "SRC 25.Maj",
					ogtitle: "SRC 25.Maj", 
					description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
					image: "https://25maj.rs/images/ogImage.jpg",
					url: "https://25maj.rs",
					obavestenja: "" 
				});
    	})
});

server.get('/dokumenti',function(req,res){
	res.render('dokumenti',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/o-nama',function(req,res){
	res.render('o-nama',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/javne-nabavke',function(req,res){
	res.render('javne-nabavke',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/besplatni-programi-deca',function(req,res){
	res.render('besplatni-programi-deca',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/besplatni-programi-penzioneri',function(req,res){
	res.render('besplatni-programi-penzioneri',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/bazeni-na-otvorenom',function(req,res){
	res.render('bazeni-na-otvorenom',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/zatvoreni-bazen',function(req,res){
	res.render('zatvoreni-bazen',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/wellness-centar',function(req,res){
	res.render('wellness-centar',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/sportska-sala',function(req,res){
	res.render('sportska-sala',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/kombo-paketi',function(req,res){
	res.render('kombo-paketi',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/skolica-plivanja',function(req,res){
	res.render('skolica-plivanja',{
		fileVersion: mainFileVersion,
		title: "SRC 25.Maj",
		ogtitle: "SRC 25.Maj", 
		description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
		image: "https://25maj.rs/images/ogImage.jpg",
		url: "https://25maj.rs"
	});
});

server.get('/obavestenja',function(req,res){
	obavestenjaDB.find({}).toArray()
    	.then((obavestenja) => {
    		res.render('obavestenja',{
					fileVersion: mainFileVersion,
					title: "SRC 25.Maj",
					ogtitle: "SRC 25.Maj", 
					description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
					image: "https://25maj.rs/images/ogImage.jpg",
					url: "https://25maj.rs",
					obavestenja: JSON.stringify(obavestenja) 
				});
    	})
    	.catch(error => {
    		console.log(error);
    		res.render('obavestenja',{
					fileVersion: mainFileVersion,
					title: "SRC 25.Maj",
					ogtitle: "SRC 25.Maj", 
					description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
					image: "https://25maj.rs/images/ogImage.jpg",
					url: "https://25maj.rs",
					obavestenja: JSON.stringify("") 
				});
    	})
});

server.get('/login',function(req,res){
	if(req.session.login){
		res.redirect("/obavestenja-administracija");
	}else{
		res.render('login',{
			fileVersion: mainFileVersion,
			title: "SRC 25.Maj",
			ogtitle: "SRC 25.Maj", 
			description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
			image: "https://25maj.rs/images/ogImage.jpg",
			url: "https://25maj.rs"
		});
	}
	
});

server.post('/login',function(req,res){
	if(req.body.email=="info@25maj.rs" && req.body.password==sifra){
		req.session.user 	=	"admin";
		res.redirect("/obavestenja-administracija");
	}else{
		res.send("Pogresna sifra ili lozinka, pokusajte ponovo <a href='/login'>ovde</a>.")
	}
});

server.get('/logout',function(req,res){
	if(req.session.user){
		req.session.destroy(function(){});	
	}
	res.redirect("/")
});


server.get('/obavestenja-administracija',function(req,res){
	if(req.session.user){
		obavestenjaDB.find({}).toArray()
    	.then((obavestenja) => {
    		res.render('obavestenja-administracija',{
					fileVersion: mainFileVersion,
					title: "SRC 25.Maj",
					ogtitle: "SRC 25.Maj", 
					description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
					image: "https://25maj.rs/images/ogImage.jpg",
					url: "https://25maj.rs",
					obavestenja: JSON.stringify(obavestenja) 
				});
    	})
    	.catch(error => {
    		console.log(error);
    		res.send("Greska u bazi podataka  "+ error.toString())
    	})
		
	}else{
		res.send("Niste ulogovani. ")
	}
	
});

server.post('/okaci-obavestenje',function(req,res){
	if(req.session.user){
		if(req.body.id=="new"){
			var obavestenje		=	{};
			obavestenje.title =	req.body.title;
			obavestenje.date 	=	req.body.date;
			obavestenje.text 	=	req.body.tekst;
			if(req.body.vidljivo){
				obavestenje.visible 	=	1;
			}else{
				obavestenje.visible 	=	0;
			}
			var currentTime					=	new Date().getTime();
			obavestenje.id 					=	"obv-"+currentTime;
			obavestenje.actualtime	=	currentTime;
			obavestenje.actualdate	=	new Date().getTime();
			obavestenjaDB.insertOne(obavestenje)
	    	.then((collection) => {
	    		res.redirect('/obavestenja-administracija');
	    	})
	    	.catch(error => {
	    		console.log(error);
	    		res.send("Greska u bazi podataka  "+ error.toString())
	    	})
		}else{
			obavestenjaDB.find({id:req.body.id}).toArray()
	    	.then((obavestenja) => {
	    				var obavestenje =	JSON.parse(JSON.stringify(obavestenja[0]));
							obavestenje.title = req.body.title;
							obavestenje.text 	=	req.body.tekst;
							obavestenje.date 	=	req.body.date;
							if(req.body.vidljivo){
								obavestenje.visible 	=	1;
							}else{
								obavestenje.visible 	=	0;
							}

							obavestenjaDB.deleteOne({id:obavestenje.id})
					    	.then((collection) => {
					    		obavestenjaDB.insertOne(obavestenje)
							    	.then((collection) => {
							    		res.redirect('/obavestenja-administracija');
							    	})
							    	.catch(error => {
							    		console.log(error);
							    		res.send("Greska u bazi podataka  "+ error.toString())
							    	})
					    	})
					    	.catch(error => {
					    		console.log(error);
					    		res.send("Greska u bazi podataka  "+ error.toString())
					    	})
	    		
	    	})
	    	.catch(error => {
	    		console.log(error);
	    		res.send("Greska u bazi podataka  "+ error.toString())
	    	})


					
		}
	}else{
		res.send('Niste ulogovani pa ne mozete kaciti obavestenja');
	}
	
});

server.post('/obrisi-obavestenje',function(req,res){
	if(req.session.user){
		obavestenjaDB.deleteOne({id:req.body.obavestenjeID})
    	.then((collection) => {
    		res.redirect("/obavestenja-administracija")
    	})
    	.catch(error => {
    		console.log(error);
    		res.send("Greska u bazi podataka  "+ error.toString())
    	})

		
	}else{
		res.send('Niste ulogovani pa ne mozete brisati obavestenja');
	}
});

server.get('/obavestenje/:id',function(req,res){
	obavestenjaDB.find({id:req.params.id}).toArray()
  	.then((obavestenja) => {
			res.render('obavestenje',{
				fileVersion: mainFileVersion,
				title: "SRC 25.Maj",
				ogtitle: "SRC 25.Maj", 
				description: "Pored tri otvorena bazena i jednog zatvorenog, olimpijskog, u čijem sklopu se nalazi i saunski blok - welness, centar sadrži i salu za dvoranske sportove. U sklopu SRPC funkcionišu razni ugostiteljski objekti - restorani I kafići, dečije igraonice, teretane i drugi razni poslovni objekti.",
				image: "https://25maj.rs/images/ogImage.jpg",
				url: "https://25maj.rs",
				obavestenje: JSON.stringify(obavestenja) 
			});
  		
  	})
  	.catch(error => {
  		console.log(error);
  		res.send("Greska u bazi podataka  "+ error.toString())
  	})
});




