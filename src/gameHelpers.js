export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
       Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {

            // 1. 테트리스 블록이 셀에 있는지 확인한다.
            if (player.tetromino[y][x] !== 0) {
                if (
                // 2. 이동할 때 게임 영역 높이(y) 내에 있는지 확인
                // 플레이 영역의 바닥을 통과하지 않게 한다.
                    !stage[y + player.pos.y + moveY] ||
                // 3. 이동할 때 게임 영역 너비(x) 내에 있는지 확인
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                // 4. 이동할 셀이 clear로 설정되어 있지 않은지 확인
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
    // 5. 위의 조건이 것이 거짓이면 false 반환
    return false;
};