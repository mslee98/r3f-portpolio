import React from 'react';
import keyboardData from '../keyboardData.json';
import KeyCap from './KeyCap';

const KeyCaps = () => {
    return (
        <>
            {Object.entries(keyboardData.keyPosition).map(([key, {position, capModel, row}]) => (
                <KeyCap
                    keyName={key}
                    position={position}
                    capModel={capModel}
                    row={row}
                />
            ))}
        </>
    );
};

export default KeyCaps;