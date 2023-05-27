const crypto = require('crypto')

var createHash =   (data, salt = '') => {
    let shasum = crypto.createHash('sha256').update(data + salt).digest('hex');
    return shasum;
  };
  module.exports = {
        createHash,
        HashComparer : (User_Password , Stored_Password,salt)=>{
            return (Stored_Password === createHash(User_Password,salt))
        },
        RandomString : (length)=>{
          return crypto.randomBytes(length).toString('hex');
        }
        
  }