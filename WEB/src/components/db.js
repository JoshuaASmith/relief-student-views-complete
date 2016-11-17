const React = require('react')
const xhr = require('xhr')
const url = 'http://localhost:4000/persons'
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

const Db = Component => React.createClass({
    render() {
        return (<Component {...this.props} db={db}/>)
    }
})

module.exports = Db
