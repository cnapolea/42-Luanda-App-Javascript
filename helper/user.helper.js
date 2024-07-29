const User = require('../intra/model/User');

const createUser = async (userPropertiesObj= {} ) => {
    const user = await User.create(userPropertiesObj);
    user.save();
    return user;
}

const userAndTokenCheck = async (userName) => {
    let user = await User.findOne({ userName });
  
    const userExists =  typeof user === "object" ? true : false;
    
    if (userExists) {
      return new Date() >= user?.token_expiration_date ? false : user; 
    }
  
    return false;
  };

module.exports = {createUser, userAndTokenCheck}