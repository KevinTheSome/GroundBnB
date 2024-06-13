import { useState } from 'react';
import { Link } from '@inertiajs/react'
function NavBar({user})
{
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
        {user ? (
        <>
                <meta name="description" content="A navbar with a logo"></meta>
        <nav className="bg-cyan-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className='flex items-center'>
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z"/></svg>
                        <span className="text-white text-2xl font-bold hover:text-cyan-200">GroundBnB</span>
                    </div>
                </Link>
            <div className="hidden md:flex space-x-4">
                <Link href="/about" className="text-white hover:text-cyan-200">About</Link>
                <Link href="/properties/new" className="text-white hover:text-cyan-200">Add property</Link>
                <Link href="/myproperties" className="text-white hover:text-cyan-200">My properties</Link>
                <Link href="/reservation/myproperties" className="text-white hover:text-cyan-200">My reservationes</Link>
                <Link href="/user/settings" className="text-white hover:text-cyan-200">Settings</Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} aria-label="Open Menu" className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
                </button>
            </div>
            </div>
            {isOpen && (
            <div className="md:hidden grid mt-4 space-y-2">
                <Link href="/about" className="text-white hover:text-cyan-200">About</Link>
                <Link href="/properties/new" className="text-white hover:text-cyan-200">Add property</Link>
                <Link href="/properties" className="text-white hover:text-cyan-200">My properties</Link>
                <Link href="/reservation/myproperties" className="text-white hover:text-cyan-200">My reservationes</Link>
                <Link href="/user/settings" className="text-white hover:text-cyan-200">Settings</Link>
            </div>
            )}
        </nav>
        </>
        ) : (
            <>
            <meta name="description" content="A navbar with a logo"></meta>
    <nav className="bg-cyan-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
                <div className='flex items-center'>
                    <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z"/></svg>
                    <span className="text-white text-2xl font-bold hover:text-cyan-200">GroundBnB</span>
                </div>
            </Link>
        <div className="hidden md:flex space-x-4">
            <Link href="/about" className="text-white hover:text-cyan-200">About</Link>
            <Link href="/login" className="text-white hover:text-cyan-200">Log In</Link>
            <Link href="/register" className="text-white hover:text-cyan-200">Register</Link>
        </div>
        <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Open Menu" className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
            </button>
        </div>
        </div>
        {isOpen && (
        <div className="md:hidden grid mt-4 space-y-2">
            <Link href="/about" className="text-white hover:text-cyan-200">About</Link>
            <Link href="/login" className="text-white hover:text-cyan-200">Log In</Link>
            <Link href="/register" className="text-white hover:text-cyan-200">Register</Link>
        </div>
        )}
    </nav>
    </>
        ) }

      </>
    )
}

export default NavBar