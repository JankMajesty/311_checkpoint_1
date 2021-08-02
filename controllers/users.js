const { json } = require('body-parser');
const users = require('../data/index')
const sampleUser = require('../data/sampleUser');
const { put } = require('../routes/users');


const listUsers = (req, res) => {
  res.json(users)
};

const showUser = (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if(foundUser){
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  
  } else {
    res.status(404).json({msg: 'No user with the id of ${req.params.id}'})
  } 
}

const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1
  }
  users.push(sampleUser);
  res.json(users)

}

const updateUser = (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if(foundUser){
    const putUser = req.body;
    users.forEach(user => {
      if(user.id === parseInt(req.params.id)) {
        user.name = putUser.name ? putUser.name : user.name;
        user.username = putUser.username ? putUser.name : user.username;
        user.email = putUser.email ? putUser.email : user.email;
        user.address = putUser.address ? putUser.address : user.address;
        user.phone = putUser.phone ? putUser.phone : user.phone;
        user.website = putUser.website ? putUser.website : user.website;
        user.company = putUser.company ? putUser.company : user.company;

      }
    });
  
  } else {
    res.status(400).json({msg: 'No user with the id of ${req.params.id}'});
  } 
}

const deleteUser = (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if(foundUser) {
    res.json({
      msg: 'user deleted',
      users: users.filter(user => user.id !== parseInt(req.params.id))
    });
  }
    else {
      res.status(400).json({msg: 'No user with id of ${req.params.id'});
    }
  }


module.exports = {
  listUsers,showUser,createUser,updateUser,deleteUser
}