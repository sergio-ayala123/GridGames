import React from 'react'
import './AStarCell.css'


const AStarCell: React.FC <{row:number, col:number, visited:boolean, isPath: boolean, isWall: boolean,fullyExplored: boolean, explore: (row:number, col:number)=>void, makeWall: (x: number, y: number) =>void }> = (props) => {

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


    const explore = () => {
        
        props.explore(props.row, props.col)
    }


    return ( 
        <>
           {props.isPath ? 
               (<div className="ispath" onClick={explore} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}>
               {/* <p>hCost: {props.hCost} </p>   
               <p>gCost: {props.gCost}</p>
               <p>fCost: {props.fCost}  </p> */}
               </div>
               ) : 
            props.visited && !props.fullyExplored? (
                <div className="visited" onClick={explore} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}>
                {/* <p>hCost: {props.hCost} </p>   
                <p>gCost: {props.gCost}</p>
                <p>fCost: {props.fCost}  </p> */}
                </div>   
            ):
            props.isWall? (

                <div className="wall" onClick={explore} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp} >
               {/* <p>hCost: {props.hCost} </p>   
               <p>gCost: {props.gCost}</p>
               <p>fCost: {props.fCost}  </p> */}
               </div> 
                ): 
            props.fullyExplored && !props.isPath? (
                <div className="explored" onClick={explore} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}>
               {/* <p>hCost: {props.hCost} </p>   
               <p>gCost: {props.gCost}</p>
               <p>fCost: {props.fCost}  </p> */}
               </div> 
            )
               : <div className="unexplored" onClick={explore} onMouseDown={cellClicked} onMouseOver={mouseEnter} onMouseUp={mouseUp}>
               {/* <p>hCost: {props.hCost} </p>   
               <p>gCost: {props.gCost}</p>
               <p>fCost: {props.fCost}  </p> */}
               </div> 
            }
        </>
     );
}
 
export default React.memo(AStarCell);