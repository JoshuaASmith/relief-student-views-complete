const React = require('react')
const {BrowserRouter, Link, Match} = require('react-router')
const PersonForm = require('./pages/persons/form')
const Persons = require('./pages/persons/')
const ShowPerson = require('./pages/persons/show')
const Db = require('./components/db')

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div className="avenir pa1 justify-center">
                    <div>
                        <header className="bg-black-90 fixed w-100 ph5-l dib white">
                            <nav className="f6 fw6 ttu">
                                <h2 className="fw2 dib pa1 mr7 ml4">Relief Tracker</h2>
                                <Link className="ml7 mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" title="Home">Home</Link>
                                <Link className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/persons/new" title="Add">Add</Link>
                                <Link className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" title="Update">Update</Link>
                                <Link className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/persons/show/:id" title="List">List</Link>
                            </nav>
                        </header>
                    </div>
                    <div>
                        <Match exactly pattern="/persons/new" component={PersonForm}/>
                        <Match exactly pattern="/persons" component={Db(Persons)}/>
                        <Match exactly pattern="/persons/show/:id" component={ShowPerson}/> {/* <Match exactly pattern="/reliefefforts/new" component={ReliefForm}/>
                        <Match exactly pattern="/reliefefforts" component={ReliefEfforts}/>
                        <Match exactly pattern="/reliefefforts/show/:id" component={ShowReliefEfforts}/> */}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
})

module.exports = App
