import { Box } from "@mui/material";
import { useState, useRef, FormEvent, useEffect } from "react";
import Cell, { CellBox } from "./Cell"
import NavBar from "./NavBar";

let matrix: CellBox[][];
matrix = []

for (let i = 0; i < 30; i++) {
    matrix[i] = []
    for (let j = 0; j < 30; j++) {
        matrix[i][j] = new CellBox(i, j, false, false, false)
    }
}
class Queue {
    items: any[];
    constructor(...params: any[]) {
        this.items = [...params]
    }
    enqueue(item: any) {
        this.items.push(item)
    }
    dequeue() {
        return this.items.shift();
    }
}


const Board = () => {
    const [Start, setStart] = useState<CellBox>(new CellBox(0, 0, false, false, false))
    const [End, setEnd] = useState<CellBox>(new CellBox(0, 0, false, false, false))
    const [showStart, setShowStart] = useState(false)
    const testQ = new Queue();
    const rowdir: number[] = [-1, 1, 0, 0]
    const coldir: number[] = [0, 0, 1, -1]
    const [updatedMatrix, setMatrix] = useState<CellBox[][]>(matrix);
    let shortestPath = new Map<CellBox, CellBox>();


    const startRow = useRef<HTMLInputElement>(null)
    const startCol = useRef<HTMLInputElement>(null)
    const endRow = useRef<HTMLInputElement>(null)
    const endCol = useRef<HTMLInputElement>(null)

    let i = 0


    testQ.enqueue(Start)
    function myLoop() {

        setTimeout(function () {
            let newarr = [...matrix]

            let current = testQ.dequeue()

            for (let x = 0; x < 4; x++) {
                let neighborX = current.xValue + rowdir[x]
                let neighborY = current.yValue + coldir[x]

                if (neighborX < 0 || neighborY < 0) continue;
                else if (neighborX >= 30 || neighborY >= 30) continue;
                else if (newarr[neighborX][neighborY].visited == true) continue;
                else if (newarr[neighborX][neighborY].isWall == true) continue;
                else {
                    shortestPath.set(newarr[neighborX][neighborY], current)
                    testQ.enqueue(newarr[neighborX][neighborY])
                    newarr[neighborX][neighborY].visited = true
                    setMatrix(newarr)
                }
            }

            i++;
            console.log('this is current: ', current)
            console.log('this is end: ', newarr[End.xValue][End.yValue])
            console.log('this is start: ', Start)

            if (current == newarr[End.xValue][End.yValue]) {

                findPath(shortestPath, newarr[End.xValue][End.yValue])
            }
            if (current != newarr[End.xValue][End.yValue]) {
                myLoop()

            }
            if (testQ.items.length == 0) {
                console.log('Out of items')
                findPath(shortestPath, End)
            }
        }, 5)
    }

    function findPath(path: Map<CellBox, CellBox>, end: CellBox) {

        let current = path.get(end)!

        console.log('current at top', current)
        setTimeout(function () {
            let newArr = [...matrix]

            current.isPath = true
            current = path.get(current)!
            newArr[current.xValue][current.yValue].isPath = true;
            console.log('new current', current)

            setMatrix(newArr)

            if (current != Start) {
                findPath(path, current)
            }
        }, 50)
    }

    const setWall = (x: number, y: number) => {

        let newArr = [...matrix]
        newArr[x][y].isWall = true;
        setMatrix(newArr)

    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault()
        setShowStart(true)

        let testS = new CellBox(1, 1, false, false, false)
        let testE = new CellBox(1, 1, false, false, false)

        testS.xValue = Number(startRow.current!.value)
        testS.yValue = Number(startCol.current!.value)
        testE.xValue = Number(endRow.current!.value)
        testE.yValue = Number(endCol.current!.value)
        setStart(testS)
        setEnd(testE)
        let newArr = [...matrix]
        newArr[testS.xValue][testS.yValue].isPath = true;

        newArr[testE.xValue][testE.yValue].isPath = true;

        setMatrix(newArr)
         


    }
    useEffect(() => {
        
        console.log('IN USE EFFECT')
        console.log('in useEffect Start:', Start)
        console.log('in useEffect Start:', End)
    }, []);


    return (
        <>
            <NavBar/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 40px)', gridTemplateRows: 'repeat(30,40px)', justifyContent: 'center' }}>
                {
                    updatedMatrix.map((i, index) => i.map((j, indexJ) => <Cell key={index + indexJ} row={index} col={indexJ} isWall={updatedMatrix[index][indexJ].isWall} isPath={updatedMatrix[index][indexJ].isPath} visited={updatedMatrix[index][indexJ].visited} makeWall={setWall} />))
                }
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showStart ? <button className="btn btn-primary" onClick={myLoop} style={{ fontSize: '40px' }} >Start</button> : <h1>Waiting for Start and End</h1>}
            </Box>
            {!showStart ?
                <form onSubmit={submitHandler}>
                    <fieldset>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>Start Cell</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div className="form-group">
                                <label className="form-label mt-4">Row</label>
                                <input ref={startRow} className="form-control" placeholder="Enter Row" />
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-4">Column</label>
                                <input ref={startCol} className="form-control" placeholder="Enter Col" />
                            </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>Destination Cell</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div className="form-group">
                                <label className="form-label mt-4">Row</label>
                                <input ref={endRow} className="form-control" placeholder="Enter Row" />
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-4">Column</label>
                                <input ref={endCol} className="form-control" placeholder="Enter Col" />
                            </div>
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="btn btn-primary" style={{ fontSize: '25px' }}>Submit</button>
                        </div>



                    </fieldset>
                </form> : <></>}
        </>
    );
}

export default Board;