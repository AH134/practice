require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_RUI = process.env.MONGODB_RUI;

module.exports = {
  PORT,
  MONGODB_RUI,
};
