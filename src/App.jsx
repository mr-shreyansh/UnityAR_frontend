import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const rides = [
    "rollercoaster",
    "ferriswheel",
    "merrygoround"
  ]

  const [times, setTimes] = useState(
    {
     "rollercoaster":'0',
     "ferriswheel":'0',
     "merrygoround":'0'
   }

  )

  const handleTime = async (ride, event) => {
    event.preventDefault();
    try {
      console.log(ride, count);
      await axios.patch('https://unityar-backend-1.onrender.com/rideInfo', {
        rideName: ride,
        waitingTime: `${count} mins`
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      await showCurrentTime(ride);
    } catch (e) {
      console.log(e);
    }
  };

  const showCurrentTime = async (ride) => {
    try {
      console.log(ride, count)
      const data =await axios.get(`https://unityar-backend-1.onrender.com/rideInfo?rideName=${ride}`,{
        headers:{
          'Access-Control-Allow-Origin':'*'
        }
      })
      console.log('waiting time',data.data.data.waitingTime)
      setTimes((prev)=>({
        ...prev,
        ride:data.data.data.waitingTime
      }))
      times[ride] = data.data.data.waitingTime
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    rides.map((ride)=>{
      showCurrentTime(ride)
    })
  },[])

  return (
    <>
      <div>
        <h1>Nicco Park</h1>

        <form>
          <div>

            <p></p>
          </div>
          <div>
            {
              rides.map((ride, index) => {
                return (
                  <div className='flex flex-col items-center gap-5 border rounded-xl p-3 my-6' key={index}>
                    <div className='flex items-center gap-2'>
                      <h1 className='text-red-200 flex text-[22px] xl:text-[28px] '>Ride:</h1> <h1 className='text-[24px] xl:text-[30px]'>{ride}</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                      <h1 className='text-red-200 flex text-[22px] xl:text-[28px] '>Current Waiting Time:</h1> <h1 className='text-[24px] xl:text-[30px]'>{times[ride]}</h1>
                    </div>
                    <input className='p-2 rounded-xl' onChange={(e) => { setCount(e.target.value) }} />
                    <button className='p-4 w-2/3 outline-none' onClick={(e) => handleTime(ride, e)} >
                      Update
                    </button>
                  </div>
                )
              })
            }
          </div>
        </form>
      </div>



    </>
  )
}

export default App
