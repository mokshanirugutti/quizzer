import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="pagePadding w-full flex justify-between py-4 items-center px-5 md:px-16 lg:px-28 font-inter ">
            <div className="w-full  flex mx-auto justify-between items-center ">
            <Link to='/' >
            <h1 className="text-2xl px-4">Quizzer</h1>
            </Link>
            <div className="hidden md:flex gap-6 min-w-fit">
                <Link to="/"  className='hover:translate-y-1 cursor-pointer transition-all duration-150 '>Home</Link>
                <Link to="/quiz"  className='hover:translate-y-1 cursor-pointer transition-all duration-150 '>Quiz</Link>
                <Link to="/study"  className='hover:translate-y-1 cursor-pointer transition-all duration-150 '>Study</Link>
            </div>
            <div className="hidden md:flex gap-4 min-w-fit">
                <ModeToggle/>
            </div>
            </div>
            <div>
                {!isOpen && (
                <MenuIcon className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                
                )}
                {isOpen && (
                <X className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                )}
            </div>
            {isOpen && (
            <div className=" h-screen w-screen absolute top-0 right-0 z-20 backdrop-blur-md p-10 mt-16">
                
                <div className="flex flex-col gap-6 min-w-fit font-semibold text-xl tracking-wide">
                    <Link to="/" >Home</Link>
                    <Link to="/quiz" >Quiz</Link>
                    <Link to="/study" >Study</Link>
                    <ModeToggle/>
                </div>
                
            </div>)}
        </div>
    )}