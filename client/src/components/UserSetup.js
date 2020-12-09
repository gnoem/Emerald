import React, { Component } from 'react';
import { Body, Eyes, Mouth, FaceAccessory } from './Avatar';

const possibleBodyColors = ['#FE8D4F', '#6CD769', '#66DFE7', '#A488F0', '#F697DA', '#8ABBFB', '#F58C9A', '#A6DB5E'];
const possibleFaceAccessories = ['fa1'];
const possibleEyes = ['eyes1', 'eyes2', 'eyes3', 'eyes4'];
const possibleMouths = ['mouth1', 'mouth2', 'mouth3'];
const possibleHeadAccessories = [''];

const randomlySelectFrom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

class UserSetup extends Component {
    constructor(props) {
        super(props);
        this.UserSetup = React.createRef();
        this.state = {
            preview: {
                bodyColor: randomlySelectFrom(possibleBodyColors),
                faceAccessory: randomlySelectFrom(possibleFaceAccessories),
                eyes: randomlySelectFrom(possibleEyes),
                mouth: randomlySelectFrom(possibleMouths),
                headAccessory: randomlySelectFrom(possibleHeadAccessories)
            }
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = this.state.preview;
        const response = await fetch('/edit/avatar', {
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const body = await response.json();
        if (!body) return console.log('server error');
        if (!body.success) return console.log('server is working but something went wrong');
        console.log('success! data was added');
        // response should return user
        this.props.updateUserData(body.user);
    }
    randomize = () => {
        this.setState({
            preview: {
                bodyColor: randomlySelectFrom(possibleBodyColors),
                faceAccessory: randomlySelectFrom(possibleFaceAccessories),
                eyes: randomlySelectFrom(possibleEyes),
                mouth: randomlySelectFrom(possibleMouths),
                headAccessory: randomlySelectFrom(possibleHeadAccessories)
            }
        });
    }
    updatePreview = (part, value) => {
        this.setState(prevState => ({
            preview: {...prevState.preview,
                [part]: value
            }
        }));
    }
    render() {
        const { bodyColor, eyes, mouth, faceAccessory } = this.state.preview;
        const bodyPreviews = () => {
            const array = [];
            possibleBodyColors.forEach(color => {
                array.push(
                    <div className="bodyPreview" onClick={() => this.updatePreview('bodyColor', color)}><Body color={color} /></div>
                );
            });
            return array;
        }
        const eyePreviews = () => {
            const array = [];
            possibleEyes.forEach(eyes => {
                array.push(
                    <div className="bodyPreview" onClick={() => this.updatePreview('eyes', eyes)}><Eyes id={eyes} /></div>
                );
            });
            return array;
        }
        const mouthPreviews = () => {
            const array = [];
            possibleMouths.forEach(mouth => {
                array.push(
                    <div className="bodyPreview" onClick={() => this.updatePreview('mouth', mouth)}><Mouth id={mouth} /></div>
                );
            });
            return array;
        }
        const faceAccessoryPreviews = () => {
            const array = [];
            possibleFaceAccessories.forEach(faceAccessory => {
                array.push(
                    <div className="bodyPreview" onClick={() => this.updatePreview('faceAccessory', faceAccessory)}><FaceAccessory id={faceAccessory} /></div>
                );
            });
            return array;
        }
        return (
            <div className="Canvas Setup" ref={this.UserSetup}>
                <div className="avatarPreview">
                    <Body color={bodyColor} />
                    <Eyes id={eyes} />
                    <Mouth id={mouth} />
                    <FaceAccessory id={faceAccessory} />
                    <button onClick={this.randomize}>Randomize</button>
                </div>
                <div className="avatarConfig">
                    <h1>Customize your avatar</h1>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="bodyPreviews">
                            <h2>Color</h2>
                            {bodyPreviews()}
                        </div>
                        <div className="eyePreviews">
                            <h2>Eyes</h2>
                            {eyePreviews()}
                        </div>
                        <div className="mouthPreviews">
                            <h2>Mouth/Nose</h2>
                            {mouthPreviews()}
                        </div>
                        <div className="faceAccessoryPreviews">
                            <h2>Face Accessories</h2>
                            {faceAccessoryPreviews()}
                        </div>
                        <input type="submit" value="Save Avatar" />
                    </form>
                </div>
            </div>
        )
    }
}

export default UserSetup;