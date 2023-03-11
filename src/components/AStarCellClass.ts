export class AStarCellClass{
    xValue: number;
    yValue: number;
    isPath: boolean;
    visited: boolean;
    isWall: boolean;
    fullyExplored: boolean;
    hCost: number;
    gCost:number;
    fCost: number;
    parent?: AStarCellClass;
    constructor(x: number, y: number, isPath: boolean, visited: boolean, isWall: boolean,fullyExplored: boolean, hCost: number, gCost: number){
        this.xValue = x;
        this.yValue = y;
        this.isPath = isPath;
        this.visited = visited;
        this.isWall = isWall;
        this.fullyExplored = fullyExplored;
        this.hCost = hCost;
        this.gCost = gCost;
        this.fCost = hCost + gCost
    }

}