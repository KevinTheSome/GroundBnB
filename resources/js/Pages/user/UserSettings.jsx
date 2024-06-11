import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'


function UserSettings({auth})
{
    const [isLogout, setIsLogout] = useState(false);

    const [user,serUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    
    if(isLogout === true){
        console.log("logging out")
        setIsLogout(false)
        router.post('/logout')
    }
  
    return (
        <>
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
                <h1 className='text-4xl text-center pt-5 font-bold'>User settings</h1>

                <div className="flex justify-end p-5">
                    <button onClick={() => setIsLogout(true)} className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded">Logout</button>   
                </div>


                <div className="grid p-5 w-[90%] h-[90%] m-auto rounded-lg bg-cyan-50">

                    <form action="">
                    <p className='text-2xl font-bold'>Change Name</p>
                        <label htmlFor="">
                            <span className='p-2'>New Name</span>
                            <input type="text" />
                        </label>
                        <br/>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form action="">
                    <p className='text-2xl font-bold'>Change Email</p>
                        <label htmlFor="">
                            <span className='p-2'>New Email</span>
                            <input type="email" />
                        </label>
                        <br/>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form action="">
                        <p className='text-2xl font-bold'>Change Password</p>
                        <label htmlFor="">
                            <span className='p-2'>Old Password</span>
                            <input type="password" />
                        </label>
                        <br/>
                        <label htmlFor="">
                            <span className='p-2'>New Password</span>
                            <input type="password" />
                        </label>
                        <br/>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form action="">
                        <p className='text-2xl font-bold'>Delete Account</p>
                        <label htmlFor="">
                            <span>Your Password</span>
                            <input type="password" />
                        </label>
                        <br/>
                        <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded" type="submit">Delete</button>
                    </form>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default UserSettings