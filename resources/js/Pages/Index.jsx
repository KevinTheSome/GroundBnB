import NavBar from '../components/NavBar'
import Propertie from '../components/Propertie'

function Index({auth , properties})
{
    const propertieJSX = properties.map((propertie, key) => {
        return (
          <Propertie Propertie={propertie} key={key} />
        )
    })
      

    return(
        <>

            <NavBar user={auth.user}/>
            <div className='w-full h-full'>

                <section className='grid grid-cols-3 gap-2 grid-rows-5 w-full p-4 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {properties.length == 0 ? <h1 className="text-3xl font-bold text-center p-4">No properties found</h1> : propertieJSX}
                </section>
                
            </div>
        </>
    )
}

export default Index