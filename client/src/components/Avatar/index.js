import React, { Component } from 'react';

class Body extends Component {
    render() {
        if (this.props.orientation === 'e' || this.props.orientation === 'w') return (
            <svg viewbox="0 0 42 63">
                <path style={{ fill: this.props.color }} d="M11.4,36.8c-0.1-2.3,0-3.9,0-4.4c0.1-3.4,0.2-5.1,0.7-6.9c1-3.4,2.9-5.2,3.6-5.6c0.9-0.5,1.9-0.8,1.9-0.8
                    s0.2,0,0.4-0.1c8.9-1.4,11.3,3.2,11.3,3.2c1.6,3,1.6,7.4,1.6,7.6c0.1,2.2-0.2,3.4,0,6.4c0.1,1.3-0.6,11.4-0.7,12.4
                    c-0.2,1.8-0.4,4.4-1.7,5.9c-0.7,0.8-1.3,1.3-1.3,1.3c-1.3,0.9-1.6,0.7-2.2,1.3c-1.3,1.2-0.3,2.9-1.6,3.8c-0.5,0.4-1.2,0.5-1.8,0.3
                    c-0.8-0.3-1.1-1.1-1.3-1.5c-0.2-0.5-0.2-0.7-0.5-1.5c-0.2-0.5-0.3-0.8-0.5-1c-0.7-0.9-1.8-0.4-3-1c-0.8-0.4-1.1-1-1.8-2.3
                    c-0.8-1.3-1.1-2.6-1.4-3.9c-0.2-0.7-0.3-1.2-0.3-1.4C11.6,43.2,11.4,36.8,11.4,36.8z"/>
            </svg>
        )
        return (
            <svg viewBox="0 0 42 63">
                <path style={{ fill: this.props.color }} d="M36.8,36.2c0.2,1.3,0.1,2.3,0.8,2.9c0.9,0.8,1.7,1.8,2.3,2.8c0.9,1.4,0.9,3,0.5,4.6c-0.3,1.3-2.1,2.1-3.8,1.7
                    c-0.7-0.2-0.8-0.6-1,0.4c-0.3,2.2-1.3,4.2-2.8,5.9c-0.7,0.8-1.1,1.5-1,2.6c0,0.3-0.2,1.3-0.5,2.2c-0.2,0.5-0.5,1.2-1.1,1.7
                    c-1.4,1.1-4.2,0.6-5-0.7c-0.2-0.4-0.8-1.8-0.9-2.7c-0.1-0.6-0.4-0.7-0.9-0.7c-0.8,0-1.6,0-2.5,0c-0.6,0-1.4-0.2-1.8,0.1
                    c-0.3,0.3-0.1,1.2-0.3,1.7c-0.5,1.8-2.4,2.8-4.3,2.5c-1.6-0.3-2.8-1.6-2.8-3.5c0.1-1.6-0.2-2.8-1.5-3.8S8.4,51.4,7.9,50
                    c-0.2-0.5-0.4-0.9-0.5-1.4c-0.2-0.6-0.6-0.7-1-0.3c-0.2,0.2-0.6,0.3-0.9,0.5c-0.7,0.5-2.8-0.2-3.7-1.6c-1.1-2,0.1-5.4,1.7-6.9
                    c0.3-0.3,1-1.1,1.7-2.3c0.2-0.3,0.3-0.8,0.3-1.2c0-1.5-0.1-2.9,0-4.4c0.2-3.4,1-6.6,1.1-6.9c1.6-3.4,4.7-5.2,5.8-5.6
                    c1.4-0.5,3-0.8,3-0.8s0.3,0,0.7-0.1c14.4-1.4,18.2,3.2,18.2,3.2c2.5,3,2.5,7.4,2.5,7.6C36.9,32,36.4,33.2,36.8,36.2z"/>
            </svg>
        )
    }
}

class Eyes extends Component {
    render() {
        if (this.props.orientation !== 's') return null;
        switch(this.props.id) {
            case 'eyes1': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <circle cx="14.3" cy="35.1" r="5"/>
                        <circle style={{ fill: '#fff' }} cx="15.2" cy="34.2" r="2.3"/>
                        <circle style={{ fill: '#fff' }} cx="12.9" cy="37.5" r="0.7"/>
                        <circle cx="28.8" cy="35.1" r="5"/>
                        <circle style={{ fill: '#fff' }} cx="29.7" cy="34.2" r="2.3"/>
                        <circle style={{ fill: '#fff' }} cx="27.4" cy="37.5" r="0.7"/>
                    </svg>
                )
            }
            case 'eyes2': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <circle cx="15" cy="35.1" r="4"/>
                        <circle style={{ fill: '#fff' }} cx="15.9" cy="34.2" r="1.5"/>
                        <circle cx="28.5" cy="35.1" r="4"/>
                        <circle style={{ fill: '#fff' }} cx="29.4" cy="34.2" r="1.5"/>
                    </svg>
                )
            }
            case 'eyes3': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <ellipse cx="14.3" cy="35.1" rx="4" ry="5"/>
                        <circle style={{ fill: '#fff' }} cx="15.2" cy="34.2" r="1"/>
                        <ellipse cx="28.5" cy="35.1" rx="4" ry="5"/>
                        <circle style={{ fill: '#fff' }} cx="29.4" cy="34.2" r="1"/>
                        {/*<path d="M 15 14 C 13 13.5, 11 13.5, 10 13" stroke="#000" fill="transparent"/>*/}
                    </svg>
                )
            }
            case 'eyes4': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <circle style={{ fill: '#fff' }} cx="21.3" cy="34.6" r="5"/>
                        <circle cx="21.3" cy="34.6" r="3"/>
                        <circle style={{ fill: '#fff' }} cx="21.8" cy="34" r="1"/>
                    </svg>
                )
            }
        }
    }
}

class Mouth extends Component {
    render() {
        if (this.props.orientation !== 's') return null;
        switch(this.props.id) {
            case 'mouth1': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <path d="M 18 42 C 19 46, 24 46, 25 42" stroke="#000" fill="transparent"/>
                    </svg>
                )
            }
            case 'mouth2': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <path style={{ fill: '#000' }} d="M 18 42 C 19 46, 24 46, 25 42"/>
                        <rect style={{ fill: '#fff' }} x="20.5" y="42" width="2" height="1.5"/>
                    </svg>
                )
            }
            case 'mouth3': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <path style={{ fill: '#000', opacity: '0.2' }} d="M 18.5 45 C 15.5 45, 15.5 41, 18.5 41 L 24.5 41 C 27.5 41, 27.5 45, 24.5 45 L 18.5 45 "/>
                        <path style={{ fill: '#fff', opacity: '0.5' }} d="M 20.5 43 C 19.5 43, 19.5 42, 20.5 42 L 22.5 42 C 23.5 42, 23.5 43, 22.5 43 L 20.5 43"/>
                        <path style={{ fill: '#000', opacity: '0.2' }} d="M 18.5 49 C 15.5 49, 15.5 45, 18.5 45 L 24.5 45 C 27.5 45, 27.5 49, 24.5 49 L 18.5 49 "/>
                        <path style={{ fill: '#fff', opacity: '0.5' }} d="M 20.5 47 C 19.5 47, 19.5 46, 20.5 46 L 22.5 46 C 23.5 46, 23.5 47, 22.5 47 L 20.5 47"/>
                    </svg>
                )
            }
        }
    }
}

class FaceAccessory extends Component {
    render() {
        if (this.props.orientation !== 's') return null;
        switch (this.props.id) {
            case 'fa1': {
                return (
                    <svg viewBox="0 0 42 63" className="bodyLayer">
                        <ellipse style={{ fill: '#FF5C9F', opacity: '0.5' }} cx="11" cy="42.5" rx="3" ry="2"/>
                        <ellipse style={{ fill: '#FF5C9F', opacity: '0.5' }} cx="32" cy="42.5" rx="3" ry="2"/>
                    </svg>
                )
            }
        }
    }
}

export { Body, Eyes, Mouth, FaceAccessory }