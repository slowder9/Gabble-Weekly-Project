/******** SET UP DB ********/
const Sequelize = require('sequelize');

//Create db
const db = new Sequelize ('gabble', 'savannahlowder', '', {
  dialect: 'postgres',//npm install pg & createdb gabble in terminal
});

/******** USER SCHEMA *******/
const Users = db.define('user', {
    username: Sequelize.STRING(20),
    password: Sequelize.STRING(8),
});

/******* GABBLE SCHEMA ******/
const Messages = db.define('messages', {
  message: Sequelize.STRING(150),
});

/******* LIKES SCHEMA ******/
const Likes = db.define('likes', {
});

//Connect likes schema to users and messages
Likes.belongsTo(Users);
Likes.belongsTo(Messages);

//Connect messages schema to users
Messages.belongsTo(Users);

//SYNC USER SCHEMA
Users.sync().then(function () {
    console.log('users syncd');
});

//SYNC MESSAGES SCHEMA
Messages.sync().then(function() {
  console.log('messages syncd');
});

//SYNC LIKES SCHEMA
Likes.sync().then(function(){
  console.log('likes syncd');
});

/****** FUNCTIONS ******/
//New User
function createUser (username, password) {
  return Users.create({
    username: username,
    password: password,
  });
};

//Log In
function loginUser (username, password) {
  return Users.find({
    where: {
      username: username,
      password: password,
    }
  });
};

//Existing User
function findUserId(id) {
  return Users.find({
    where: {
      id: id,
    }
  });
};

//New gabble message
function writeGabble (userId, message) {
  return findUserId(userId).then(function (user) {
    return Messages.create({
      userId: userId,
      message: message,
    }).then(function() {
      return findUserId(userId);
    });
  });
};

//Gabbles - find all
function findAllGabbles() {
  return Messages.findAll()
}

//Users - find all
function findAllUsers() {
  return Users.findAll();
}

//Messages - find
function findMessageId(id) {
  return Message.find({
    where: {
      id: id,
    }
  });
};

//Like a message
function likeMessage (userId, messageId) {
  return findUserId().then(function (user) {
    return findMessageId().then(function (message){
      return Likes.create({
        userId: userId,
        messageId: messageId,
      });
    });
  });
};

/****** MODULE EXPORTS ******/
module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  findUserId: findUserId,
  writeGabble: writeGabble,
  findAllGabbles: findAllGabbles,
  findAllUsers: findAllUsers,
  findMessageId: findMessageId,
  likeMessage: likeMessage,
};



