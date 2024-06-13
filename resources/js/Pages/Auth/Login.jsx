import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'

function Properties()
{
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })
    const [error , setError ] = useState('')
  
    function handleSubmit(e){
        e.preventDefault()

        post('login')
    }
  
    return (
        <>
            <Head title={"Login at GroundBnB"} />
            <NavBar/>
            <div className='w-full h-screen'>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 border-cyan-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form method="POST" onSubmit={handleSubmit} className="space-y-4 md:space-y-6"> 
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
                                    <input value={data.email} onChange={e => setData('email', e.target.value)} type="email" name="email" id="email" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" required="" />
                                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                                </div>
                                <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input value={data.password} onChange={e => setData('password', e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " required="" />
                                    {errors.password && <p className='text-red-500'>{errors.password}</p>}
                                </div>
                                <p className='text-red-500'>{error}</p>
                                <button type="submit" className="w-full text-white bg-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-light text-white ">
                                    Don’t have an account yet? <a href="/register" className="font-medium text-cyan-900 hover:underline">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Properties