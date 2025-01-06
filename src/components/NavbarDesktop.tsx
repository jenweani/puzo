import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image"
import Link from "next/link";
import React, { useState } from "react"

interface NavItemProps {
    item: string;
    selected: boolean
}

const NavItem:React.FC<NavItemProps> = ({item, selected}) => {
    return (
        <Link href={`#${item}`} style={{borderBottomColor: selected?"#1B4ED8":""}} className="border-b-4 border-transparent hover:border-[#1B4ED8] transistion-all duration-500">
            <p className="leading">{item}</p>
        </Link>
    )
}

interface NavbarProps {
    scrollY: number
}
const NavbarDesktop: React.FC<NavbarProps> = ({scrollY}) => {
    const [selected, setSelected] = useState(0)
    return (
        <div className="w-full fixed z-10">
            <div className={`flex justify-between ${scrollY > 100 ? "bg-[#070D19]": ""} h-[60px]`}>
                <Image className="ml-[20px]" src={"/puzoW.svg"} alt="" width={60} height={20} ></Image>
                <div className="flex w-[300px] justify-between my-auto">
                    <NavItem item="Games" selected={selected == 1 ? true: false}/>
                    <NavItem item="Features" selected={selected == 2 ? true: false}/>
                    <NavItem item="Contact" selected={selected == 3 ? true: false}/>
                </div>

                <div className="flex justify-between my-auto">
                    <Link href={""} className="w-[80px] h-[30px] rounded-[4px] bg-[#1B4ED8] hover:bg-[#0030C0] focus:bg-[#0030C0] transistion-colors duration-300 leading-[30px] mx-[10px] text-center text-[14px]">SIGN UP</Link>
                    <Link href={""} className="w-[80px] h-[30px] rounded-[4px] bg-transparent  hover:bg-[#FFFFFF44] focus:bg-[#FFFFFF44]  transistion-colors duration-300 leading-[30px] mx-[10px] text-center text-[14px] border">LOGIN</Link>
                </div>
            </div>
        </div>
        
    )
}

export default NavbarDesktop