import Layout from "@/app/layout"
import { ReactElement, useEffect, useRef, useState } from "react"
import { NextPageWithLayout } from "../_app"

import { DraughtsPlayer, DraughtsStatus } from "rapid-draughts";
import { EnglishDraughts as Draughts, 
    EnglishDraughtsComputerFactory as ComputerFactory,
    EnglishDraughtsGame,
 } from "rapid-draughts/english";
import { DrawCrown } from "./checkers";


const PosMap: number[][] = [
  [0,1],[0,3],[0,5],[0,7], [1,0], [1,2], [1,4], [1,6], [2,1], [2,3],
  [2,5], [2,7], [3,0],
  [3,2], [3,4], [3,6], [4,1], [4,3], [4,5], 
  [4,7], [5,0], [5,2], [5,4], [5,6], [6,1], 
  [6,3], [6,5], [6,7], [7,0], [7,2], [7,4], [7,6]]
const GetPos4rmCoord = (coord: number[]) => {
  var pos = 99
  PosMap.forEach((v,k) => { if(v[0] == coord[0]&& v[1] == coord[1]) pos = k})
  return pos
}
const draughts = Draughts.setup({player: DraughtsPlayer.LIGHT})
class TurnBasedGame {
  status: number
  numPlayers: number
  currTurn: number
  winner: number

  constructor(numPlayers: number) {
    this.status = 0
    this.numPlayers = numPlayers // number of players
    this.currTurn = 0
    this.winner = -1
  }
  
  nextTurn(): void {
    this.currTurn = (this.currTurn + 1) % this.numPlayers
  }

}

class CheckersGame extends TurnBasedGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boardSize: number;
  private squareSize: number;
  private draughts: EnglishDraughtsGame;
  private selectedPiece: number | null = null;

  constructor(canvas: HTMLCanvasElement, draughts: EnglishDraughtsGame, boardSize: number) {
    super(2); // Pass the number of players (2 for checkers) to the TurnBasedGame constructor
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.boardSize = boardSize;
    this.squareSize = this.boardSize / 8;

    this.canvas.width = this.boardSize;
    this.canvas.height = this.boardSize;

    this.draughts = draughts

    this.drawBoard();
    this.setupInitialPieces();
    this.addEventListeners();
  }

  private drawBoard(): void {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.ctx.fillStyle = (row + col) % 2 === 0 ? '#FFFFFF' : '#000000';
        this.ctx.fillRect(
          col * this.squareSize,
          row * this.squareSize,
          this.squareSize,
          this.squareSize
        );
      }
    }
  }

  private setupInitialPieces(): void {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 !== 0) {
          if (row < 3) {
            this.drawPiece(col, row, 'black', false);
          } else if (row > 4) {
            this.drawPiece(col, row, 'red', false);
          }
        }
      }
    }
  }

  private drawPiece(col: number, row: number, color: 'red' | 'black', isKing: boolean): void {
    const x = col * this.squareSize + this.squareSize / 2;
    const y = row * this.squareSize + this.squareSize / 2;
    const radius = this.squareSize * 0.4;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    if (isKing) DrawCrown(this.ctx, x, y, this.squareSize/2)
    this.ctx.closePath()
  }

  drawPieces(): void {
    var board = this.draughts.board
    for (let i = 0; i < board.length; i++) {
      const piece = board[i].piece;
      if (piece) {
        const col = i % 8;
        const row = Math.floor(i / 8);
        if (piece.player === DraughtsPlayer.DARK ) {
          this.drawPiece(col, row, 'black', piece.king);
        } else if (piece.player === DraughtsPlayer.LIGHT ) {
          this.drawPiece(col, row, 'red', piece.king);
        }
      }
    }
  }

  private addEventListeners(): void {
      this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  private drawPossMove(pos: number): void { // draw possible move
    const piece = PosMap[pos]
    const pieceCol = piece[1]
    const pieceRow = piece[0]
    // this.ctx.beginPath();
    // this.ctx.rect(pieceCol * this.squareSize, pieceRow * this.squareSize, this.squareSize, this.squareSize)
    // this.ctx.strokeStyle = "green"
    // this.ctx.lineWidth = 2
    // this.ctx.stroke()

    const x = pieceCol * this.squareSize + this.squareSize / 2;
    const y = pieceRow * this.squareSize + this.squareSize / 2;
    const radius = this.squareSize * 0.1;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
  }

  private getPieceValidMoves(piece: number[]){

  }

  private handleClick(event: MouseEvent): void {
    this.drawBoard()
    this.drawPieces()
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / this.squareSize);
    const row = Math.floor(y / this.squareSize);

    // TODO: write code to if a piece is clicked, and if it is, draw the valid moves
    const piece = this.draughts.board[row * 8 + col].piece
    console.log(piece)
    
    let player 
    if(piece) player = piece.player == DraughtsPlayer.LIGHT ? 0 : 1
    console.log('player: '+player)
    if (piece && player === this.currTurn) {
      this.selectedPiece = GetPos4rmCoord([row, col]);
      const moves = this.draughts.moves;
      moves.forEach((v, k) => {
        if(v.origin == this.selectedPiece){
          this.drawPossMove(v.destination)
        }
      })
      console.log(moves);
      
    }else if(this.selectedPiece != null){
      let pos = GetPos4rmCoord([row, col])
      console.log(pos)
      const moves = this.draughts.moves;
      moves.forEach((v, k) => {
        if(v.origin == this.selectedPiece && v.destination == pos){
          console.log(v)
          this.draughts.move(v)
          this.nextTurn()
          console.log(this.draughts.asciiBoard())
          this.drawBoard()
          this.drawPieces()
        }
      })
      this.selectedPiece = null
    }else{
      this.selectedPiece = null
    }

    // Implement your game logic here
    console.log(`Clicked on position: ${GetPos4rmCoord([row, col])}`);
  }

  // Add game logic methods here
}


const Checkers: NextPageWithLayout = () => {
  const [gamestate, setGameState] = useState(draughts.board)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var checkersGame: CheckersGame
  useEffect(() => {
    checkersGame = new CheckersGame(canvasRef.current!, draughts, 400)
    console.log("loop")
  }, []);

  return (
    <main className="flex flex-col">
      <div className="mx-auto">Checkers</div>
      <div className="mx-auto">
        <canvas ref={canvasRef} className="mx-[20px] w-[400] h-[400] rounded-[8px]"></canvas>
      </div>
    </main>
  );
};

Checkers.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default Checkers

