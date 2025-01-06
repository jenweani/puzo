import Layout from "@/app/layout"
import { ReactElement, useEffect, useRef, useState } from "react"
import { NextPageWithLayout } from "../_app"
import Image from "next/image"
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
      <div className="mx-auto my-[10px]">
      <svg width="78" height="42" viewBox="0 0 78 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_75_13)">
        <path d="M0.769531 8.52734C1.63542 8.73242 2.41016 8.89193 3.09375 9.00586C3.80013 9.09701 4.39258 9.16536 4.87109 9.21094C5.44076 9.2793 5.94206 9.30208 6.375 9.2793C6.92188 9.25651 7.60547 9.17676 8.42578 9.04004C9.24609 8.90332 10.112 8.7666 11.0234 8.62988C11.9349 8.49316 12.835 8.37923 13.7236 8.28809C14.6123 8.19694 15.387 8.18555 16.0479 8.25391C16.7087 8.32227 17.4036 8.48177 18.1328 8.73242C18.862 8.96029 19.5456 9.2793 20.1836 9.68945C20.8216 10.0768 21.3685 10.5553 21.8242 11.125C22.3027 11.6947 22.599 12.3555 22.7129 13.1074C22.8268 13.8366 22.7585 14.6227 22.5078 15.4658C22.2572 16.2861 21.8584 17.0951 21.3115 17.8926C20.7646 18.6673 20.0811 19.3851 19.2607 20.0459C18.4404 20.7067 17.529 21.2422 16.5264 21.6523C15.7288 21.9486 14.863 22.1764 13.9287 22.3359C13.1312 22.4727 12.1969 22.5638 11.126 22.6094C10.0778 22.6322 8.96126 22.5182 7.77637 22.2676C7.61686 22.9284 7.52572 23.5436 7.50293 24.1133C7.50293 24.6602 7.52572 25.1501 7.57129 25.583C7.63965 26.0843 7.73079 26.54 7.84473 26.9502C7.98145 27.3604 8.15234 27.8389 8.35742 28.3857C8.53971 28.8415 8.74479 29.3997 8.97266 30.0605C9.22331 30.6986 9.51953 31.4163 9.86133 32.2139C9.45117 32.2139 9.05241 32.2253 8.66504 32.248C8.27767 32.248 7.92448 32.2594 7.60547 32.2822C7.24089 32.305 6.89909 32.3278 6.58008 32.3506C6.21549 32.3734 5.80534 32.4189 5.34961 32.4873C4.96224 32.5329 4.47233 32.6012 3.87988 32.6924C3.31022 32.7835 2.66081 32.8975 1.93164 33.0342C2.41016 32.3506 2.78613 31.724 3.05957 31.1543C3.35579 30.5618 3.57227 30.0492 3.70898 29.6162C3.86849 29.1149 3.97103 28.6592 4.0166 28.249C4.03939 27.9072 4.03939 27.3034 4.0166 26.4375C4.0166 25.5716 4.00521 24.569 3.98242 23.4297C3.95964 22.2904 3.92546 21.0941 3.87988 19.8408C3.83431 18.5876 3.77734 17.4141 3.70898 16.3203C3.64062 15.2038 3.56087 14.2467 3.46973 13.4492C3.40137 12.6517 3.33301 12.1276 3.26465 11.877C3.1735 11.5807 3.014 11.2617 2.78613 10.9199C2.60384 10.6237 2.3418 10.2819 2 9.89453C1.68099 9.48438 1.27083 9.02865 0.769531 8.52734ZM7.84473 15.2607C7.82194 15.4886 7.81055 15.7279 7.81055 15.9785C7.81055 16.457 7.84473 17.0723 7.91309 17.8242C8.07259 18.2116 8.26628 18.5306 8.49414 18.7812C8.74479 19.0319 9.00684 19.2256 9.28027 19.3623C9.5765 19.499 9.87272 19.5902 10.1689 19.6357C10.4652 19.6813 10.7614 19.7041 11.0576 19.7041C11.7412 19.6813 12.459 19.5218 13.2109 19.2256C14.2135 18.7926 14.9199 18.1774 15.3301 17.3799C15.7402 16.5824 15.9567 15.762 15.9795 14.9189C16.0023 14.0758 15.8542 13.3011 15.5352 12.5947C15.2389 11.8883 14.8743 11.4098 14.4414 11.1592C14.0768 10.9997 13.6097 10.9313 13.04 10.9541C12.5387 10.9769 11.9121 11.1022 11.1602 11.3301C10.4082 11.5579 9.48535 11.9681 8.3916 12.5605C8.27767 12.9707 8.18652 13.3353 8.11816 13.6543C8.0498 13.9733 7.99284 14.2581 7.94727 14.5088C7.90169 14.7822 7.86751 15.0329 7.84473 15.2607ZM23.0889 17.2773C23.6813 17.3913 24.194 17.4824 24.627 17.5508C25.0827 17.5964 25.4701 17.6419 25.7891 17.6875C26.1536 17.7331 26.4727 17.7673 26.7461 17.79C27.0195 17.8128 27.3385 17.8356 27.7031 17.8584C28.3184 17.8812 29.1842 17.8812 30.3008 17.8584C29.64 17.8128 29.1159 17.9837 28.7285 18.3711C28.3639 18.7357 28.0905 19.1572 27.9082 19.6357C27.6803 20.2054 27.555 20.8662 27.5322 21.6182C27.4867 22.6208 27.5094 23.5322 27.6006 24.3525C27.7145 25.1501 27.9082 25.8337 28.1816 26.4033C28.4779 26.9502 28.8652 27.3604 29.3438 27.6338C29.8223 27.8844 30.4375 27.9528 31.1895 27.8389C31.9414 27.7249 32.5111 27.4629 32.8984 27.0527C33.3086 26.6198 33.6048 26.0957 33.7871 25.4805C33.9694 24.8424 34.0719 24.1247 34.0947 23.3271C34.1403 22.5296 34.1745 21.6979 34.1973 20.832C34.1973 19.9661 34.1859 19.3509 34.1631 18.9863C34.1631 18.599 34.1517 18.3483 34.1289 18.2344C34.1061 18.1204 34.0719 18.0749 34.0264 18.0977C33.9808 18.0977 33.9238 18.0407 33.8555 17.9268C33.8099 17.8356 33.7415 17.7445 33.6504 17.6533C33.582 17.5622 33.4909 17.4596 33.377 17.3457C33.263 17.209 33.1377 17.0723 33.001 16.9355C33.5934 16.9583 34.1175 16.9811 34.5732 17.0039C35.0518 17.0039 35.4505 17.0153 35.7695 17.0381C36.1341 17.0609 36.4531 17.0837 36.7266 17.1064C36.9772 17.1292 37.3076 17.1634 37.7178 17.209C38.0596 17.2546 38.5039 17.3001 39.0508 17.3457C39.5977 17.3913 40.2471 17.4596 40.999 17.5508C40.4749 17.6647 40.0534 17.8356 39.7344 18.0635C39.4154 18.2913 39.1647 18.5192 38.9824 18.7471C38.7773 18.9977 38.6292 19.2712 38.5381 19.5674C38.4697 19.9548 38.4697 20.5472 38.5381 21.3447C38.5837 22.0511 38.6976 23.0195 38.8799 24.25C39.0622 25.4805 39.347 27.0983 39.7344 29.1035L37.0342 30.71L36.4873 26.1641C35.8265 27.2806 35.1201 28.1465 34.3682 28.7617C33.639 29.3542 32.9554 29.7871 32.3174 30.0605C31.5654 30.3796 30.8363 30.5618 30.1299 30.6074C29.1956 30.6074 28.3867 30.5505 27.7031 30.4365C27.0423 30.2998 26.4727 30.1289 25.9941 29.9238C25.5156 29.7188 25.1283 29.4909 24.832 29.2402C24.5586 28.9668 24.3535 28.6934 24.2168 28.4199C23.8978 27.8503 23.7269 27.1211 23.7041 26.2324C23.6813 25.321 23.7155 24.4209 23.8066 23.5322C23.8978 22.6208 24.0003 21.7891 24.1143 21.0371C24.2282 20.2852 24.2624 19.7725 24.2168 19.499C24.1712 19.2939 24.1029 19.0661 24.0117 18.8154C23.9206 18.6104 23.8066 18.3825 23.6699 18.1318C23.5332 17.8584 23.3395 17.5736 23.0889 17.2773ZM41.1699 13.21C42.2181 13.3011 43.141 13.3695 43.9385 13.415C44.7588 13.4378 45.4424 13.472 45.9893 13.5176C46.6273 13.5632 47.1855 13.5973 47.6641 13.6201C48.1654 13.6429 48.8034 13.6429 49.5781 13.6201C50.2389 13.6201 51.082 13.6087 52.1074 13.5859C53.1556 13.5404 54.4316 13.472 55.9355 13.3809L55.6621 18.1318C55.0013 18.7926 54.4089 19.4079 53.8848 19.9775C53.3835 20.5472 52.9391 21.0371 52.5518 21.4473C52.1188 21.9258 51.7314 22.3587 51.3896 22.7461C51.0479 23.1562 50.6605 23.6462 50.2275 24.2158C49.8402 24.7171 49.373 25.3324 48.8262 26.0615C48.2793 26.7679 47.6527 27.5996 46.9463 28.5566C48.1995 28.4883 49.2249 28.4199 50.0225 28.3516C50.82 28.2604 51.4466 28.1807 51.9023 28.1123C52.4492 28.0212 52.848 27.9528 53.0986 27.9072C53.3265 27.8161 53.5885 27.6224 53.8848 27.3262C54.1354 27.0755 54.443 26.6995 54.8076 26.1982C55.1722 25.6969 55.5824 25.0133 56.0381 24.1475C56.0381 24.8538 56.0381 25.4577 56.0381 25.959C56.0609 26.4375 56.0723 26.8363 56.0723 27.1553V28.0781V28.8643C56.0723 29.1149 56.0723 29.4225 56.0723 29.7871C56.0951 30.1517 56.1178 30.5618 56.1406 31.0176C55.252 30.9036 54.443 30.8239 53.7139 30.7783C52.9847 30.71 52.3581 30.6644 51.834 30.6416C51.2188 30.6188 50.6605 30.6188 50.1592 30.6416C49.6579 30.6872 49.0312 30.7327 48.2793 30.7783C47.6413 30.8239 46.8551 30.8695 45.9209 30.915C44.9867 30.9606 43.8815 31.0176 42.6055 31.0859L41.8535 27.4629C42.2637 27.2806 42.7536 26.9274 43.3232 26.4033C43.8929 25.8792 44.4398 25.3438 44.9639 24.7969C45.5563 24.1589 46.1829 23.4639 46.8438 22.7119C47.4818 21.96 48.1084 21.208 48.7236 20.4561C49.2477 19.818 49.7946 19.1572 50.3643 18.4736C50.9567 17.79 51.4694 17.1862 51.9023 16.6621C50.6719 16.7077 49.6579 16.7988 48.8604 16.9355C48.0628 17.0495 47.4362 17.1634 46.9805 17.2773C46.4336 17.4141 46.0234 17.5736 45.75 17.7559C45.4993 17.9609 45.1917 18.2686 44.8271 18.6787C44.5081 19.0205 44.1208 19.4876 43.665 20.0801C43.2093 20.6497 42.6852 21.3903 42.0928 22.3018C42.0928 21.5498 42.0814 20.8776 42.0586 20.2852C42.0358 19.6699 42.013 19.1572 41.9902 18.7471C41.9447 18.2686 41.9105 17.847 41.8877 17.4824C41.8421 17.1178 41.7852 16.7191 41.7168 16.2861C41.6712 15.8988 41.5915 15.4544 41.4775 14.9531C41.3864 14.429 41.2839 13.848 41.1699 13.21Z" fill="white"/>
        </g>
        <g clipPath="url(#clip0_75_13)">
        <path d="M74.0466 14.9733C72.4654 13.4887 70.3772 12.6637 68.2083 12.6667C63.4908 12.6667 59.6666 16.4908 59.6666 21.2083C59.6666 25.9258 63.4908 29.75 68.2083 29.75C70.4558 29.7532 72.6134 28.8674 74.2104 27.2858L68 21L74.0466 14.9733Z" stroke="white" strokeWidth="1.66667" strokeLinejoin="round"/>
        <path d="M74.6667 22.6667C75.1087 22.6667 75.5326 22.4911 75.8452 22.1785C76.1577 21.866 76.3333 21.442 76.3333 21C76.3333 20.558 76.1577 20.1341 75.8452 19.8215C75.5326 19.5089 75.1087 19.3333 74.6667 19.3333C74.2246 19.3333 73.8007 19.5089 73.4882 19.8215C73.1756 20.1341 73 20.558 73 21C73 21.442 73.1756 21.866 73.4882 22.1785C73.8007 22.4911 74.2246 22.6667 74.6667 22.6667Z" stroke="white" strokeWidth="1.66667" strokeLinejoin="round"/>
        <path d="M65.0833 16.4167V19.75M63.4166 18.0833H66.75" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <filter id="filter0_b_75_13" x="-3.23047" y="4.15137" width="63.3711" height="32.8828" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_13"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_75_13" result="shape"/>
        </filter>
        <clipPath id="clip0_75_13">
        <rect width="20" height="20" fill="white" transform="translate(58 11)"/>
        </clipPath>
        </defs>
      </svg>
      </div>
      <div className="flex justify-between mx-auto w-10/12 sm:w-[400px]">
        <div className="flex h-[32px] bg-[red] px-[4px] rounded-[4px]">
          <Image className="my-auto" alt="" src={"/logout.svg"} width={15} height={15}></Image>
          <p className="my-auto ml-[4px]">Quit</p>
        </div>
        <p className="my-auto font-bold">Musterizon</p>
        <div className="flex my-auto">
          <Image src={"/coin.svg"} width={18} height={18} alt=""></Image>
          <p className="my-auto ml-[4px]">200</p>
        </div>
      </div>
      <div className="flex justify-between mx-auto w-10/12 sm:w-[400px] my-[20px]">
        <div className="flex ">
          <div className="w-[30px] h-[30px] bg-[#868686] rounded-[15px]"> </div>
          <p className="ml-[10px] leading-[30px]">Jordan</p>
        </div>
        <div className="flex w-[25px] h-[25px] rounded-[12px] bg-[#464646] ">
          <p className="m-auto">0</p>
        </div>
        <div className="flex w-[75px] h-[30px] bg-[#474747] justify-center rounded-[4px]">
          <Image src={"/timer.svg"} width={20} height={20} alt=""></Image>
          <p className="my-auto ml-[10px]">7:00</p>
        </div>
      </div>
      <div className="mx-auto my-[20px]">
        <canvas ref={canvasRef} className="mx-[20px] w-[400] h-[400] rounded-[8px]"></canvas>
      </div>
      <div className="flex justify-between mx-auto w-10/12 sm:w-[400px] my-[20px]">
        <div className="flex w-[75px] h-[30px] bg-[#474747] justify-center rounded-[4px]">
          <Image src={"/timer.svg"} width={20} height={20} alt=""></Image>
          <p className="my-auto ml-[10px]">7:00</p>
        </div>
        <div className="flex w-[25px] h-[25px] rounded-[12px] bg-[red] ">
          <p className="m-auto">0</p>
        </div>
        <div className="flex"> 
          <p className="mr-[10px] leading-[30px]">Nelly</p>
          <div className="w-[30px] h-[30px] bg-[#868686] rounded-[15px]"> </div>
        </div>
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

