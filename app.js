// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var routes      = require('./routes');
var path        = require('path');


var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model
var Menu   = require('./models/menu');
var Link   = require('./models/link');      
var Introduccion   = require('./models/introduccion');
var Bibliografia   = require('./models/bibliografia');
var Programa       = require('./models/programa'); 
var Docente        = require('./models/docente'); 
var Material       = require('./models/material'); 
var Contribucion   = require('./models/contribucion'); 
var Examen         = require('./models/examen'); 
// =======================
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
// =======================
// routes ================
// =======================
// basic route
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);


// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});   

// // route middleware to verify a token
// apiRoutes.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];

//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });
    
//   }
// });

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/menu', function(req, res) {
  Menu.find({}, null,{ sort:{ order : 1 }}, function(err, menus) {
    res.json(menus);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/introduccion', function(req, res) {
  Introduccion.find({}, function(err, introduccion) {
    res.json(introduccion);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/docente', function(req, res) {
  Docente.find({}, function(err, docente) {
    res.json(docente);
  });
});  


apiRoutes.post('/docente', function(req, res) {

  Docente.update({_id: req.body["_id"]}, req.body, {upsert: true, setDefaultsOnInsert: true},function (err) {
    if (err) {
      return err;
    }
    else {
      res.json(req.body);
    }
  });
  //create new model
  // if(req.body["_id"]) {
  //   Docente.find({_id})
  // } else {
  //   var docente = new Docente(req.body);

  //   //save model to MongoDB
  //   docente.save(function (err) {
  //     if (err) {
  //       return err;
  //     }
  //     else {
  //       res.json(docente);
  //     }
  //   });
  // }
});  


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/material', function(req, res) {
  Material.find({}, function(err, material) {
    res.json(material);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/contribucion', function(req, res) {
  Contribucion.find({}, function(err, contribucion) {
    res.json(contribucion);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/link', function(req, res) {
  Link.find({}, function(err, link) {
    res.json(link);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/bibliografia', function(req, res) {
  Bibliografia.find({}, function(err, biblio) {
    res.json(biblio);
  });
});  


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/examen', function(req, res) {
  Examen.find({}, function(err, examen) {
    res.json(examen);
  });
});  

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/pregunta', function(req, res) {
  Pregunta.find({}, function(err, pregunta) {
    res.json(pregunta);
  });
});  


apiRoutes.get('/programa', function(req, res) {
  Programa.find({}, function(err, programa) {
    res.json(programa);
  });
});  

apiRoutes.post('/introduccion', function(req, res) {
  Introduccion.findOne({}, function(err, introduccion) {
    if (err)
      res.send(err);

    for (var field in req.body) {
       if ((field !== '_id') && (field !== '__v')) {
          if (req.body[field] !== undefined) {
             introduccion[field] = req.body[field];
          }  
       }  
    }

    introduccion.save(function(err) {
      if (err)
        res.send(err);
      res.json(introduccion);
    });
  });
});  

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);