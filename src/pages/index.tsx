import Layout from "@/app/layout";
import Image from "next/image";
import { NextPageWithLayout } from "./_app";
import { Children, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import NavbarDesktop from "@/components/NavbarDesktop";
import ArrowRight from "@/components/index/arrowleft";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavbarMobile from "@/components/NavbarMobile";
import { SourceMap } from "module";

const mainbg = "#070D19"
const darkSect = "#01050D"
const primaryColor = "#1B4ED8"
const cardColor = "#1B4ED8"

interface AnimatedTextProps{
    children: ReactNode
}

const AnimatedText: React.FC<AnimatedTextProps> = ({children}) =>{
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true, amount:0.5})
    return(
        <motion.div
            ref= {ref}
            initial = {{opacity: 0, y: 50}}
            animate = {isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
            transition={{duration: 0.5}}
            className=""
        >
            {children}
        </motion.div>
    )
}


const Home: NextPageWithLayout = () => {
    const [mobile, setMobile] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [isMounted, setIsMounted] = useState(false)



    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        handleScroll()

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    var year = new Date().getFullYear()

    useEffect(() => {
        setIsMounted(true)
        const updateMobile = () => {
            setMobile(window.innerWidth < 800 ? true : false)
        }
        updateMobile()
        window.addEventListener('resize', updateMobile)
        return () => {
            window.removeEventListener('resize', updateMobile)
        }
    }, [])

    if (!isMounted) {
        return null; // or a loading indicator
    }

    return (
        <main className="">
            {
                mobile ? (
                    <div className="flex flex-col bg-[#070D19]">
                        <NavbarMobile scrollY={scrollY}></NavbarMobile>
                        <div id="Hero" className="w-full bg-[#000000] rounded-b-[20px] ">
                            <div className="w-full md:h-[160px] h-[120px] bg-gradient-radial-top from-[#1B4ED866] via-[#1B4ED810] to-transparent to-blue-300 mx-auto"> </div>
                            <div className="flex flex-col">
                                <Image className="mx-auto" src={"index/hero.svg"} width={300} height={300} alt="" />
                                <div className="flex flex-col">
                                    <div className="font-black mt-[20px] leading-[50px] text-center w-11/12 mx-auto">
                                        <AnimatedText>
                                            <p className="text-[40px]">UNITE, PLAY,</p>
                                        </AnimatedText>
                                        <AnimatedText>
                                            <p className="text-[40px]">CONQUER.</p>   
                                        </AnimatedText>
                                    </div>
                                    <div className="w-10/12 mt-[20px] mx-auto text-center">
                                        <AnimatedText>
                                            <b>Ignite your team's competitive spirit with puzo - The</b>
                                            <b className="text-[#1B4ED8]"> ultimate playground </b>
                                            <b>for workplace bonding and friendly rivarly.</b>
                                        </AnimatedText>
                                    </div>
                                    <Link href={""} className="w-[120px] h-[40px] mx-auto mt-[20px] mb-[40px] transistion-colors duration-300 flex justify-center rounded-[10px] bg-[#1B4ED8] hover:bg-[#0030C0] focus:bg-[#0030C0]">
                                        <p className="leading-[40px] mr-[15px] font-bold text-[14px]">Play Now</p>
                                        <Image className="" src={"/game-control.svg"} width={15} height={15} alt=""/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div id="Features" className="mt-[30px] relative ">
                            <div className="w-[40px] h-[40px] bg-transparent
                             -top-[35px] left-3/4 absolute "><Image className="" src={"index/apos.svg"} width={50} height={50} alt="" /></div>
                            <div className="flex bg-[#303030]">
                                <div className="w-10/12 lg:w-8/12 h-[280px] flex flex-col justify-evenly mx-auto text-center py-[20px]">
                                    <p className=" font-bold text-[25px] font-bold leading-[20px]"><AnimatedText><span className="border-b-4 border-[#1B4ED8]">Transform Downtime</span> into</AnimatedText></p>
                                    <p className=" font-bold text-[25px] text-[#1B4ED8]  font-bold leading-[20px]"><AnimatedText>Epic Showdowns</AnimatedText></p>
                                    <div className="box mt-[15px] text-[15px]">
                                        <AnimatedText><b >"Create instant game rooms and dive into a world of classic board games, pulse-pounding arcade
                                        action, and strategic card battles. Challenge your colleagues, forge alliances, and discover hidden talents among your ranks."</b></AnimatedText>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-[#111111]">
                            <div className="w-full flex flex-col justify-evenly bg-gradient-radial from-[#1B4ED888] via-[#1B4ED822] to-transparent">
                                    <div className="text-[25px] leading-[25px] font-black my-[30px] text-center "><AnimatedText>THRILLING</AnimatedText> <p className="text-[#1B4ED8]"><AnimatedText>REWARD MODES</AnimatedText></p></div>
                                    <div className="w-10/12 mx-auto flex flex-col justify-between">
                                        <div className="w-10/12 flex flex-col mx-auto mb-[20px]">
                                            <Image src={"index/coin-index.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto" />
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>STAKE YOUR CLAIM</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Put your money where your mouth is. Winner takes all in high-stakes conpetition!</AnimatedText></div>
                                        </div>
                                        <div className="w-10/12 mx-[10px] flex flex-col mx-auto mb-[20px]">
                                            <Image src={"index/board.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto"/>
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>CLIMB THE LEADERBOARD</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Dominate the rankings and earn bragging rights as your team's undisputed champion.</AnimatedText></div>
                                        </div>
                                        <div className="w-10/12 flex flex-col mx-auto mb-[20px]">
                                            <Image src={"index/reward.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto"/>
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>TEAM TUG-OF-WAR</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Departments compete by pulling a virtual rope toward their side. The first to reach the end wins a grand prize!</AnimatedText></div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div id="Games" className="w-full bg-[#303030] flex flex-col">
                            <AnimatedText>
                                <p className="text-[25px] mt-[20px] text-white font-bold text-center">FEATURED <span className="text-[#1B4ED8]">GAMES</span></p>
                            </AnimatedText>
                            <div className="flex w-10/12 lg:w-8/12 my-[20px] mx-auto justify-evenly">
                                <div style={{backgroundImage:"url(index/checkers.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className="border-2 border-white w-[120px] h-[170px] rounded-[10px]">
                                    <div className="w-[117px] h-[167px] bg-gradient-to-b from-transparent via-transparent to-[#1B4ED8DD] rounded-[8px] flex flex-col">
                                        <div className="relative h-[120px] "> <p className="absolute top-[35px] -left-[24px] rotate-90 font-bold">CHECKERS</p></div>
                                        <div className="h-[30px] w-[80px] my-[10px] mx-auto rounded-[8px] border-2 border-white bg-[#1B4ED8] flex justify-evenly">
                                            <p className="text-white text-[15px] leading-[30px]">PLAY</p>
                                            <Image src={"index/play.svg"} width={12} height={12} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-2 border-white w-[120px] h-[170px] rounded-[10px] flex flex-col justify-center">
                                    <Image className="mx-auto" src={"index/comingsoon.svg"} width={16} height={16} alt="" />
                                    <p className="text-[12px] text-center">Coming Soon</p>
                                </div>
                            </div>
                            <div className="border-b-4 border-[#1B4ED8] w-[100px] mx-auto text-[14px] font-bold text-center mb-[20px]">
                                MORE GAMES
                            </div>
                        </div>
                        <div className="w-full h-[500px] bg-[#111111]">
                            <div className="w-full h-[500px] flex flex-col bg-gradient-radial from-[#1B4ED888] via-[#1B4ED822] to-transparent">
                                <div className="mt-[30px]">
                                    <AnimatedText>
                                        <p className="text-center text-[25px] font-black leading-[25px]">MORE THAN JUST</p>
                                        <p className="text-[#1B4ED8] text-[25px] font-black text-center leading-[25px] mt-[10px] mb-[40px]">FUN AND GAMES</p>
                                    </AnimatedText>
                                    <div className="flex justify-center w-11/12 mx-auto">
                                        <Image src={"index/Bullets.svg"} width={40} height={80} alt=""/>
                                        <div className="flex flex-col ml-[20px] text-[18px] font-bold leading-[30px] text-left">
                                            <p className="h-[40px] mb-[20px]">
                                                <AnimatedText>Strengthen team bonds through shared experiences.</AnimatedText>
                                            </p>
                                            <p className="h-[40px] my-[20px]">
                                                <AnimatedText>Breakdown silos and foster cross-department collaboration.</AnimatedText>
                                            </p>
                                            <p className="h-[40px] my-[20px]"><AnimatedText>Uncover leadership potential in unexpected places.</AnimatedText></p>
                                            <p className="h-[40px] mt-[20px]"><AnimatedText>Boost morale and motivation with friendly competition.</AnimatedText></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Contact" className="w-full flex flex-col bg-white py-[30px]">
                            <div className="w-10/12 mx-auto flex flex-col text-center">
                                <p className="text-black font-black text-[30px]">Ready to Play?</p>
                                <p className="text-black font-semibold text-[18px] overflow-ellipsis my-[10px]">Join our gaming community today and dive into endless fun and challenges</p>
                                <div className="w-[160px] mx-auto h-[40px] my-[10px] flex justify-center rounded-[10px] bg-[#1B4ED8]">
                                    <p className="text-[12px] mr-[6px] leading-[40px] font-bold">START PLAYING NOW</p>
                                    <Image src={"game-control.svg"} width={15} height={15} alt=""/>
                                </div>
                            </div>
                            <br />
                            <div className="w-11/12 mx-auto flex flex-col text-center py-[20px] justify-center bg-[#1B4ED8] rounded-[10px]">
                                <p className="w-10/12 mx-auto text-[25px] font-black">We Value your Feedback</p>
                                <p className="w-10/12 mx-auto my-[20px]">Have suggestions or need assistance? We're here to help and listen. Reach out to us anytime!</p>
                                <input className="h-[40px] w-10/12 px-[6px] flex bg-white mx-auto rounded-[10px]" type="text" name="" id="" placeholder="Enter Your Feedback" style={{color:"black", padding:"4px", border:"none"}}/>
                                <button onClick={()=>{}} className="w-[150px] h-[40px] mx-auto my-[15px] flex justify-evenly rounded-[6px] bg-white" >
                                    <p className="text-[11px] text-[#1B4ED8] font-bold text-center leading-[40px]">GIVE FEEDBACK</p>
                                    <div className="my-auto"><ArrowRight color="#1B4ED8" width="10" heigth="10"/></div>
                                </button>
                            </div>
                        </div>
                        <div className="w-full bg-black rounded-t-[20px] relative">
                            <div className="w-full flex flex-col justify-between py-[20px]">
                                <div className="w-10/12 mx-auto flex justify-between">
                                    <div>
                                        <p className="text-[15px] font-bold mb-[14px]">POPULAR GAMES</p>
                                        <div className="flex text-[12px]"><p>Checkers</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                        <div className="flex text-[12px]"><p>Chess</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                        <div className="flex text-[12px]"><p>Tic-Tac-Toe</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                    </div>
                                    <div className="">
                                        <p className="text-[15px] font-bold mb-[14px]">LEGAL</p>
                                        <p className="text-[12px]">Terms of Use</p>
                                        <p className="text-[12px]">Privacy Policy</p>
                                        <p className="text-[12px]">Applicant Privacy Policy</p>
                                    </div>
                                </div>
                                <div className="border border-dashed border-white my-[30px]" />
                                <div className="flex flex-col text-center">
                                    <p className="font-black">FOLLOW US</p>
                                    <div className="w-[100px] justify-evenly flex my-[10px] mx-auto">
                                        <div className="w-[35px] h-[28px] flex justify-center bg-[#1B4ED8] rounded-[100%]">
                                            <Image src={"index/twitter.svg"} width={20} height={20} alt=""/>
                                        </div>
                                        <div className="w-[35px] h-[28px] mx-[10px] flex justify-center bg-[#1B4ED8] rounded-[100%]">
                                            <Image src={"index/instagram.svg"} width={20} height={20} alt=""/>
                                        </div>
                                        <div className="w-[35px] h-[28px] flex justify-center bg-[#1B4ED8] rounded-[100%]">
                                            <Image src={"index/tiktok.svg"} width={20} height={20} alt=""/>
                                        </div>
                                    </div>
                                    <br />
                                    <p className="text-[12px] leading-[18px]">Copyright <span>{year}</span>  Musterizon</p>
                                    <p className="text-[12px] leading-[18px]">All rights reserved</p>
                                </div>
                                <Image className="mt-[20px] mx-auto" src={"puzoW.svg"} width={80} height={40} alt=""/>
                            </div>
                            <div className="w-full absolute bottom-[1px] h-[200px] bg-gradient-radial-bottom from-[#1B4ED866] via-transparent to-transparent to-blue-300"></div>
                        </div>
                        {scrollY>300 && <button onClick={()=>{window.scrollTo({top:0, behavior:"smooth"})}} className="fixed flex flex-col bottom-[20px] right-[20px]">
                            <div className="w-[40px] h-[40px] mx-auto rounded-[20px] flex bg-white"><Image className="mx-auto" src={"index/arrowUp.svg"} height={20} width={20} alt="" /></div>
                        </button>}
                    </div>
                ):(
                    <div className="flex flex-col bg-[#070D19]">
                        <NavbarDesktop scrollY={scrollY}/>
                        <div id="Hero" className="w-full bg-[#000000] rounded-b-[20px]">
                            <div className="w-full md:h-[160px] h-[120px] bg-gradient-radial-top from-[#1B4ED866] via-[#1B4ED810] to-transparent to-blue-300 mx-auto"> </div>
                            <div className="w-10/12 lg:w-8/12 lg:h-[400px] h-[500px] mx-auto flex justify-between">
                                <div className="mr-[20px]">
                                    <div className="font-black leading-[60px] mb-[20px]">
                                        <AnimatedText>
                                            <p className="text-[60px]">UNITE, PLAY,</p>
                                        </AnimatedText>
                                        <AnimatedText>
                                            <p className="text-[60px]">CONQUER.</p>   
                                        </AnimatedText>
                                    </div>
                                    <div>
                                        <AnimatedText>
                                            <b>Ignite your team's competitive spirit with puzo - The</b>
                                            <b className="text-[#1B4ED8]"> ultimate playground </b>
                                            <b>for workplace bonding and friendly rivarly.</b>
                                        </AnimatedText>
                                    </div>
                                    <Link href={""} className="w-[120px] h-[30px] my-[20px] transistion-colors duration-300 flex justify-center rounded-[4px] bg-[#1B4ED8] hover:bg-[#0030C0] focus:bg-[#0030C0]">
                                        <p className="leading-[30px] mr-[5px] text-[14px]">Play Now</p>
                                        <Image className="" src={"/game-control.svg"} width={15} height={15} alt=""/>
                                    </Link>
                                </div>
                                <Image className="-mt-12" src={"index/hero.svg"} width={300} height={300} alt="" />
                            </div>
                        </div>
                        <div id="Features" className="mt-[30px] relative ">
                            <div className="w-[40px] h-[40px] bg-transparent
                             -top-[35px] left-3/4 absolute "><Image className="" src={"index/apos.svg"} width={50} height={50} alt="" /></div>
                            <div className="flex bg-[#303030]">
                                <div className="w-10/12 lg:w-8/12 h-[220px] flex flex-col justify-evenly mx-auto text-center py-[20px]">
                                    <p className=" font-bold text-[25px] font-bold leading-[25px]"><AnimatedText><span className="border-b-4 border-[#1B4ED8]">Transform Downtime</span> into</AnimatedText></p>
                                    <p className=" font-bold text-[25px] text-[#1B4ED8] mt-[15px] font-bold leading-[22px]"><AnimatedText>Epic Showdowns</AnimatedText></p>
                                    <div className="box mt-[15px] text-[15px]">
                                        <AnimatedText><b >"Create instant game rooms and dive into a world of classic board games, pulse-pounding arcade
                                        action, and strategic card battles. Challenge your colleagues, forge alliances, and discover hidden talents among your ranks."</b></AnimatedText>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[400px] bg-[#111111]">
                            <div className="w-full h-[400px] flex flex-col justify-evenly bg-gradient-radial from-[#1B4ED888] via-[#1B4ED822] to-transparent">
                                
                                    <div className="text-[25px]  text-center font-bold"><AnimatedText>THRILLING <span className="text-[#1B4ED8]">REWARD MODES</span></AnimatedText></div>
                                    <div className="w-10/12 lg:w-8/12 mx-auto flex justify-between">
                                        <div className=" h-[250px] md:w-3/12 w-[200px] flex flex-col ">
                                            <Image src={"index/coin-index.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto" />
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>STAKE YOUR CLAIM</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Put your money where your mouth is. Winner takes all in high-stakes conpetition!</AnimatedText></div>
                                        </div>
                                        <div className=" h-[250px] md:w-3/12 w-[200px] mx-[10px] flex flex-col ">
                                            <Image src={"index/board.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto"/>
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>CLIMB THE LEADERBOARD</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Dominate the rankings and earn bragging rights as your team's undisputed champion.</AnimatedText></div>
                                        </div>
                                        <div className=" h-[250px] md:w-3/12 w-[200px] flex flex-col ">
                                            <Image src={"index/reward.svg"} width={60} height={60} alt="" className="h-[60px] w-[60px] mx-auto"/>
                                            <p className="font-bold text-[18px] my-[15px] text-center"><AnimatedText>TEAM TUG-OF-WAR</AnimatedText></p>
                                            <div className="text-[14px] text-center"><AnimatedText>Departments compete by pulling a virtual rope toward their side. The first to reach the end wins a grand prize!</AnimatedText></div>
                                        </div>
                                    </div>
                                
                                
                            </div>
                        </div>
                        <div id="Games" className="w-full bg-[#303030] flex flex-col">
                            <AnimatedText>
                                <p className="text-[25px] mt-[20px] text-white font-bold text-center">FEATURED <span className="text-[#1B4ED8]">GAMES</span></p>
                            </AnimatedText>
                            <div className="flex w-10/12 lg:w-8/12 my-[20px] mx-auto justify-evenly">
                                <div style={{backgroundImage:"url(index/checkers.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className="border-2 border-white w-[120px] h-[170px] rounded-[10px]">
                                    <div className="w-[117px] h-[167px] bg-gradient-to-b from-transparent via-transparent to-[#1B4ED8DD] rounded-[8px] flex flex-col">
                                        <div className="relative h-[120px] "> <p className="absolute top-[35px] -left-[24px] rotate-90 font-bold">CHECKERS</p></div>
                                        <div className="h-[30px] w-[80px] my-[10px] mx-auto rounded-[8px] border-2 border-white bg-[#1B4ED8] flex justify-evenly">
                                            <p className="text-white text-[15px] leading-[30px]">PLAY</p>
                                            <Image src={"index/play.svg"} width={12} height={12} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-2 border-white w-[120px] h-[170px] rounded-[10px] flex flex-col justify-center">
                                    <Image className="mx-auto" src={"index/comingsoon.svg"} width={16} height={16} alt="" />
                                    <p className="text-[12px] text-center">Coming Soon</p>
                                </div>
                                <div className="border-2 border-white w-[120px] h-[170px] rounded-[10px] flex flex-col justify-center">
                                    <Image className="mx-auto" src={"index/comingsoon.svg"} width={16} height={16} alt="" />
                                    <p className="text-[12px] text-center">Coming Soon</p>
                                </div>
                                <div className="border-2 border-white w-[120px] h-[170px] rounded-[10px] flex flex-col justify-center">
                                    <Image className="mx-auto" src={"index/comingsoon.svg"} width={16} height={16} alt="" />
                                    <p className="text-[12px] text-center">Coming Soon</p>
                                </div>
                            </div>
                            <div className="border-b-4 border-[#1B4ED8] w-[100px] mx-auto text-[14px] font-bold text-center mb-[20px]">
                                MORE GAMES
                            </div>
                        </div>
                        <div className="w-full h-[600px] bg-[#111111]">
                            <div className="w-full h-[600px] flex flex-col bg-gradient-radial from-[#1B4ED888] via-[#1B4ED822] to-transparent">
                                <div className="mt-[100px]">
                                    <AnimatedText>
                                        <p className="text-center text-[25px] font-black leading-[25px]">MORE THAN JUST</p>
                                        <p className="text-[#1B4ED8] text-[25px] font-black text-center leading-[25px] mt-[10px] mb-[40px]">FUN AND GAMES</p>
                                    </AnimatedText>
                                    
                                        <div className="flex justify-center">
                                            <Image src={"index/Bullets.svg"} width={40} height={80} alt=""/>
                                            <div className="flex flex-col ml-[20px] text-[20px] font-bold leading-[40px] text-left">
                                                <p className="h-[40px] mb-[20px]">
                                                    <AnimatedText>Strengthen team bonds through shared experiences.</AnimatedText>
                                                </p>
                                                <p className="h-[40px] my-[20px]">
                                                    <AnimatedText>Breakdown silos and foster cross-department collaboration.</AnimatedText>
                                                </p>
                                                <p className="h-[40px] my-[20px]"><AnimatedText>Uncover leadership potential in unexpected places.</AnimatedText></p>
                                                <p className="h-[40px] mt-[20px]"><AnimatedText>Boost morale and motivation with friendly competition.</AnimatedText></p>
                                                
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div id="Contact" className="w-full bg-white h-[300px]">
                            <div className="flex w-11/12 mx-auto">
                                <div className="flex flex-col mr-[80px] justify-center">
                                    <p className="text-black font-black text-[30px]">Ready to Play?</p>
                                    <p className="text-black font-semibold text-[18px] overflow-ellipsis my-[10px]">Join our gaming community today and dive into endless fun and challenges</p>
                                    <div className="w-[160px] h-[30px] my-[10px] flex justify-center rounded-[6px] bg-[#1B4ED8]">
                                        <p className="text-[12px] mr-[6px] leading-[30px] font-bold">START PLAYING NOW</p>
                                        <Image src={"game-control.svg"} width={15} height={15} alt=""/>
                                    </div>
                                </div>
                                <div className="w-[380px] lg:w-[450px] h-[300px] relative">
                                    <div className="w-[380px] lg:w-[450px] h-[300px] flex flex-col justify-center absolute top-[40px] right-[0.5px] bg-[#1B4ED8] rounded-[10px]">
                                        <p className="w-10/12 mx-auto text-[25px] font-black">We Value your Feedback</p>
                                        <p className="w-10/12 mx-auto my-[20px]">Have suggestions or need assistance? We're here to help and listen. Reach out to us anytime!</p>
                                        <div className="h-[40px] w-10/12 px-[6px] flex bg-white mx-auto rounded-[6px]">
                                            <input className="w-full focus:border-none" type="text" name="" id="" placeholder="Enter Your Feedback" style={{color:"black", padding:"4px", border:"none"}}/>
                                            <div className="w-[150px] h-[30px] my-auto px-[5px] flex justify-evenly rounded-[6px] bg-[#1B4ED8]" >
                                                <p className="text-[11px] text-white font-bold text-center leading-[30px]">GIVE FEEDBACK</p>
                                                <div className="my-auto"><ArrowRight color="white" width="10" heigth="10"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[340px] bg-black mt-[60px] rounded-t-[20px] relative">
                            <div className="w-full h-[340px] flex flex-col justify-between">
                                <div className="w-10/12 mx-auto mt-[40px] flex justify-evenly">
                                    <div>
                                        <p className="font-bold">FOLLOW US</p>
                                        <div className="flex my-[10px]">
                                            <div className="w-[30px] h-[30px] flex justify-center bg-[#1B4ED8] rounded-[15px]">
                                                <Image src={"index/twitter.svg"} width={20} height={20} alt=""/>
                                            </div>
                                            <div className="w-[30px] h-[30px] mx-[10px] flex justify-center bg-[#1B4ED8] rounded-[15px]">
                                                <Image src={"index/instagram.svg"} width={20} height={20} alt=""/>
                                            </div>
                                            <div className="w-[30px] h-[30px] flex justify-center bg-[#1B4ED8] rounded-[15px]">
                                                <Image src={"index/tiktok.svg"} width={20} height={20} alt=""/>
                                            </div>
                                        </div>
                                        <p className="text-[12px]">Copyright <span>{year}</span>  Musterizon</p>
                                        <p className="text-[12px]">All rights reserved</p>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold mb-[14px]">POPULAR GAMES</p>
                                        <div className="flex text-[12px]"><p>Checkers</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                        <div className="flex text-[12px]"><p>Chess</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                        <div className="flex text-[12px]"><p>Tic-Tac-Toe</p><Image src={"index/redirect.svg"} width={12} height={12} alt="" className="ml-[4px]"/></div>
                                    </div>
                                    <div className="">
                                        <p className="text-[15px] font-bold mb-[14px]">LEGAL</p>
                                        <p className="text-[12px]">Terms of Use</p>
                                        <p className="text-[12px]">Privacy Policy</p>
                                        <p className="text-[12px]">Applicant Privacy Policy</p>
                                    </div>
                                </div>
                                <Image className="mb-[40px] mx-auto" src={"puzoW.svg"} width={80} height={40} alt=""/>
                            </div>
                            <div className="w-full absolute bottom-[1px] h-[200px] bg-gradient-radial-bottom from-[#1B4ED866] via-transparent to-transparent to-blue-300"></div>
                        </div>
                        {scrollY>300 && <button onClick={()=>{window.scrollTo({top:0, behavior:"smooth"})}} className="fixed flex flex-col bottom-[20px] right-[20px]">
                            <div className="w-[40px] h-[40px] mx-auto rounded-[20px] flex bg-white"><Image className="mx-auto" src={"index/arrowUp.svg"} height={20} width={20} alt="" /></div>
                            <p className="text-[12px] font-bold mt-[5px]">Back to Top</p>
                        </button>}
                    </div>
                )
            }
        </main>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default Home;