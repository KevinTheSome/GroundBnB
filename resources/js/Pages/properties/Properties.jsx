import { useState , useEffect } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

function Properties({auth , property})
{
    const [price , setPrice] = useState([property.price , 1])
    const [error , setError] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        startDate : new Date().toISOString().split("T")[0],
        endDate : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
        property_id : property.id,
        price : property.price,
        days : 1,
    })

    useEffect(() => {
        function onPriceChange(startDate ,endDate){
            let date1 = new Date(startDate);
            let date2 = new Date(endDate);
            
            let Difference_In_Time = ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            if(Difference_In_Time < 0){
                setError('Start date must be before end date')
                setPrice([property.price , 1])
            }
            let price = (Difference_In_Time * property.price)
            setPrice([Difference_In_Time * property.price , Difference_In_Time])
            setData('price', price)
            setData('days', Difference_In_Time)
        }
        onPriceChange(data.startDate , data.endDate)
    }, [data.startDate , data.endDate])



    function handleSubmit(e){
        e.preventDefault()
        
        if(data.startDate == '' || data.endDate == '' || data.startDate == NaN || data.endDate == NaN){
            setError('Please fill out all fields')
            return
        }

        if(price[1] < 0){
            setError('Start date must be before end date')
            setData('startDate', new Date().toISOString().split("T")[0])
            setData('endDate', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0])
            setPrice([property.price , 1])
            return
        }
        console.log(data)
        post('/reservation')
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
                                        <label>
                                            <span className='text-white text-xl'>Start Date:</span>
                                            <input type="date" value={data.startDate} onChange={(e) => setData('startDate' , e.target.value)} name="startDate" id="startDate" min={new Date().toISOString().split("T")[0]} />
                                        </label>

                                        <br/>

                                        <label>
                                            <span className='text-white text-xl'>End Date:</span>
                                            <input type="date" value={data.endDate} onChange={(e) => setData('endDate' , e.target.value)} name="endDate" id="endDate" min={new Date().toISOString().split("T")[0]} />
                                        </label>

                                        <p className='text-red-500'>{errors.startDate}</p>
                                        <p className='text-red-500'>{errors.endDate}</p>

                                        <p className='text-white'>{price[0]}€ for {price[1]}</p>
                                        <p className='text-red-500'>{error}</p>
                                        
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