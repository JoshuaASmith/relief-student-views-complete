const express = require('express')
var app = express()
const HTTPError = require('node-http-error')
var http = require('http')
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
var cors = require('express-cors')
const dal = require('../DAL/my-sql.js')

app.use(cors({
    allowedOrigins: ['http://localhost:4000/', 'http://localhost:3000', 'http://localhost:3000', 'localhost:3000', 'localhost:4000']
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(bodyParser.json())
// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

/////////////////////////////////////////////////////////////////
///// HELPER FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////
function theCallback(req, res, next) {
    return function(err, response) {
        if (err) {
            var errormsg = BuildResponseError(err, req)
            return next(newError(errmsg.status, errormsg.message, errormsg))
        }
        console.log('METHOD:', req.method, '\nPATH:', req.path, '\nQUERY:', req.query, '\nRESPONSE:', response)
        res.send(response)
    }
}
function BuildResponseError(err) {
    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

function getPersonSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'lastname': function() {
            sortBy = dalModule === 'nosql'
                ? 'lastNameView'
                : 'vPerson';
        },
        'email': function() {
            //email
            sortBy = dalModule === 'nosql'
                ? 'emailView'
                : 'vPersonEmail';
        },
        'default': function() {
            sortBy = dalModule === 'nosql'
                ? 'lastNameView'
                : 'vPerson';
        }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}

function getReliefEffortSortBy(type, dalModule) {
    var sortBy
    var options = {
        'name': function() {
            sortBy = dalModule === 'nosql'
                ? 'lastname'
                : 'vPerson'
        },
        'email': function() {
            sortBy = dalModule === 'nosql'
                ? 'emailView'
                : 'vPersonEmail'
        },
        'default': function() {
            sortBy = dalModule === 'nosql'
                ? 'lastNameView'
                : 'vPerson'
        }
    }
}
/////////////////////////////////////////////////////////////////
///// GET FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////

app.get('/persons', function(req, res, next) {
    const sortByParam = req.query.sortBy || 'vPerson'
    //const sortBy = getPersonSortBy(sortByParam, 'nosql')
    const sortBy = sortByParam
    const sortToken = req.query.sortToken || ''
    const limit = req.query.limit || 5

    dal.listPersons(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            console.log('GET', + req.path, ' query: ', req.query, data)
            res.append('Content-type', 'application/json')
            res.status(200).send(data)

        }
    })
})
app.get('/reliefefforts', function(req, res, next) {
    const sortByParam = req.query.sortBy || 'name'
    //const sortBy = getReliefEffortSortBy(sortByParam, dalModule)
    const sortBy = 'vReliefEffort'
    const sortToken = req.query.sorttoken || ''
    const limit = req.query.limit || 5
    dal.listReliefEfforts(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            console.log('GET' + req.path, " query: ", req.query, data)
            res.append('Content-type', 'application/json')
            res.status(200).send(data)
        }
    })
})

app.get('/reliefefforts/:id', function(req, res, next) {
    const reliefEffortID = req.params.id
    console.log("relief id is: ", reliefEffortID)
    // res.status(200).send({
    //   "reliefEffortID": reliefEffortID
    // })

    dal.getReliefEffort(reliefEffortID, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.append('Content-type', 'application/json');
            res.send(data);
        }
    })
})
app.get('/persons/:id', function(req, res, next) {
    const personID = req.params.id
    console.log("person id is: ", personID)
    // res.status(200).send({
    //   "personID": personID
    // })

    dal.getPerson(personID, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.append('Content-type', 'application/json');
            res.send(data);
        }
    })
})

app.get('*', function(req, res) {
    var body = '<h1>404 - Page Not Found</h1>'
    body += '<ul>'
    body += '<li>METHOD: ' + req.method + '</li>'
    body += '<li>PATH: ' + req.path + '</li>'
    body += '<li>QUERY: ' + JSON.stringify(req.query, null, 2) + '</li>'
    body += '</ul>'
    res.send(body)
})

/////////////////////////////////////////////////////////////////
///// POST FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////

app.post('/persons', function(req, res, next) {
    console.log(req.body)
    // create user in req.body
    dal.createPerson(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.send(data)
        }
    })
})

app.post('/reliefefforts', function(req, res, next) {
    console.log(req.body)
    // create user in req.body
    dal.createReliefEffort(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.send(data)
        }
    })
})

/////////////////////////////////////////////////////////////////
///// PUT FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////

app.put('/person/:id', function(req, res, next) {
    dal.getPerson(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.updatePerson(req.body, function callback(updatederror, updateddata) {
                console.log('req.body', req.body)
                console.log('updated data', updateddata)
                if (updatederror) {
                    var responseError = BuildResponseError(err)
                    //console.log("Error calling dal.getReliefEffort", err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updateddata) {
                    console.log("DELETE " + req.path, updateddata)
                    res.append('Content-type', 'application/json')
                    res.status(200).send(updateddata)
                }
            })
        }
    })
})

app.put('/reliefefforts/:id', function(req, res, next) {
    dal.getReliefEffort(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.updateReliefEffort(req.body, function callback(updatederror, updateddata) {
                if (updatederror) {
                    var responseError = BuildResponseError(err)
                    //console.log("Error calling dal.getReliefEffort", err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updateddata) {
                    console.log("DELETE " + req.path, updateddata)
                    res.append('Content-type', 'application/json')
                    res.status(200).send(updateddata)
                }
            })
        }
    })
})

/////////////////////////////////////////////////////////////////
///// DELETE FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////

app.delete('/reliefefforts/:id', function(req, res, next) {
    const reliefID = req.params.id;
    // res.status(200).send({
    //   "personID": personID
    // })
    dal.getReliefEffort(reliefID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data)
            dal.deleteReliefEffort(data, function callback(deletederror, deleteddata) {
                if (deletederror) {
                    var responseError = BuildResponseError(err)
                    //console.log("Error calling dal.getReliefEffort", err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (deleteddata) {
                    console.log("DELETE " + req.path, deleteddata)
                    res.append('Content-type', 'application/json')
                    res.status(200).send(deleteddata)
                }
            })
    })
})

app.delete('/persons/:id', function(req, res, next) {
    const personID = req.params.id;
    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.deletePerson(data, function callback(err, deleteddata) {
                if (err) {
                    var responseError = BuildResponseError(err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (deleteddata) {
                    res.append('Content-type', 'application/json')
                    res.status(200).send(deleteddata)
                }
            })
        }
    })
})

/////////////////////////////////////////////////////////////////
///// ERROR FUNCTIONS  ///////////////
/////////////////////////////////////////////////////////////////

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500)
    res.send(err.message)
})

app.get('/bad', function(req, res, next) {
    var firstErr = new HTTPError(500, 'error', {m: "Please try another route"}) //can add extra info for dev
    return next(firstErr)
})

app.listen(4000, function() {
    console.log('This is happening on your 4000 port, Andre.')
})
