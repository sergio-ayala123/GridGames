import React, { useState} from 'react';
import './golCell.css'

class GolCellBox {
    xValue: number;
    yValue: number;
    isAlive: boolean;
    constructor(x: number, y: number, z: boolean) {
        this.xValue = x;
        this.yValue = y;
        this.isAlive = z;
    }
}


const GolCell: React.FC<{ row: number, col: number, status: boolean; makeAlive: (x: number, y: number) => void }> = (props) => {


    const [clicked, setClicked] = useState(false);

    const cellClicked = () => {
        localStorage.setItem('clicked', 'true')
    }

    const mouseEnter = () => {
        if (localStorage.getItem('clicked') == 'true') {

            props.makeAlive(props.row, props.col)
        }
    }
    const mouseUp = () => {
        localStorage.setItem('clicked', 'false')
    }

    return (
        <>
            <button className={`cell ${props.status ? 'alive' : 'btn btn-outline-light'}`} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp = {mouseUp}></button>
        </>
    )
}

export { GolCellBox }
export default GolCell

