const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/partials');
const dbModel = require('./index');
const ContactModel = dbModel.ContactModel;
const UserModel = dbModel.UserModel;
require('./bin/www');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("home");
});

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
        res.status(401).send(error);
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
                res.render('home', { username, isLogged: true });
            }
        } else {
            res.send(`Passwords do not match`);
        }
    } catch (error) {
        res.status(401).send(error);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
