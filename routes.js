const gabble = require('./gabble');

function createRoutes(server) {
/******** MAIN PAGES ********/
server.get('/', function (req, res) {
    res.render('gabble', {
      loggedIn: false,
  });
});

//Home
server.get('/home', function (req, res) {
	if (req.session.who != null) {
      gabble.findAllGabbles().then(function (messages) {
        gabble.findAllUsers().then(function (users) {
          res.render('gabble', {
            users: users,
            messages: messages,
            loggedIn: true,
          });
        })
      })
    } else {
      res.redirect('/');
  }
});

/******* NEW USER ********/
//Get request for new user form
server.get('/users/signup', function(req, res) {
    res.render('signup');
});

//Post request for creating new user
server.post('/users/signup', function(req, res) {
  gabble.createUser(req.body.username, req.body.password)
      .then(function (user) {
        req.session.who = user;
        res.redirect('/home');
      }).catch(function (user) {
        res.render('signup', {
          
    });
  });
});

/******* LOGIN ********/
//Get request for login
server.get('/users/login', function (req, res) {
    res.render('login');
});

//Post request for login
server.post('/users/login', function (req, res) {
  gabble.loginUser(req.body.username, req.body.password)
      .then(function (user) {
        req.session.who = user;
        res.redirect('/home');
      }).catch(function (user) {
        res.render()
  })
});

/******* LOG OUT *******/
//Post request for logout
server.post('/users/logout', function (req, res) {
    req.session.destroy;
    res.redirect('/');
});

/******* WRITE GABBLE/MESSAGE *******/
//Get request for new gabble/message form
server.get('/messages/new', function (req, res) {
    if (req.session.who != null) {
      res.render('add');
    } else {
      res.redirect('/');
  }
});

//Post request for added gabble/message
server.post('/messages/new', function (req, res) {
    if (req.session.who != null) {
      gabble.writeGabble(req.session.who.id, req.body.newgabble)
        .then(function (message) {
          res.redirect('/home');
        })
    } else {
      res.redirect('/');
  };
});

//Post request for like
server.post('/likes', function(req, res) {
    if (req.session.who != null) {
      gabble.findAllGabbles().then(function (message) {
        gabble.likeMessage(req.session.who, message.id).then(function (like) {
          res.redirect('/home');
        })
      })
    }
  });
};

module.exports = createRoutes;


