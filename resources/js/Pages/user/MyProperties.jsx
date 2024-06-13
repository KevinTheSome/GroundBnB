import { useState } from 'react';
import { router , Link, useForm , Head } from '@inertiajs/react'

import NavBar from '../../components/NavBar'
import Reservation from '../../components/Reservation'


function MyProperties({auth , reservationes})
{
    console.log(reservationes)

    const propertieJSX = reservationes.map((propertie, key) => {
        return (
          <Reservation Propertie={propertie} key={key} />
        )
    })
  
    return (
        <>
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
                <h1 className='text-4xl text-center pt-5 font-bold'>User properties</h1>
                {propertieJSX}
            </div>
        </>
    )
}

export default MyProperties