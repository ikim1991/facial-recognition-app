import React from 'react';

class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  onSubmit = () => {
    if(this.state.email.length > 0 && this.state.password.length >0){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          this.props.login(data.error)
          this.props.history.push("/app")
        }
        this.props.loadUser(data)
      })
    }
  }

  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="email-name" onChange={this.onNameChange}/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db" onClick={this.onSubmit} style={{cursor:'pointer'}}>Register</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register
