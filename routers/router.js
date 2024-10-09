const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const dashboardController = require("../controllers/dashboard");
const userController = require("../controllers/user");
const roleController = require("../controllers/role");
const imageHelper = require("../helpers//store_image");
const Middleware = require("../middlewares/auth_middleware");

// Login routes
router.get("/login", Middleware.reverseAuthenticate, authController.loginPage);
router.post("/login", authController.validateLogin, authController.loginUser);


// Registration routes
router.get("/register", Middleware.reverseAuthenticate, authController.registerPage);
router.post("/register", authController.validateRegistration, authController.registerUser);


// Forgot password routes
router.get("/forgot_password", Middleware.reverseAuthenticate, authController.forgotPassword);
router.post("/forgot_password", authController.validateForgotPassword, authController.checkEmail);


// Password recovery routes
router.get("/recover_password/:id", Middleware.reverseAuthenticate, authController.recoverPassword);
router.post("/recover_password/:id", authController.validatePasswordChange, authController.changePassword);


// Dashboard route
router.get("/", Middleware.authenticate, dashboardController.dashboard);
router.post("/", dashboardController.validatePasswordChange, dashboardController.dashboardChangePassword);


// Users route
router.get("/users", Middleware.authenticate, Middleware.isAdmin, userController.allUsersData);


// Add-Edit-Delete User route
router.get("/user/:id?", Middleware.authenticate, Middleware.isAdmin, userController.displayUserFormPage);
router.post("/add_user", userController.userValidationRules, userController.addOrEditUser);
router.post("/user/delete/:id", userController.deleteUser);


// Role route
router.get("/role", Middleware.authenticate, Middleware.isAdmin, roleController.roles);
router.get("/getRoles", Middleware.authenticate, Middleware.isAdmin, roleController.getRole);


// Add-Edit-Delete Role route
router.get("/add_role/:id?", Middleware.authenticate, Middleware.isAdmin, roleController.displayRolePage);
router.post("/add_role", roleController.roleValidationRules, roleController.addOrEditRole);
router.post("/add_role/delete/:id", roleController.deleteRole);


// Profile route
router.get("/profile", Middleware.authenticate, dashboardController.profile);
router.post("/profile", imageHelper.upload, dashboardController.validateProfileUpdate, dashboardController.editProfile);


// Logout route
router.get("/user_logout", dashboardController.logout);


module.exports = router;