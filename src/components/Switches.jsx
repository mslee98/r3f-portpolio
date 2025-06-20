import React, { useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import Switch from './Switch';  
import keyboardData from '../keyboardData.json';

const Switches = () => {
    const [pressedKey, setPressedKey] = useState(null);

    // 키보드 데이터에서 키 위치 정보 추출
    const { keyPosition } = keyboardData;

    // 모든 키를 배열로 변환
    const allKeys = useMemo(() => {
        return Object.entries(keyPosition).map(([keyName, keyData]) => ({
            name: keyName,
            position: [keyData.position.x, keyData.position.y, keyData.position.z],
            capModel: keyData.capModel,
            row: keyData.row,
            isBump: keyData.isBump
        }));
    }, [keyPosition]);

    // 키 매핑 함수
    const mapKeyToKeyboardKey = (key) => {
        const keyMapping = {
            'Escape': 'Escape',
            'Backspace': 'Backspace',
            'Tab': 'Tab',
            'CapsLock': 'CapsLock',
            'Enter': 'Enter',
            'Shift': 'ShiftLeft',
            'Control': 'ControlLeft',
            'Meta': 'MetaLeft',
            'Alt': 'AltLeft',
            ' ': 'Space',
            'ArrowLeft': 'ArrowLeft',
            'ArrowUp': 'ArrowUp',
            'ArrowRight': 'ArrowRight',
            'ArrowDown': 'ArrowDown',
            'Delete': 'Delete',
            'Home': 'Home',
            'PageUp': 'PageUp',
            'PageDown': 'PageDown',
            '`': 'Backquote',
            '\\': 'Backslash',
            '[': 'BracketLeft',
            ']': 'BracketRight',
            ',': 'Comma',
            '.': 'Period',
            '/': 'Slash',
            ';': 'Semicolon',
            "'": 'Quote',
            '-': 'Minus',
            '=': 'Equal',
            '1': 'Digit1',
            '2': 'Digit2',
            '3': 'Digit3',
            '4': 'Digit4',
            '5': 'Digit5',
            '6': 'Digit6',
            '7': 'Digit7',
            '8': 'Digit8',
            '9': 'Digit9',
            '0': 'Digit0',
            'a': 'KeyA',
            'b': 'KeyB',
            'c': 'KeyC',
            'd': 'KeyD',
            'e': 'KeyE',
            'f': 'KeyF',
            'g': 'KeyG',
            'h': 'KeyH',
            'i': 'KeyI',
            'j': 'KeyJ',
            'k': 'KeyK',
            'l': 'KeyL',
            'm': 'KeyM',
            'n': 'KeyN',
            'o': 'KeyO',
            'p': 'KeyP',
            'q': 'KeyQ',
            'r': 'KeyR',
            's': 'KeyS',
            't': 'KeyT',
            'u': 'KeyU',
            'v': 'KeyV',
            'w': 'KeyW',
            'x': 'KeyX',
            'y': 'KeyY',
            'z': 'KeyZ'
        };
        return keyMapping[key] || key;
    };

    // 키보드 이벤트 리스너
    useEffect(() => {
        const handleKeyDown = (e) => {
            const mappedKey = mapKeyToKeyboardKey(e.key);
            setPressedKey(mappedKey);
        };
        
        const handleKeyUp = (e) => {
            setPressedKey(null);
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <group>
            {allKeys.map((key, index) => (
                <React.Fragment key={index}>
                    {/* <KeyCap 
                        capModel={key.capModel} 
                        position={key.position}
                        isPressed={pressedKey === key.name}
                    /> */}
                    <Switch
                        key={key.name}
                        position={key.position}
                        isPressed={pressedKey === key.name}
                        capModel={key.capModel}
                    />
                </React.Fragment>
                
            ))}
        </group>
    );
};


const KeyCap = ({ capModel, position }) => {
    const { scene } = useGLTF('/assets/models/Keycaps.glb');

    const uniqueScene = useMemo(() => {

        const original = scene.getObjectByName(capModel);

        return original?.clone(true);

    }, [scene, capModel]);

    if (!uniqueScene) return null;

    return (
    
        <primitive object={uniqueScene} position={[position[0], position[1] + 0.5, position[2]]}/>
        
    );
};

export default Switches;