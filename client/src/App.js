import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import Guest from './components/Guest';
import UserSetup from './components/UserSetup';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }
    updateUserData = (userData) => {
        this.setState({ isLoggedIn: userData });
    }
    render() {
        const { isLoggedIn } = this.state;
        const noAvatarData = () => {
            return JSON.stringify(isLoggedIn.avatar) === '{}';
        }
        const firstTime = (isLoggedIn && noAvatarData());
        const app = () => {
            if (!isLoggedIn) return <Guest enableGameWindow={(userData) => this.updateUserData(userData)} />;
            if (firstTime) return <UserSetup updateUserData={(userData) => this.updateUserData(userData)} userData={isLoggedIn} />;
            return <Game userData={isLoggedIn} />
        }
        return (
            <div className="App">
                {app()}
            </div>
        )
    }
}

export default App;