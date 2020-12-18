import React, { Component } from 'react';

class Guest extends Component {
    constructor() {
        super();
        this.updateView = this.updateView.bind(this);
        this.state = {
            view: 'login'
        }
    }
    updateView = (view) => {
        this.setState({ view: view });
    }
    render() {
        const { view } = this.state;
        const showForm = () => {
            if (view === 'login') return <Login {...this.props} updateView={this.updateView} />;
            else if (view === 'signup') return <Signup {...this.props} updateView={this.updateView} />;
        }
        return (
            <div className="Guest">
                {showForm()}
            </div>
        )
    }
}

class Login extends Component {
    handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const body = await response.json();
        if (!body) return console.log('server error'); //todo better all of this
        if (!body.success) return console.log('there was an error');
        const { user } = body;
        if (user) this.props.enableGameWindow(user);
    }
    render() {
        return (
            <div className="Login">
                <h1>Log In</h1>
                <form onSubmit={this.handleLogin} autoComplete="off">
                    <label htmlFor="username">Username:</label>
                    <input type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <input type="submit" />
                </form>
                Don't have an account? Click <button className="stealth link" onClick={() => this.props.updateView('signup')}>here</button> to sign up!
            </div>
        )
    }
}

class Signup extends Component {
    handleSignup = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const body = await response.json();
        if (!body) return console.log('server error'); //todo better all of this
        if (!body.success) return console.log('there was an error');
        const { accessToken: token, userData: user } = body;
        if (token) this.props.enableGameWindow(user);
    }
    render() {
        return (
            <div className="Signup">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSignup} autoComplete="off">
                    <label htmlFor="username">Username:</label>
                    <input type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <input type="submit" />
                </form>
                Already have an account? Click <button className="stealth link" onClick={() => this.props.updateView('login')}>here</button> to log in!
            </div>
        )
    }
}

export default Guest;