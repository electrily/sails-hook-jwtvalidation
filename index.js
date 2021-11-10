var jwt = require('jsonwebtoken');

module.exports = function jwtvalidation(sails) {
  return {
    configure: function(){
      if (!process.env.JWT_SECRET && !sails.config.jwtSecret) {
          throw new Error('process.env.JWT_SECRET or sails.config.jwtSecret must be set');
        }
    },
    initialize: async function() {
      return new Promise((resolve)=>{
        sails.on('hook:orm:loaded', ()=>{
          // Finish initializing custom hook
          // Then resolve.
          resolve();
        });
      });
    },
    verify: function (req, res, next, usrHolder, cb) {
      const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
      if (req.header('authorization')) {
        // if one exists, attempt to get the header data
        var token = req.header('authorization').split('Bearer ')[1];
        // if there's nothing after "Bearer", no go
        if (!token) {
          sails.log.debug('Bearer token was not found on the request');
          return cb('invalid',_,res,next);
        }
        // if there is something, attempt to parse it as a JWT token
        return jwt.verify(token, secret, async function (err, payload) {
          if (err)
            return cb('error',err,res,next);
          if (!payload.sub) {
            sails.log.debug('Payload subject missing');
            return cb('invalid',_,res,next);
          }
          var user = await usrHolder.findOne({ userId: payload.sub });
          if (!user) {
            sails.log.debug('Subject id not found in the holder');
            return cb('invalid',_,res,next);
          }
          // if it got this far, everything checks out, success
          req.user = user;
          return cb('success',_,res,next);;
        })
      }
      sails.log.debug('Authorization not set');
      return cb('invalid',_,res,next);
    }
  };
}