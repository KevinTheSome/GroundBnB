import { Link } from '@inertiajs/react'
function Propertie(props)
{  
  console.log(props.Propertie)
    return (
      <>
      <Link href={`/properties/${props.Propertie.id}`}>
        <div className="border border-spacing-1 rounded-lg p-4 bg-cyan-100">
          <meta name="description" content="A available house to rent"></meta>
          <h1 className='text-2xl '>{props.Propertie.description}</h1>
          <p>{props.Propertie.address}</p>
          <p>{props.Propertie.price}€ Per night</p>
          <img src={"/storage/"+props.Propertie.image} className='w-[100%] h-[10vh] object-cover' alt="house"></img>
        </div>
      </Link>
      </>
    )
}

export default Propertie