import { router , Link, useForm , Head } from '@inertiajs/react'

function Propertie(props)
{  
    console.log(props.Propertie)
    const { data, setData, post, processing, errors } = useForm({
        reservation_id : props.Propertie.id,
    })

    function handleSubmit(e){
        e.preventDefault()
        
        post('/reservation/myproperties/accept')
    }

    return (
      <div className='grid '>
          <div className="border border-spacing-1 rounded-lg p-4 bg-cyan-100">
            <meta name="description" content="A available house to rent"></meta>
            <h1 className='text-2xl '>{props.Propertie.description}</h1>
            <p>{props.Propertie.address}</p>
            <p>start_date: {props.Propertie.start_date}</p>
            <p>end_date: {props.Propertie.end_date}</p>
            <p>{props.Propertie.days} Days In total</p>
            <p>{props.Propertie.reservation_price}€ In total</p>

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="reservation_id" value={data.reservation_id} />
                {props.Propertie.taken ? <p className='w-full text-black bg-cyan-200 pointer-events-none focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Already taken</p>: <button type="submit" className='w-full text-white bg-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Accept</button>}
            </form>

          </div>
      </div>
    )
}

export default Propertie