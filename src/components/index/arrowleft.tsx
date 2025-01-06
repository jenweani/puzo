import { FC } from "react"

interface props {
    color: string,
    width: string,
    heigth: string,
}

const ArrowRight:FC<props> = ({color, width, heigth}) => {
    return(
        <svg width={width} height={heigth} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.30176 1.42822L10.3857 0.344238C10.8447 -0.114747 11.5869 -0.114747 12.041 0.344238L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.0459 20.9741C11.5869 21.4331 10.8447 21.4331 10.3906 20.9741L9.30664 19.8901C8.84277 19.4263 8.85254 18.6694 9.32617 18.2153L15.2051 12.6147L1.17187 12.6147C0.52246 12.6147 -5.28571e-07 12.0923 -5.00184e-07 11.4429L-4.31885e-07 9.88037C-4.03498e-07 9.23096 0.522461 8.7085 1.17187 8.7085L15.2051 8.7085L9.32129 3.10303C8.84277 2.64892 8.83301 1.89209 9.30176 1.42822Z" fill={color}/>
        </svg>
    )
}

export default ArrowRight