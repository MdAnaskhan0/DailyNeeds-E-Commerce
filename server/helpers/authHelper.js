const bcrypt = require("bcrypt");
const saltRounds = 10;

//password hasing
const hashpassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, saltRounds);

    return hashed;
  } catch (e) {
    console.log("password hasherror", e);
  }
};
//password comparing

const comparepassword = async (password, hashpassword) => {
  return bcrypt.compare(password, hashpassword);
};

//function export

module.exports = { hashpassword, comparepassword };
