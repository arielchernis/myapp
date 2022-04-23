import app from './server'

const port = process.env.port


app.listen(port, () => {
    console.log('app is running on port ' + port)
});

