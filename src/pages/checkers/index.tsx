import Layout from "@/app/layout"
import { ReactElement, useEffect, useRef, useState } from "react"
import { NextPageWithLayout } from "../_app"

import { DraughtsPlayer, DraughtsStatus } from "rapid-draughts";
import { EnglishDraughts as Draughts, 
    EnglishDraughtsComputerFactory as ComputerFactory,
    EnglishDraughtsGame,
 } from "rapid-draughts/english";

const draughts = Draughts.setup()
class TurnBasedGame {
  status: number
  lenPlayers: number
  currTurn: number
  winner: number

  constructor(lenPlayers: number) {
    this.status = 0
    this.lenPlayers = lenPlayers // number of players
    this.currTurn = 0
    this.winner = -1
  }
  
  nextTurn(): void {
    this.currTurn = (this.currTurn + 1) % this.lenPlayers
  }

}

class CheckersGame extends TurnBasedGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boardSize: number;
  private squareSize: number;
  private draughts: EnglishDraughtsGame;

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
            this.drawPiece(col, row, 'black');
          } else if (row > 4) {
            this.drawPiece(col, row, 'red');
          }
        }
      }
    }
  }

  private drawPiece(col: number, row: number, color: 'red' | 'black'): void {
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
          this.drawPiece(col, row, 'black');
        } else if (piece.player === DraughtsPlayer.LIGHT ) {
          this.drawPiece(col, row, 'red');
        }
      }
    }
  }

  private addEventListeners(): void {
      this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  private drawPieceValidMoves(piece: number[]): void {
    const pieceCol = piece[1]
    const pieceRow = piece[0]
    this.ctx.rect(pieceCol * this.squareSize, pieceRow * this.squareSize, this.squareSize, this.squareSize)
    this.ctx.strokeStyle = "blue"
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // const x = col * this.squareSize + this.squareSize / 2;
    // const y = row * this.squareSize + this.squareSize / 2;
    // const radius = this.squareSize * 0.1;

    // this.ctx.beginPath();
    // this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    // this.ctx.fillStyle = "blue";
    // this.ctx.fill();
    // this.ctx.strokeStyle = '#FFFFFF';
    // this.ctx.lineWidth = 2;
    // this.ctx.stroke();
  }

  private handleClick(event: MouseEvent): void {
    this.drawBoard()
    this.drawPieces()
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / this.squareSize);
    const row = Math.floor(y / this.squareSize);

    //TODO: write code to if a piece is clicked, and if it is, draw the valid moves
    const piece = this.draughts.board[row * 8 + col].piece
    if (piece) {
      // const moves = this.draughts.getValidMoves(piece)
      console.log(this.draughts.moves)
      this.drawPieceValidMoves([row, col])
    }

    // Implement your game logic here
    console.log(`Clicked on square: (${col}, ${row})`);
  }

  // Add game logic methods here
}


const Checkers: NextPageWithLayout = () => {
  const [gamestate, setGameState] = useState(draughts.board)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var checkersGame 
  useEffect(() => {
    checkersGame = new CheckersGame(canvasRef.current!, draughts, 400)
  }, [gamestate])
  
  return(
      <main className="flex flex-col">
        <div className="mx-auto">Puzo</div>
        <div className="mx-auto">
          <canvas ref={canvasRef} className="mx-[20px] w-[400] h-[400]"></canvas>
        </div>
        <div className="flex flex-col"></div>
      </main>
  )
}

Checkers.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default Checkers