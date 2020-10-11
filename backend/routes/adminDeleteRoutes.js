const express = require('express');
const adminDeleteRoutes = express.Router();
const adminDeleteControllers = require("../controllers/adminDeleteControllers");

// DELETE

adminDeleteRoutes.delete('/deleteAll', adminDeleteControllers.deleteAll);

// Export Routes
module.exports = adminDeleteRoutes;