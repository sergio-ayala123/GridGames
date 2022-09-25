import React from 'react';
import './Cell.css'


class CellBox {
    xValue: number;
    yValue: number;
    isWall: boolean;
    isPath: boolean;
    visited: boolean;
    constructor(x: number, y: number, isWall: boolean, isPath: boolean, visited: boolean) {
        this.xValue = x;
        this.yValue = y;
        this.isWall = isWall;
        this.isPath = isPath;
        this.visited = visited;
    }
    
}
const Cell: React.FC<{ row: number, col: number, isWall: boolean, isPath: boolean, visited: boolean, makeWall: (x: number, y: number) => void }> = (props) => {

    const cellClicked = () => {
        localStorage.setItem('clicked', 'true')
    }

    const mouseEnter = () => {
        if (localStorage.getItem('clicked') === 'true') {

            props.makeWall(props.row, props.col)
        }
    }
    const mouseUp = () => {
        localStorage.setItem('clicked', 'false')
    }

    return (
        <>


            { props.isPath ? (
                <button className={`cell ${props.isPath ? 'path' : ''}`} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}></button>
            ) :
            
            props.isWall ? (
                <button className={`cell ${props.isWall ? 'wall' : ''}`} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}></button>
            ) :
            props.visited ? (
                <button className={`cell ${props.visited ? 'visited' : ''}`} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}></button>
            ) : <button className='btn btn-outline-light'  onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}></button>}
        </>
    );
}

export { CellBox }
export default React.memo(Cell)