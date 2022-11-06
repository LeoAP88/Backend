const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { engine } = require('express-handlebars')
const app = express()


// middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// rutas
app.use('/', routerApi)
app.use('/productos', routerApi)


// handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
// app.set('views', __dirname + '/views');


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});

