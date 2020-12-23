import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import Scene from './components/Scene';
import Guest from './components/Guest';
import UserSetup from './components/UserSetup';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }
    updateUserData = (user) => {
        this.setState({ isLoggedIn: user });
    }
    render() {
        const { isLoggedIn } = this.state;
        const noAvatarData = () => {
            if (!isLoggedIn.avatar) return true;
            if (JSON.stringify(isLoggedIn.avatar) === '{}') return true;
        }
        const firstTime = (isLoggedIn && noAvatarData());
        const app = () => {
            return (
                <Scene />
            )
            if (!isLoggedIn) return <Guest enableGameWindow={this.updateUserData} />;
            if (firstTime) return <UserSetup updateUserData={this.updateUserData} user={isLoggedIn} />;
            return <Game user={isLoggedIn} /> // */
        }
        return (
            <div className="App">
                {app()}
            </div>
        )
    }
}

export default App;