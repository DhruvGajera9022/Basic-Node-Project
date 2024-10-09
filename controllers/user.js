const bcrypt = require("bcrypt");
const fs = require('fs');

const { check, validationResult } = require('express-validator');
require("dotenv").config();

const Users = require("../models/user");
const sessionHelper = require("../helpers/session_helper");
const dateHelper = require("../helpers/date_formator");



//To display all users
const allUsersData = async (req, res) => {
    const data = await sessionHelper.loggedInUserData(req);
    let allData = await Users.findAll({});

    allData = allData.map(user => {
        return {
            ...user.dataValues,
            formattedDob: dateHelper.formatDate(user.dob)
        };
    });
    res.render("users/users", { title: "Users", userData: data, allData });
}
// To render page according to add or edit request
const displayUserFormPage = async (req, res) => {
    // Get logged-in user data from session
    const data = await sessionHelper.loggedInUserData(req);


    // Operation on user
    const id = req.params.id;

    // Fetch user data for the given ID
    if (id) {
        const user = await Users.findOne({ where: { id } });
        user.hobbies = user.hobbies ? user.hobbies.split(',') : [];
        if (user) {
            res.render("users/add_user", {
                title: "Edit User",
                userData: data,
                user: user,
            });
        } else {
            return res.status(404).send("User not found.");
        }
    } else {
        // Render the page for adding a new user
        res.render("users/add_user", {
            title: "Add User",
            userData: data,
            user: null,
        });
    }
}
// To add-edit user
const addOrEditUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { id, fullName, email, password, number, gender, dob, hobby, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    if (id) {
        // edit user
        const isUserUpdated = await Users.update({
            fullName: fullName,
            email: email,
            password: password,
            number: number,
            gender: gender,
            dob: dob,
            hobbies: [hobby].join(", "),
            role: role,
        }, { where: { id: id } });
        if (isUserUpdated > 0) {
            res.redirect("/users");
        }
    } else {
        // add user
        const isUserAdded = await Users.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            number: number,
            gender: gender,
            dob: dob,
            hobbies: [hobby].join(", "),
            role: role,
        });
        if (isUserAdded) {
            res.redirect("/users");
        }
    }
};
// To delete user
const deleteUser = async (req, res) => {
    const id = req.params.id;

    const user = await Users.findOne({
        attributes: ["image"],
        where: { id },
    });

    if (!user) {
        return res.status(404).send("User not found");
    }

    const image = user.image;

    await Users.destroy({ where: { id } });

    if (image) {
        const imagePath = `assets/img/userImages/${image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image:", err);
            }
        });
    }
    res.redirect("/users");
}
// To validate user fields
const userValidationRules = [
    check('fullName')
        .trim()
        .isLength({ min: 1 }).withMessage('Full name is required.'),

    check('email')
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email address.'),

    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];



module.exports = {
    allUsersData,

    addOrEditUser,
    displayUserFormPage,
    deleteUser,
    userValidationRules,
}