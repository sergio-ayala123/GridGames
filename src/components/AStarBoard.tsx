import React from "react";
import { FormEvent, useEffect, useState } from "react";
import AStarCell from "./AStarCell";
import { AStarCellClass } from "./AStarCellClass";
import DraggableContainer from "./DraggableOptions";
import NavBar from "./NavBar";




let matrix: AStarCellClass[][];
matrix = []
for (let i = 0; i < 30; i++) {

    matrix[i] = []
    for (let j = 0; j < 30; j++) {
        matrix[i][j] = new AStarCellClass(i, j, false, false, false, false, 0, 0)

    }
}

const AStarBoard = () => {

    const rowdir = [-1, 1, 0, 0, -1, -1, 1, 1]
    const coldir = [0, 0, 1, -1, -1, 1, -1, 1]

    const [updatedMatrix, setMatrix] = useState<AStarCellClass[][]>(matrix);
    const [openList, setOpenList] = useState<AStarCellClass[]>([])
    const [closedList, setClosedList] = useState<AStarCellClass[]>([])
    const [rows, setRows] = useState<number>(30);
    const [columns, setColumns] = useState<number>(30);
    const [start, setStart] = useState<AStarCellClass>(new AStarCellClass(0, 0, false, false, false, false, 0, 0))
    const [end, setEnd] = useState<AStarCellClass>(new AStarCellClass(0, 0, false, false, false, false, 0, 0))
    const [executionSpeed, setExecutionSpeed] = useState<number>(1)
    const [startAndEnd, setStartAndEnd] = useState<number>(0)
    const [obstaclePercentage, setObstaclePercentage] = useState<number>(50)
    const [diagonalNeighbors, setDiagonalNeighbors] = useState<boolean>(false)

    const findPathAStar = async () => {

        current = start
        openList.push(current)
        var path: AStarCellClass[] = []
        let newMatrix = [...matrix]

        while (openList.length > 0 || current !== end) {
            var current = findMinFCost(openList)

            if (current.xValue === end.xValue && current.yValue == end.yValue) {
                break;

            }

            var cellToRemove = openList.indexOf(current)
            if (cellToRemove !== -1) {
                openList.splice(cellToRemove, 1)
            }
            current.fullyExplored = true
            closedList.push(current)


            var neighbors = await checkNeighbors(current, executionSpeed)
            neighbors.forEach(neighbor => {
                if (!neighbor.isWall && !closedList.includes(neighbor)) {
                    var tempGScore = current.gCost + 2
                    var newPath = false
                    if (openList.includes(neighbor)) {

                        if (tempGScore < neighbor.gCost) {
                            neighbor.gCost = tempGScore
                            newPath = true


                            if (!openList.includes(neighbor)) {
                                openList.push(neighbor)
                            }

                        }
                    }
                    else {
                        neighbor.gCost = tempGScore;
                        newPath = true;
                        openList.push(neighbor)
                    }

                    if (newPath) {
                        neighbor.hCost = calculateHCost(neighbor, end)
                        neighbor.fCost = neighbor.gCost + neighbor.hCost
                        neighbor.parent = current
                    }


                }

                path.forEach((item: AStarCellClass) => {
                    newMatrix[item.xValue][item.yValue].isPath = false

                    setMatrix(newMatrix)


                });

                path.length = 0;

                var temp = current;
                while (temp.parent) {
                    path.push(temp.parent)
                    temp = temp.parent
                }

                path.forEach((item: AStarCellClass) => {
                    newMatrix[item.xValue][item.yValue].isPath = true
                    setMatrix(newMatrix)
                });


            });

        }
        var temp = current;
        while (temp.parent) {
            path.push(temp.parent)
            temp = temp.parent
        }
        path.forEach((item: AStarCellClass) => {
            newMatrix[item.xValue][item.yValue].isPath = true
            setMatrix(newMatrix)
        });
        console.log("Done")


    }

    const findMinFCost = (neighbors: AStarCellClass[]) => {
        var minFCost = neighbors[0]

        for (let i = 1; i < neighbors.length; i++) {
            if (neighbors[i].fCost < minFCost.fCost) {
                minFCost = neighbors[i];
            }
        }
        return minFCost
    }

    const checkNeighbors = async (current: AStarCellClass, executionSpeed:number) => {

        var neighbors: AStarCellClass[] = []


        for (var i = 0; i < (diagonalNeighbors ? 8 : 4) ; i++) {

            var currentRow;
            var currentCol;
            currentRow = rowdir[i] + current.xValue
            currentCol = coldir[i] + current.yValue
            if (currentRow < 0 || currentCol < 0) continue;
            if (currentRow >= rows || currentCol >= columns) continue;
            if (updatedMatrix[currentRow][currentCol].isWall === true) continue;

            let newMatrix = [...matrix]
            newMatrix[currentRow][currentCol].visited = true;
            //calculateGCost(newMatrix[currentRow][currentCol], start)
            neighbors.push(newMatrix[currentRow][currentCol])
            setMatrix(newMatrix)
        }
        await new Promise(resolve => setTimeout(resolve, executionSpeed));
        return neighbors
    }
    const setWall = (x: number, y: number) => {

        let newArr = [...matrix]
        newArr[x][y].isWall = true;
        setMatrix(newArr)
    }
    const calculateGCost = (current: AStarCellClass, start: AStarCellClass) => {

        let newMatrix = [...matrix]

        var row = current.xValue;
        var col = current.yValue;

        var g = 0
        if (row !== start.xValue && col != start.yValue) {
            var height = row - start.xValue
            var length = col - start.yValue
            g = Number((Math.sqrt((height * height) + (length * length)) * 10).toFixed(0))
        }
        if (row === start.xValue) {
            g = Math.abs(col - start.yValue) * 10
        }
        if (col === start.yValue) {
            g = Math.abs(row - start.xValue) * 10
        }


        newMatrix[current.xValue][current.yValue].gCost = g;

        setMatrix(newMatrix)
        return g

    }
    const calculateHCost = (current: AStarCellClass, destination: AStarCellClass) => {

        let newMatrix = [...matrix]

        var row = current.xValue
        var col = current.yValue

        var h = 0

        var height = Math.abs(destination.xValue - row)
        var length = Math.abs(destination.yValue - col)
        h = Math.floor(Math.sqrt((height * height) + (length * length)) * 10)


        newMatrix[current.xValue][current.yValue].hCost = h;
        setMatrix(newMatrix)
        return h

    }
    useEffect(() => {
        matrix = []
        for (let i = 0; i < rows; i++) {

            matrix[i] = []
            for (let j = 0; j < columns; j++) {
                let randomNum = Math.floor(Math.random() * 100) + 1;
                if (100 - randomNum < obstaclePercentage) {
                    matrix[i][j] = new AStarCellClass(i, j, false, false, true, false, 0, 0)
                }
                else {

                    matrix[i][j] = new AStarCellClass(i, j, false, false, false, false, 0, 0)
                }
            }
        }
        setMatrix(matrix)
    }, [rows, columns, obstaclePercentage])

    const setExplored = (row: number, col: number) => {
        let newArr = [...matrix]
        if (startAndEnd === 0) {
            setStart(newArr[row][col])
        }

        else if (startAndEnd === 1) {
            setEnd(newArr[row][col])
        }

        setStartAndEnd(startAndEnd + 1)

        newArr[row][col].isPath = true
        setMatrix(matrix)



        if (newArr[row][col].isWall === false) {
        }
    }

    useEffect(() => {
        if (startAndEnd === 2) {
            findPathAStar()
        }
    }, [startAndEnd])


    const getValuesFromOptions = (rows: number, columns: number, speed: number, obstacles: number,diagonalNeighbors:boolean) => {
        setRows(rows)
        setColumns(columns)
        setExecutionSpeed(speed)
        setObstaclePercentage(obstacles)
        setDiagonalNeighbors(diagonalNeighbors)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
            <NavBar />

            <DraggableContainer sendValues={getValuesFromOptions}/>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(` + columns + `, 40px)`, gridTemplateRows: `repeat(` + rows + `, 40px)`, justifyContent: 'center' }} onMouseLeave={() => localStorage.setItem('clicked', 'false')}>
                {
                    updatedMatrix.map((i, index) => i.map((j, indexJ) => <AStarCell key={index + indexJ} row={index} col={indexJ}
                        visited={updatedMatrix[index][indexJ].visited}
                        isPath={updatedMatrix[index][indexJ].isPath}
                        isWall={updatedMatrix[index][indexJ].isWall}
                        fullyExplored={updatedMatrix[index][indexJ].fullyExplored}
                        explore={setExplored}
                        makeWall={setWall}
                    />))
                }

            </div>
        </div>
    );
}

export default AStarBoard;

