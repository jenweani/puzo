import { useClickAway } from "react-use"
import { Divide as Hamburger } from "hamburger-react"
import { useRef } from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export const routes = [
    {
      title: "Games",
      href: "#",
    },
    {
      title: "Features",
      href: "#",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ];

export const HamMenu = () => {
    const [isOpen, setOpen] = useState(false)
    const ref = useRef(null)

    useClickAway(ref, () => setOpen(false))

    return(
        <div ref={ref} className="lg:hidden w-full relative z-30">
            <div  className="absolute right-[3%]">
                <Hamburger toggled={isOpen} toggle={setOpen} size={25}/>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-11/12 absolute top-[55px] right-0 z-30 shadow-4xl p-5 pt-0 bg-neutral-950 border-b border-b-white/20 rounded-bl-[25px]"
                    >
                        <ul className="grid gap-2">
                            {routes.map((route, idx) => {

                                return (
                                    <motion.li
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.1 + idx / 10,
                                        }}
                                        key={route.title}
                                        className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                                    >
                                        <Link 
                                            onClick={() => setOpen((prev) => !prev)}
                                            className="flex  items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                                            href={route.href}
                                        >
                                            <span className="flex gap-1 text-lg">{route.title}</span>
                                        </Link>
                                    </motion.li>
                                )
                            })}
                            <motion.li
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.1 + 4 / 10,
                                }}
                                className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                            >
                                <Link 
                                    onClick={() => setOpen((prev) => !prev)}
                                    className="flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                                    href={"#"}
                                >
                                    <span className="flex gap-1 text-lg">LOGIN</span>
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            
        </div>
    )
}