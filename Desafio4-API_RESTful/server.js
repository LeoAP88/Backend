const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// rutas
app.use('/api/productos', routerApi)

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});