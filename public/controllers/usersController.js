const Datastore = require('nedb');

const users = new Datastore({ filename: './users.db', autoload: true });

const { ipcMain } = require('electron');

const User = {
  name: 'admin',
  upload: 0,
  download: 0,
  interval: 10 //minutes
}

ipcMain.on('get user', (event, arg) => {
    getUser(event) 
})

ipcMain.on('update user', (event, arg) => {
  updateUser(event, arg)
})

function initUser() {
  users.findOne({name: 'admin'}, (err, user) => {
    if (!user) {
      users.insert(User, (err, doc) => {
        if (err) console.log(err)
        console.log(doc)
      });

    } else {
      console.log(user)
    }
  })
}

function getUser(event) {
  users.findOne({name: 'admin'}, (err, user) => { 
    if (err) console.log(err)

    event.reply('async-reply', user)
  })
}

function updateUser(event, arg) {
  let userData = arg
  userData.name = 'admin'
  users.update({name: 'admin'}, userData, {})
}


module.exports = {
  initUser,
  getUser,
  updateUser,
}

