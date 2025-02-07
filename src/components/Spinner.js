import React  from 'react'
import Loader from './Loader.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img className="my-3" src={Loader} style = {{width: "90px",height: "80px" }} alt="Loading"/>
    </div>
  )
}
export default Spinner
