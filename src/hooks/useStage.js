import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);

        const updateStage = prevStage => {
            // cell들을 map으로 테트리스 틀 생성
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // 테트리스 블록 생성, 기능
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // 블록을 채울 시 줄을 없애는지 확인
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            return newStage;
        };

        // 상태 값들
        setStage(prev => updateStage(prev));
    }, [
        player.collided,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
    ]);

    return [stage, setStage, rowsCleared];
};