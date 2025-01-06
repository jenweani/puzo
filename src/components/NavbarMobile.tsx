import Image from "next/image"
import Link from "next/link";
import React, { useState } from "react"
import { HamMenu } from "./index/hamMenu";

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
const NavbarMobile: React.FC<NavbarProps> = ({scrollY}) => {
    const [selected, setSelected] = useState(0)
    return (
        <div className="w-full fixed z-10">
            <div className={`flex justify-between ${scrollY > 100 ? "bg-[#070D19]": ""} h-[60px]`}>
                <Image className="ml-[20px]" src={"/puzoW.svg"} alt="" width={60} height={20} ></Image>
                <HamMenu/>
            </div>
        </div>
    )
}

export default NavbarMobile