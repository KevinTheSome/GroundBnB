import { useState } from 'react'
import {usePage , Head, router } from '@inertiajs/react'
import NavBar from '../components/NavBar'
import Propertie from '../components/Propertie'

function Index({auth , properties})
{
    const [search , setSearch] = useState('')
    const [sort , setSort] = useState('')
    const [error , setErrors] = useState('')
    const propertieJSX = properties.map((propertie, key) => {
        return (
          <Propertie Propertie={propertie} key={key} />
        )
    })
      
    function handleSubmitSearch(e) {
        e.preventDefault()
        if(search == ""){
          router.visit('/')
        }else{
          router.post('/search', {search: search},{
            forceFormData: true,
          })
          setErrors([])
          setSearch("")
        }
      }

      function sortHandeler(e) {
        e.preventDefault()
        setSort(e.target.value)
        router.post('/sort', {sort: sort , search: search},{
          forceFormData: true,
        })
        setErrors([])
      }

    return(
        <>
            <Head title="GroundBnB" />
            <NavBar user={auth.user}/>
            <div className='w-full h-full'>
                <div className='flex'>
                    <form onSubmit={handleSubmitSearch} className='p-4 flex'>
                        <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
                        {error && <p className='text-red-500'>{error}</p>}
                        <button type="submit" className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded'>Search</button>
                    </form>
                    {/* <select onChange={sortHandeler} value={sort} className='bg-cyan-500 text-xl'>
                        <option value={0}>--Please choose an option--</option>
                        <option value={'asc'}>Low to High</option>
                        <option value={'desc'}>High to Low</option>
                    </select> */}
                </div>
                <section className='grid grid-cols-3 gap-2 grid-rows-5 w-full p-4 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {properties.length == 0 ? <h1 className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">No properties found</h1> : propertieJSX}
                </section>
                
            </div>
        </>
    )
}

export default Index