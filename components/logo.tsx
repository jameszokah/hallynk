'use client';
import Image from 'next/image'

const Logo = () => {
    return (
        <>
           
                <Image src='/hallynk-logo.svg' alt='logo' className='w-14 h-14' width={20} height={20} />
        </>
    );

}

export default Logo