import { useState , useEffect } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'
import Review from '../../components/Review'

function Properties({auth , property , reviews})
{
    const [comment , setComment] = useState({comment: '' , stars : 0 , property_id : property.id})
    const [price , setPrice] = useState([property.price , 1])
    const [error , setError] = useState('')
    const [errorComment , setErrorComment] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        startDate : new Date().toISOString().split("T")[0],
        endDate : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
        property_id : property.id,
        price : property.price,
        days : 1,
    })

    const reviewsJSX = reviews.map((review, key) => {
        return (
            <Review review={review} key={key} />
        )
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

    function handleSubmitRewiew(e){
        e.preventDefault()
        
        if(comment.comment == "" || comment.comment == NaN || comment.rating == 0 || comment.rating == NaN){
            setErrorComment('Please fill out all fields')
            return
        }

        if(comment.comment.length > 510){
            setErrorComment('Comment can\'t be longer then 510 characters')
            return
        }

        router.post('/rewiew/add' , comment)
    }

    return (
        <>
            <Head title={"GroundBnB " + property.description} />
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen">
                    <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 border-cyan-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid grid-cols-2">

                        <img src={"/storage/"+property.image} className='w-[100%] h-[10vh] object-cover col-start-1 col-end-3 ' alt="house"></img>

                            <label className='col-start-1 col-end-3'>
                                <span className='text-white text-xl'>Description:</span>
                                <p className='text-white'>{property.description}</p>
                            </label>

                            <span className='text-white text-xl flex col-start-1 col-end-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-200h-40l-26-80h-54v-201q0-33 23.5-56t56.5-23v-120q0-33 23.5-56.5T320-760h320q33 0 56.5 23.5T720-680v120q33 0 56.5 23.5T800-480v200h-54l-26 80h-40l-26-80H306l-26 80Zm240-360h120v-120H520v120Zm-200 0h120v-120H320v120Zm-80 200h480v-120H240v120Zm480 0H240h480Z"/></svg>
                                <p className='text-white text-  '>Sleeping spots:</p>
                                <p className='text-white'>{property.beds}</p>
                            </span>

                            <label className='col-start-1 col-end-3'>
                                <span className='text-white text-xl '>Address:</span>
                                <p className='text-white'>{property.address}</p>
                            </label>

                            <label className='col-start-1 col-end-3'>
                                <span className='text-white text-xl'>Price Per Night:</span>
                                <p className='text-white'>{property.price}€</p>
                            </label>

                            
                            {auth.user.id === property.owner_id ? <Link as='button' href={`/properties/${property.id}/edit`}> <button className='bg-cyan-300 text-black font-bold rounded-lg text-sm px-5 p-3 mx-1 w-[90%] text-center'>Edit</button></Link> : ''}
                            {auth.user.id === property.owner_id ? <Link as='button' method='delete' href={`/properties/${property.id}/delete`}> <button className='bg-red-300 text-black font-bold rounded-lg text-sm px-5 p-3 w-[90%] text-center'>Delete</button></Link> : ''}
                            {auth.user.id === property.owner_id ? '' : 
                                <>
                                    <form onSubmit={handleSubmit} className='grid grid-cols-2 col-start-1 col-end-3'>
                                        <label className='col-start-1 col-end-1'>
                                            <span className='text-white text-xl'>Start Date:</span>
                                            <input type="date" value={data.startDate} onChange={(e) => setData('startDate' , e.target.value)} name="startDate" id="startDate" min={new Date().toISOString().split("T")[0]} />
                                        </label>

                                        <br/>

                                        <label className='col-start-2 col-end-2 row-start-1 row-end-1'>
                                            <span className='text-white text-xl'>End Date:</span>
                                            <input type="date" value={data.endDate} onChange={(e) => setData('endDate' , e.target.value)} name="endDate" id="endDate" min={new Date().toISOString().split("T")[0]} />
                                        </label>

                                        <p className='text-red-500'>{errors.startDate}</p>
                                        <p className='text-red-500'>{errors.endDate}</p>

                                        <p className='text-white col-start-1 col-end-3 row-start-3 row-end-4'>{price[0]}€ for {price[1]}</p>
                                        <p className='text-red-500'>{error}</p>
                                        
                                        <button type="submit" className='bg-cyan-300 text-white font-bold rounded-lg text-sm px-5 p-3 mx-1 text-center col-start-1 col-end-3 row-start-4 row-end-5'>Book</button>
                                    </form>
                                </>
                            }
                            {auth.user.id === property.owner_id ? '' : <>
                                <form onSubmit={handleSubmitRewiew} className='grid grid-cols-2 col-start-1 col-end-3'>
                                <label className='grid col-start-1 col-end-3'>
                                    <span className='text-white text-xl'>Description:</span>
                                    <textarea value={comment.comment} onChange={(e) => setComment({...comment , comment : e.target.value})} name="reviewComment" id="reviewComment" />
                                </label>
                                <br/>
                                <label className='grid col-start-1 col-end-3'>
                                    <span className='text-white text-xl'>Rating:</span>
                                    <select onChange={(e) => setComment({...comment , stars : e.target.value})} className='bg-cyan-300 text-xl'>
                                        <option value={0}>--Please choose an option--</option>
                                        <option value={1}>⭐</option>
                                        <option value={2}>⭐⭐</option>
                                        <option value={3}>⭐⭐⭐</option>
                                        <option value={4}>⭐⭐⭐⭐</option>
                                        <option value={5}>⭐⭐⭐⭐⭐</option>
                                    </select>
                                </label>
                                <br/>
                                <p className='text-red-500'>{errorComment}</p>
                                <button type="submit" className='bg-cyan-300 text-white font-bold rounded-lg text-sm px-5 p-3 mx-1 text-center col-start-1 col-end-3 row-start-5 row-end-6'>Leave a review</button>
                                </form>
                            </> }
                            
                            {reviewsJSX ?? <p>No reviews yet</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Properties