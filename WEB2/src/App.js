const React = require('react')
const {BrowserRouter, Match, Link} = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const PersonsForm = require('./pages/persons/form')
const ShowPerson = require('./pages/persons/show')
const ListPersons = require('./pages/persons/')

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div className="pa2 db">
                    <Link className="pr3" to="/">Home</Link>
                    <Link className="pr3" to="/about">About</Link>
                    <Link className="pr3" to="/new">Add Person</Link>
                    <Link className="pr3" to="/show">Show Person</Link>
                    <Link className="pr3" to="/list">List Persons</Link>
                    <Match exactly pattern="/" component={Home}/>
                    <Match pattern="/about" component={About}/>
                    <Match pattern="/new" component={PersonsForm}/>
                    <Match pattern="/show" component={ShowPerson}/>
                    <Match pattern="/list" component={ListPersons}/>
                </div>
            </BrowserRouter>
        )
    }
})

module.exports = App
