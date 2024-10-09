$(document).ready(function () {
    let loginForm = $("#loginForm");
    let registerPage = $("#registerPage");
    let forgotPassForm = $("#forgotPassForm");
    let recoverPassForm = $("#recoverPassForm");
    let formAddUser = $("#formAddUser");
    let formAddRole = $("#formAddRole");
    let formProfile = $("#formProfile");
    let formPassword = $("#formPassword");

    loginForm.validate({
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email is required",
            },
            password: {
                required: "Password is required",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    registerPage.validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            fullname: {
                required: "Name is required",
                minlength: "Name must be at least 3 characters long"
            },
            email: {
                required: "Email is required",
            },
            password: {
                required: "Password is require",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is require",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    forgotPassForm.validate({
        rules: {
            email: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email is required",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    recoverPassForm.validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            password: {
                required: "Password is require",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is require",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    formAddUser.validate({
        rules: {
            fullName: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            role: {
                required: true,
            },
        },
        messages: {

            fullName: {
                required: "Full Name is require",
                minlength: "Full Name must be at least 3 characters long",
            },
            email: {
                required: "Email is require",
            },
            password: {
                required: "Password is require",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is require",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            role: {
                required: "Role is require",
            },
        }
    });

    formAddRole.validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            description: {
                required: false,
                minlength: 10
            }
        },
        messages: {
            title: {
                required: "Please enter a role title",
                minlength: "Title must be at least 3 characters long"
            },
            description: {
                minlength: "Description must be at least 10 characters long"
            }
        },
    });

    formProfile.validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
            },
            number: {
                required: true,
            }
        },
        messages: {
            fullname: {
                required: "Full Name is required",
                minlength: "Name must be at least 3 characters long"
            },
            email: {
                required: "Email is required",
            },
            number: {
                required: "Number is required",
            }
        }
    });

    formPassword.validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            password: {
                required: "Password is require",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is require",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
    });
});
