const Users = require('../users/users-model')


function logger(req, res, next) {
console.log(req.method, req.originalUrl, req.timestamp)
next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(resp => {
    if (!resp) { 
      res.status(404).json({ message: "user not found" })
      return;
    } else {
      req.user = resp
      next();
    }
  })
  .catch(err => {
    res.status(500).json('Internal Server Error')
  })
}

function validateUser(req, res, next) {
//   - `validateUser` validates the `body` on a request to create or update a user
//   - if the request `body` lacks the required `name` field, respond with status `400` and 
//`{ message: "missing required name field" }`
if (!req.body.name) {
  res.status(400).json({message: "missing required name field"})
  return;
} else {
  next();
}
}

function validatePost(req, res, next) {
  // `validatePost` validates the `body` on a request to create a new post
//if the request `body` lacks the required `text` field, respond with status `400` and
//  `{ message: "missing required text field" }`
if (!req.body.text) {
  res.status(400).json({message: "missing required text field"})
} else {
  next();
}
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost}
