import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

function Properties({auth , property})
{

    const { data, setData, post, processing, errors } = useForm({
        startDate : '',
        endDate : '',
        property_id : property.id,
    })

    function handleSubmit(e){
        e.preventDefault()
        post('/properties/'+property.id +'/update')
    }

    return (
        <>
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen">
                    <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 border-cyan-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">My Properties</h1>
                            <label>
                                <span className='text-white text-xl'>Description:</span>
                                <p className='text-white'>{property.description}</p>
                            </label>

                            <label>
                                <span className='text-white text-xl'>Beds:</span>
                                <p className='text-white'>{property.beds}</p>
                            </label>

                            <label>
                                <span className='text-white text-xl'>Address:</span>
                                <p className='text-white'>{property.address}</p>
                            </label>

                            <label>
                                <span className='text-white text-xl'>Price Per Night:</span>
                                <p className='text-white'>{property.price}€</p>
                            </label>

                            <img src={"/storage/"+property.image} className='w-[100%] h-[10vh] object-cover' alt="house"></img>
                            {auth.user.id === property.owner_id ? <Link as='button' href={`/properties/${property.id}/edit`}> <button className='bg-cyan-300 text-white font-bold rounded-lg text-sm px-5 p-3 mx-1 text-center'>Edit</button></Link> : ''}
                            {auth.user.id === property.owner_id ? <Link as='button' method='delete' href={`/properties/${property.id}/delete`}> <button className='bg-red-300 text-white font-bold rounded-lg text-sm px-5 p-3 text-center'>Delete</button></Link> : ''}
                            {auth.user.id === property.owner_id ? '' : 
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <input type="date" name="" id="" />
                                        <input type="date" name="" id="" />
                                        <button type="submit" className='bg-cyan-300 text-white font-bold rounded-lg text-sm px-5 p-3 mx-1 text-center'>Book</button>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Properties