const React = require('react')

const Persons = React.createClass({
    componentDidMount() {
        this.props.db.all((err, response, body) => {
            if (err)
                return console.log(err.message)
            console.log(body)
        })
    },
    render() {
        return (
            <div>
                <h3 className="content-center mt5 pl4 mh5 pt4 fw2">Persons</h3>
                <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                    <li className="ph3 pv2 bb b--light-silver">Person1</li>
                </ul>
            </div>
        )
    }
})

module.exports = Persons
