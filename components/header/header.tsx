'use client';

import Image from "next/image";
import Logo from "../logo";
import { Nav } from "../nav";
import { Button } from "../ui/button";

const Header = () => {
    return (
        <>
            <header className='flex justify-between items-center bg-primary h-20 w-full' > 
               <div className="flex mx-5 justify-between items-center w-full space-x-3">
               <h2 className="text-white text-4xl font-bold uppercase">Hallynk</h2>

                <Nav />

                <div className="flex items-center mr-2 space-x-1">

                <Image src={'/assets/add-user.svg'}  alt="add user" width={10} height={10} className="w-10 h-10" />
                <Button variant={'link'} className="text-slate-950">Sign In</Button>
                <Image src={'/assets/Chevron.svg'}  alt="chevron" width={10} height={10} className="w-3 h-3" />
                </div>
               </div>
            </header>
        </>
    );

}

export default Header;