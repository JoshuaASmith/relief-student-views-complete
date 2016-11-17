const React = require('react')
const xhr = require('xhr')

const PersonForm = React.createClass({
    getInitialState() {
        return {
            error: '',
            result: {},
            person: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                //_id: new Date().toISOString(),
                //type: 'person',
                //active: true
            }
        }
    },
    postResults(person) {
        xhr.post('http://localhost:4000/persons', {
            json: person
        }, (e, r, b) => {
            if (e)
                return console.log(e)
            this.setState({person: b})
        })
    },
    handleChange(field) {
        return e => {
            let person = this.state.person
            person[field] = e.target.value
            this.setState({person})
        }
    },
    handleSubmit(e) {
        e.preventDefault()
        // db.put(this.state.person, (err, result) => {
        //     if (err)
        //         return this.setState({error: err.message})
        //     this.setState({result: result})
        // })
        this.postResults(this.state.person)
        // xhr({
        //     METHOD: 'POST',
        //     json: true,
        //     url: 'http://localhost:4000/persons/'
        // }, (err, res, body) => {
        //     console.log(body)
        //     if (err)
        //         console.log(err.message)
        //     this.setState({body: body})
        // })
        alert('working')
        console.log('This is the person at the end of xhr', this.state.person)
    },

    render() {
        return (
            <div className="pa4 avenir">
                <h1 className="content-center mt5 pl4 mh5 pt4">Add Person</h1>
                <form className="pa2" onSubmit={this.handleSubmit}>
                    <div className="pb3">
                        <label className="db fw4 lh-copy f6">First Name:</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" placeholder="First Name" onChange={this.handleChange('firstName')} value={this.state.person.firstName}/>
                    </div>
                    <div className="pb3">
                        <label className="db fw4 lh-copy f6">Last Name</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" placeholder="Last Name" onChange={this.handleChange('lastName')} value={this.state.person.lastName}/>
                    </div>
                    <div className="pb3">
                        <label className="db fw4 lh-copy f6">Phone Number</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" placeholder="(555)-555-5555" onChange={this.handleChange('phone')} value={this.state.person.phone}/>
                    </div>
                    <div className="pb3">
                        <label className="db fw4 lh-copy f6">Email Address</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" placeholder="input@example.com" onChange={this.handleChange('email')} value={this.state.person.email}/>
                    </div>
                    <div className="pa2">
                        <button className="pt2 f6 link dim br-pill ph3 pv2 mb2 dib light-silver bg-black mh5">Add Person</button>
                    </div>
                </form>
                <hr className="mb5"/>

                <div className="pa2 pl3 ba w-100 measure">
                    <h5>Result:</h5>
                    <pre>{JSON.stringify(this.state.person, null, 2)}</pre>
                    {this.setState.error}
                    <pre>{JSON.stringify(this.setState.person, null, 2)}</pre>
                </div>
            </div>
        )
    }
})

module.exports = PersonForm
