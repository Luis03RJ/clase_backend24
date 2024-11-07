//const { getAllUsers } = require("../controllers/users");

const userQueries = {
    getAll: 'SELECT * FROM users',
    getById:'SELECT * FROM users WHERE id = ?',
};

    module.exports = {userQueries}