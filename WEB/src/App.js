const React = require('react')
const ResourceForm = require('./pages/resources/form')

const App = React.createClass({
    render() {
        return (
            <div className="avenir pa1 justify-center">
                <div>
                    <header className="bg-black-90 fixed w-100 ph5-l dib white">
                        <nav className="f6 fw6 ttu">
                            <h2 className="fw2 dib pa1 mr7 ml4">Relief Tracker</h2>
                            <a className="ml7 mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="#" title="Home">Home</a>
                            <a className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="#" title="Add">Add</a>
                            <a className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="#" title="Update">Update</a>
                            <a className="mr4 link tr f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="#" title="List">List</a>
                        </nav>
                    </header>
                </div>
                <div>
                    <h1 className="content-center mt5 pl4 mh5 pt4">Add Person</h1>
                    < ResourceForm/>
                </div>
            </div>
        )
    }
})

module.exports = App
