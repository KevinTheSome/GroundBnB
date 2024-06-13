import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'


function UserSettings({auth})
{
    const [isLogout, setIsLogout] = useState(false);

    const [name , setName] = useState(auth.user.name)
    const [nameError , setNameError] = useState('')
    const [email , setEmail] = useState(auth.user.email)
    const [emailError , setEmailError] = useState('')
    const [password , setPassword] = useState({password : '' , newPassword : ''})
    const [passwordError , setPasswordError] = useState('')
    const [deletePassword , setDeletePassword] = useState('')
    const [deletePasswordError , setDeletePasswordError] = useState('')

    function handleRenameSubmit(e)
    {
        e.preventDefault()
        if(name === '' || name === null){
            setNameError('Name cannot be empty')
            return
        }
        router.post('/user/settings/name' , {name : name})
    }

    function handleEmailSubmit(e)
    {
        e.preventDefault()
        if(email === '' || email === null){
            setEmailError('Email cannot be empty')
            return
        }
        router.post('/user/settings/email' , {email : email})
    }

    function handlePasswordSubmit(e)
    {
        e.preventDefault()
        if(password.password === '' || password.password === null){
            setPasswordError('Password cannot be empty')
            return
        }
        if(password.newPassword === '' || password.newPassword === null){
            setPasswordError('New password cannot be empty')
            return
        }
        if(password.newPassword.length < 8){
            setPasswordError('New password must be at least 8 characters long')
            return
        }
        router.post('/user/settings/password' , {password : password.password , newPassword : password.newPassword})
    }

    function handleDeleting(e)
    {
        e.preventDefault()
        if(deletePassword === '' || deletePassword === null){
            setDeletePasswordError('Password cannot be empty')
            return
        }
        if(deletePassword.length < 8){
            setDeletePasswordError('Password must be at least 8 characters long')
            return
        }
        router.post('/user/settings/delete' , {password : deletePassword})
    }


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

                    <form onSubmit={handleRenameSubmit}>
                    <p className='text-2xl font-bold'>Change Name</p>
                        <label htmlFor="">
                            <span className='p-2'>New Name</span>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
                        </label>
                        <br/>
                        <p className='text-red-500'>{nameError}</p>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form onSubmit={handleEmailSubmit}>
                    <p className='text-2xl font-bold'>Change Email</p>
                        <label htmlFor="">
                            <span className='p-2'>New Email</span>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                        </label>
                        <br/>
                        <p className='text-red-500'>{emailError}</p>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form onSubmit={handlePasswordSubmit}>
                        <p className='text-2xl font-bold'>Change Password</p>
                        <label htmlFor="">
                            <span className='p-2'>Old Password</span>
                            <input type="password" value={password.password} onChange={e => setPassword({...password , password : e.target.value})} min={8} required/>
                        </label>
                        <br/>
                        <label htmlFor="">
                            <span className='p-2'>New Password</span>
                            <input type="password" value={password.newPassword} onChange={e => setPassword({...password , newPassword : e.target.value})} min={8} required/>
                        </label>
                        <br/>
                        <p className='text-red-500'>{passwordError}</p>
                        <button className="text-white bg-cyan-500 hover:bg-cyan-700 font-bold py-2 px-4 rounded" type="submit">Save</button>
                    </form>

                    <form onSubmit={handleDeleting}>
                        <p className='text-2xl font-bold'>Delete Account</p>
                        <label htmlFor="">
                            <span>Your Password</span>
                            <input type="password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} min={8} required/>
                        </label>
                        <br/>
                        <p className='text-red-500'>{deletePasswordError}</p>
                        <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded" type="submit">Delete</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default UserSettings