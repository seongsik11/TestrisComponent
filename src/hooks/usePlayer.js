import {useState} from "react";

import {randomTetromino} from "../tetrominos";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false
    });

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (pre)}
        }))
    }

    return [player];
}