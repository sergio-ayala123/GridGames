import { useEffect, useState } from "react";

const Options: React.FC<{ sendValues: (rows: number, columns: number, speed: number, obstacles: number, diagonalNeighbors: boolean) => void, showResetButton: boolean, resetBoard: () => void}> = (props) => {


    const [obstaclePercentage, setObstaclePercentage] = useState<number>(50)
    const [executionSpeed, setExecutionSpeed] = useState<number>(1)
    const [rows, setRows] = useState<number>(30);
    const [columns, setColumns] = useState<number>(30);
    const [diagonalNeighbors, setDiagonalNeighbors] = useState<boolean>(false)
    const [reset, setReset] = useState<boolean>(false)

    useEffect(() => {

        const passToParent = (rows: number, columns: number, speed: number, obstacles: number, diagonalNeighbors: boolean) => {
            props.sendValues(rows, columns, speed, obstacles, diagonalNeighbors)
        };



        passToParent(rows, columns, executionSpeed, obstaclePercentage, diagonalNeighbors)

    }, [obstaclePercentage, executionSpeed, rows, columns, diagonalNeighbors, props])

    const resetBoard = () => {
        props.resetBoard()
    }
    return (
        <>{props.showResetButton? 
            <div style={{ border: "solid cyan thin", borderRadius: "20px", padding: "5em", backgroundColor: "#1A0933"}}>
            <button style={{height:"60px", width:"90px"}} onClick = {() => resetBoard()}>Reset </button>
            </div>
            :

            <div style={{ border: "solid cyan thin", borderRadius: "20px", padding: "5em", backgroundColor: "#1A0933" }}>
                <div>
                    <h1>Customize</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div className="form-group">
                        <label className="form-label mt-4">Row</label>
                        <input className="form-control" placeholder="Enter Row" type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Column</label>
                        <input className="form-control" placeholder="Enter Col" type="number" value={columns} onChange={(e) => setColumns(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Execution Speed in Milliseconds</label>
                        <input className="form-control" placeholder="Speed" type="number" value={executionSpeed} onChange={(e) => setExecutionSpeed(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Obstacle Percentage</label>
                        <input className="form-control" placeholder="number" min="0" max="100" value={obstaclePercentage} type="number" onChange={(e) => {
                            if (Number(e.target.value) < 0) {

                                setObstaclePercentage(0)
                            }
                            else if (Number(e.target.value) > 100) {
                                setObstaclePercentage(10 * 10)
                            }
                            else {
                                setObstaclePercentage(Number(e.target.value))
                            }
                        }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
                        <label className="form-label mt-4">Diagonal Neighbors?</label>
                        <input type="checkbox" style={{ height: '30px', width: '30px' }} checked = {diagonalNeighbors} onChange={(e) => setDiagonalNeighbors(!diagonalNeighbors)} />
                    </div>
                </div>
                <br />
            </div>
        }
        </>
    );
}

export default Options;