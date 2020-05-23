import React from 'react';

class SignIn extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  onSubmitSignin = () => {

    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          this.props.login(data.error, data.token)
          this.props.history.push("/app")
        }
        this.props.loadUser(data.user)
      })
  }

  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
            </div>
            <div className="lh-copy mt3">
              <a href="/register" className="f6 link dim black db">Register</a>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default SignIn
