app.post('/contact', async (req, res) => {
    try {
        const username = req.body.user;
        const email = req.body.email;
        const message = req.body.msg;
        const contact = new ContactModel({
            name: username,
            email: email,
            message: message
        });
        const savedData = await contact.save();
        if (savedData) {
            res.render('home');
        }
    } catch (error) {
        res.status(500).send(error); // Changed status code to 500 (Internal Server Error)
    }
});

app.post('/useraccount', async (req, res) => {
    try {
        const username = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const confirmPassword = req.body.cpassword;
        if (password === confirmPassword) {
            const user = new UserModel({
                name: username,
                email: email,
                phone: phone,
                password: password,
                cpassword: confirmPassword
            });
            const savedUserData = await user.save();
            if (savedUserData) {
                res.render('home', { username, isLoggedIn: true }); // Fixed variable name
            }
        } else {
            res.send(`Passwords do not match`);
        }
    } catch (error) {
        res.status(500).send(error); // Changed status code to 500 (Internal Server Error)
    }
});
