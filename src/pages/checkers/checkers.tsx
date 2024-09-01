import { ReactElement, useState } from "react"
import { NextPageWithLayout } from "../_app"
import Layout from "@/app/layout"
import { BLACK, RED } from "@/components/constants"

class Game {
    turn: number
    winner: number
    amtRedPieces: number
    amtBlackPieces: number

    constructor(){
        this.amtBlackPieces = this.amtRedPieces = 12
        this.winner = 0
        this.turn = 0
    }
}
class Piece {
    color: string
    isKing: boolean
    direction: number
    pieceType: number
    position: number[]
    moves: any[]

    constructor(color: string, position: number[]){
        this.color = color
        this.isKing = false
        this.position = position
        this.direction = color == RED ? -1 : 1
        this.pieceType = color == RED ? 1 : 2
        this.moves = []
    }

    traverseLeft(hloc: number, vloc : number, jumps:any[], GameState:number[][]): number{
        if (!(hloc - 1 < 0)){
            var leftMove = [hloc - 1, vloc + 1*this.direction]
            var valueLeftMove = GameState[leftMove[1]][leftMove[0]]
            
            if (valueLeftMove == 0){
                this.moves = this.moves.concat({
                    "nextPos": GetPos4rmCoord(leftMove),
                    "jumps": [],
                })
                return 0
            }
            
            if (valueLeftMove > 0 && valueLeftMove != this.pieceType && valueLeftMove != this.pieceType + 2){
                if (!(hloc - 2 < 0)){ //TODO: check the vertical boundaries
                    var nextLeftMove = [hloc - 2, vloc + 2*this.direction]
                    var valueNextLeftMove = GameState[nextLeftMove[1]][nextLeftMove[0]]
                    var nextposition = GetPos4rmCoord(nextLeftMove)
                    
                    if (valueNextLeftMove == 0) {
                        jumps = jumps.concat(GetPos4rmCoord(leftMove))
                        
                        var leftNext = [hloc - 3, vloc + 3*this.direction]
                        var valLeftNext = GameState[leftNext[1]][leftNext[0]]
                        var rightNext = [hloc - 1, vloc + 3*this.direction]
                        var valRightNext = GameState[rightNext[1]][rightNext[0]]

                        var resleft = 0
                        var resright = 0

                        if(valLeftNext > 0 && valLeftNext != this.pieceType && valLeftNext != this.pieceType + 2) {
                            resleft = this.traverseLeft(nextLeftMove[0],nextLeftMove[1], jumps, GameState)
                        }
                        if(valRightNext > 0 && valRightNext != this.pieceType && valRightNext != this.pieceType + 2) {
                            resright = this.traverseRight(nextLeftMove[0],nextLeftMove[1], jumps, GameState)
                        }
                        if(resleft == 0 && resright == 0){
                            this.moves = this.moves.concat({
                                "nextPos": nextposition,
                                "jumps": jumps,
                            })
                            return 1
                        }
                    }
                    else if (valueNextLeftMove != 0){
                        return 0
                    }
                }
            }
        }
        return 0
    }

    traverseRight(hloc: number, vloc : number, jumps:any[], GameState:number[][]): number{
        if (!(hloc + 1 > 7)){
            var rightMove = [hloc + 1, vloc + 1*this.direction]
            var valueRightMove = GameState[rightMove[1]][rightMove[0]]

            if (valueRightMove == 0){
                this.moves = this.moves.concat({
                    "nextPos": GetPos4rmCoord(rightMove),
                    "jumps": [],
                })
                return 0
            }

            if (valueRightMove > 0 && valueRightMove != this.pieceType && valueRightMove != this.pieceType + 2){
                if (!(hloc + 2 > 7)){
                    var nextRightMove = [hloc + 2, vloc + 2*this.direction]
                    var valueNextRightMove = GameState[nextRightMove[1]][nextRightMove[0]]
                    var nextposition = GetPos4rmCoord(nextRightMove)
                    console.log(valueNextRightMove)
                    if (valueNextRightMove == 0) {
                        jumps = jumps.concat(GetPos4rmCoord(rightMove))
                        var leftNext = [hloc + 1, vloc + 3*this.direction]
                        var valLeftNext = GameState[leftNext[1]][leftNext[0]]
                        var rightNext = [hloc + 3, vloc + 3*this.direction]
                        var valRightNext = GameState[rightNext[1]][rightNext[0]]
                        
                        var resLeft = 0
                        var resRight = 0
                        if(valLeftNext > 0 && valLeftNext != this.pieceType && valLeftNext != this.pieceType + 2) {
                            resLeft = this.traverseLeft(nextRightMove[0],nextRightMove[1], jumps, GameState)
                        }
                        if(valRightNext > 0 && valRightNext != this.pieceType && valRightNext != this.pieceType + 2) {
                            resRight = this.traverseRight(nextRightMove[0],nextRightMove[1], jumps, GameState)
                        }
                        if (resLeft == 0 && resRight == 0){
                            this.moves = this.moves.concat({
                                "nextPos": nextposition,
                                "jumps": jumps,
                            })
                            return 1
                        }
                        
                    }
                    else{
                        return 0
                    }
                }
            }
        }
        return 0
    }
}
class Board {
    state:number[][] ;
    constructor(){
        this.state = InitGameState
    }


    KillPieces(GameState: number[][], positions: number[]) {
        for (var i in positions){
            var cord = PosMap[positions[i]]
            if (cord != undefined) GameState[cord[0]][cord[1]] = 0
        }
        this.state = GameState
    }

    CheckValidMoves(GameState: number[][], p0: number[], val: number, piece: Piece){
        var pieceType = piece.pieceType
        var hloc = piece.position[0] //horizontal location
        var vloc = piece.position[1] //vertical location

        var direction
        if (pieceType > 0 && pieceType == 1) direction = "up"
        else if (pieceType > 0 && pieceType == 2) direction = "down"
        else if (pieceType > 0 && pieceType > 2) direction = "both"

        if (direction == "up"){
            piece.traverseLeft(hloc, vloc,[], GameState)
            piece.traverseRight(hloc, vloc, [], GameState)
        }
        else if (direction == "down"){
            piece.traverseLeft(hloc, vloc,[], GameState)
            piece.traverseRight(hloc, vloc, [], GameState)
        }
        else if (direction == "both"){
            piece.traverseLeft(hloc, vloc,[], GameState)
            piece.traverseRight(hloc, vloc, [], GameState)
            piece.direction = (-1)*piece.direction
            piece.traverseLeft(hloc, vloc,[], GameState)
            piece.traverseRight(hloc, vloc, [], GameState)
        }
    
        return piece.moves
    }

    MovePieces(GameState: number[][], pieceType: number, currPos: number, nextPos: number, kills: number[]){
        //TODO: refactor logic to return new game state after making move
        // change current position to zero
        var cord = PosMap[currPos]
        if (cord != undefined) GameState[cord[0]][cord[1]] = 0
        // move to next position
        cord = PosMap[nextPos]
        if (cord != undefined) GameState[cord[0]][cord[1]] = pieceType
        this.state = GameState
        if (kills.length > 0) this.KillPieces(GameState, kills)
    }
    
}


const InitGameState = [
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
]

const PosMap: number[][] = [
    [7,1],[7,3],[7,5],[7,7], [6,0], [6,2], [6,4], [6,6], [5,1], [5,3],
    [5,5], [5,7], [4,0],
    [4,2], [4,4], [4,6], [3,1], [3,3], [3,5], 
    [3,7], [2,0], [2,2], [2,4], [2,6], [1,1], 
    [1,3], [1,5], [1,7], [0,0], [0,2], [0,4], [0,6]]

const GetPos4rmCoord = (coord: number[]) => {
    var pos = 99
    PosMap.forEach((v,k) => { if(v[0] == coord[1]&& v[1] == coord[0]) pos = k})
    return pos
}

const BoardPosMap = {}



// const Checkers: NextPageWithLayout = () => {

//     var board = new Board()
//     var game = new Game()
//     var pieces: Piece[] = []
//     for (var i = 0; i < 24; i++){
//         pieces = pieces.concat(new Piece(i < 12? RED: BLACK, PosMap[i]))
//     }

//     const [GameState, setGameState] = useState(board.state)
//     const [moves, setMoves] = useState([])
//     var newGS = [
//         [2,0,2,0,2,0,2,0],
//         [0,2,0,2,0,2,0,2],
//         [2,0,2,0,2,0,2,0],
//         [0,0,0,0,0,0,0,0],
//         [0,0,0,0,2,0,0,0],
//         [0,1,0,1,0,1,0,1],
//         [1,0,1,0,1,0,1,0],
//         [0,1,0,1,0,1,0,1],
//     ]

//     return(
//         <div className="flex flex-col">
//             <button
//             className="border w-[70px]"  
//             onClick={()=> {
//                 board.state = newGS
//                 setGameState(newGS)
//                 }}>Change</button>

//             {GameState.map((v, i) => {
//                 return <div key={i} className="flex">
//                     {v.map((val, j) => {
//                         var pos = GetPos4rmCoord([j,i])
//                         var piece = pieces[pos]
//                         return <button key={j} 
//                         className="h-[20px] w-[20px] border "
//                         onClick={()=> {
//                             board.CheckValidMoves(GameState, [j,i], val, piece)
//                         }}>
//                             {val}
//                         </button>
//                     })}
//                 </div>
//             })}

//             <div>
//                 {moves.map((v, i) => {
//                     return <div key={i}>
//                         {v["nextPos"]}
//                     </div>
//                 })}
//             </div>

//         </div>
//     )
// }

// Checkers.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <Layout>
//         {page}
//         </Layout>
//     )
// }

// export default Checkers