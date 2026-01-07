const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS');
    next();
});

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    // res.status(401).send('SORRY YOU NEED A PASSWORD');
    throw new Error('PASSWORD REQUIRED!!!');
});

// app.use((req, res, next) => {
//     console.log('First middleware executed');
//     next();
// })

// app.use((req, res, next) => {
//     console.log('Second middleware executed');
//     next();
// });

// Middleware to parse JSON bodies
// app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home Page!');
});

app.get('/error', (req, res) => {
    // propagate an error to the error handler instead of crashing the process
    chicken.fly()
});


app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime || 'unknown'}`)
    res.send({ message: 'WOOF WOOF' });
});

// Error-handling middleware (must have 4 args)

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: I LOVE CODING!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.log('********************')
    console.log('********ERROR*******')
    console.log('********************')
    console.log(err)
    next(err);
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});

// module.exports = app;next(err);