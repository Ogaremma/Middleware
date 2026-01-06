const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.body = req.method;
    req.request.Time = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('dogs', (req, res, next) => {
    console.log('I LOVE DOGS');
    next();
});

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    } else {
        res.status(401).send('SORRY YOU NEED A PASSWORD');
    }
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
    res.send('Hello World!');
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.request.Time}`)
    res.send({ message: 'WOOF WOOF' });
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: I LOVE CODING!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});

// module.exports = app;