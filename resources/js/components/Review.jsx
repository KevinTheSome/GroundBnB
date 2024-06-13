import { useState , useEffect } from 'react'
function Review(props)
{  
    return (
      <div className='border border-spacing-1 rounded-lg p-4 border-cyan-500 bg-cyan-600 col-start-1 col-end-3'>
        <meta name="Review" content={"A Review about this property with" + props.review.stars+" stars and a description" + props.review.description}></meta>
        <h1 className='text-2xl text-white'>{props.review.name}</h1>
        <p className='text-md text-white'>{props.review.comment}</p>
        <p>
            {[...Array(props.review.stars)].map(( _, key )=> {  //thx https://github.com/Chee3se 👍
                return <span key={key}>⭐</span>
            })}
        </p>
      </div>
    )
}

export default Review