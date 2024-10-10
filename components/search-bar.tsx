import Image from "next/image"
import { Button } from "./ui/button"
import { Input } from "./ui/input"



const SearchBar = () => {

    return (
        <>
            <section className="w-full flex justify-center transform -translate-y-1">
                <div className="flex border-8 border-[#B6AB7C] rounded-md w-[70%] items-center">
                    <div className="flex items-center justify-between flex-1 border-r-4  h-full border-[#B6AB7C]">
                        <div className="flex items-center px-3">
                            <Image src={'/assets/bx-bed.svg'}  alt="location" width={10} height={10} className="w-3 h-3" />
                            <Input placeholder="Location" className="px-1 ml-2 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />

                        </div>
                        <Button size={'icon'} className="hover:text-slate-100" variant={'ghost'} >
                            <Image src={'/assets/Chevron.svg'} alt="" width={11} height={11} />
                        </Button>
                    </div> 
                    <div className="flex items-center justify-between flex-1 border-r-4  h-full border-[#B6AB7C]">
                        <div className="flex items-center px-3">
                            <Image src={'/assets/bx-bed.svg'}  alt="location" width={10} height={10} className="w-3 h-3" />
                            <Input placeholder="Room Size" className="px-1 ml-2 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />


                        </div>
                        <Button size={'icon'} className="hover:text-slate-100" variant={'ghost'} >
                            <Image src={'/assets/Chevron.svg'} alt="" width={11} height={11} />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between flex-1 border-r-4  h-full border-[#B6AB7C]">
                        <div className="flex items-center px-3">
                            <Image src={'/assets/Coins.svg'}  alt="location" width={10} height={10} className="w-3 h-3" />
                            <Input placeholder="Min Price" className="px-1 ml-2 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />


                        </div>
                        <Button size={'icon'} className="hover:text-slate-100" variant={'ghost'} >
                            <Image src={'/assets/Chevron.svg'} alt="" width={11} height={11} />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between flex-1 border-r-4  h-full border-[#B6AB7C]">
                        <div className="flex items-center px-3">
                            <Image src={'/assets/Coins.svg'}  alt="location" width={10} height={10} className="w-3 h-3" />
                            <Input placeholder="Max Price" className="px-1 ml-2 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />


                        </div>
                        <Button size={'icon'} className="hover:text-slate-100" variant={'ghost'} >
                            <Image src={'/assets/Chevron.svg'} alt="" width={11} height={11} />
                        </Button>
                    </div> 
                    
                    <div className="flex-grow h-full">
                        <Button className="size-full rounded-none" size={'default'} >Search</Button>
                    </div>      
                </div>  
            </section>     
        </>
    )
}

export default SearchBar