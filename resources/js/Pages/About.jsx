import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function About({auth})
{
    return(
        <>
            <NavBar user={auth.user}/>
            <div className='w-full h-screen'>
                <h1 className="text-4xl p-4 font-bold text-center">About</h1>
                <p className='text-2xl p-1 text-center'>Made by Kevin from Latvia🇱🇻</p>
                <p className='text-2xl p-1 text-center'>This is a ripoff of Airbnb 👍</p>
                <p className='text-2xl p-1 text-center'><span className='font-bold'>IF</span> something happens, please don't contact me</p>
                <p className='text-2xl p-1 text-center'>if you are reading this, I hope you have a good day 😀</p>
                <p className='text-2xl p-1 text-center'>I hope you did not have any problems with this "website"</p>
            </div>
            <Footer/>
        </>
    )
}

export default About