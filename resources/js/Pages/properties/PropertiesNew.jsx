import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'

function PropertiesNew({auth})
{
    const { data, setData, post, processing, errors } = useForm({
        address : '',
        price : '',
        description : '',
        file_upload : '',
        beds : '',
    })

    function handleSubmit(e){
        e.preventDefault()
        post('/properties', {
            forceFormData: true,
        })
    }

    return (
        <>
            <Head title={"New GroundBnB property"} />
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 border-cyan-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                                Add a new property
                            </h1>
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 md:space-y-6"> 
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-white ">Price</label>
                                    <input value={data.price} onChange={e => setData('price', e.target.value)} type="number" name="price" id="price" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " placeholder="65€" required="" />
                                    {errors.price && <p className='text-red-500'>{errors.price}</p>}
                                </div>
                                <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                                    <input value={data.description} onChange={e => setData('description', e.target.value)} type="text" name="description" id="description" placeholder="a very nice small house to relax" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " required="" />
                                    {errors.description && <p className='text-red-500'>{errors.description}</p>}
                                </div>
                                <div>
                                <label htmlFor="beds" className="block mb-2 text-sm font-medium text-white">How many beds</label>
                                    <input value={data.beds} onChange={e => setData('beds', e.target.value)} type="integer" name="beds" id="beds" placeholder="3" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " required="" />
                                    {errors.beds && <p className='text-red-500'>{errors.beds}</p>}
                                </div>
                                <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">Address</label>
                                    <input value={data.address} onChange={e => setData('address', e.target.value)} type="text" name="address" id="address" placeholder="Latvia , Rūjiena , Upes iela 5" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " required="" />
                                    {errors.address && <p className='text-red-500'>{errors.address}</p>}
                                </div>
                                <div>
                                <label htmlFor="file_upload" className="block mb-2 text-sm font-medium text-white">Foto</label>
                                    <input value ={""} onChange={e => setData('file_upload', e.target.files[0])} type="file" name="file_upload" id="file_upload" placeholder="a very nice small house to relax" className="bg-cyan-100 border border-cyan-900 text-cyan-900 sm:text-sm rounded-lg block w-full p-2.5 " required="" />
                                    {errors.file_upload && <p className='text-red-500'>{errors.file_upload}</p>}
                                </div>
                                <button type="submit" className="w-full text-white bg-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add property</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertiesNew