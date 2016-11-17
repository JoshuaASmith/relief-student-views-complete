const React = require('react')
const xhr = require('xhr')
const url = process.env.REACT_APP_DB

const db = {
    all(callback) {
        xhr.get(url, {
            json: true
        }, callback)
    },
    save(person, callback) {
        xhr.post(url, {
            json: person
        }, callback)
    }
}

const DB = React.createClass({
    render() {
        return (<Component {...this.props} db={db}/>)
    }
})

module.exports = DB
