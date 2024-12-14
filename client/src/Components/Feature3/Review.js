import React from 'react'
import { useParams } from 'react-router-dom'

const Review = ({details}) => {
    let  {revId} = useParams();
    let result = details?.data.find((detail)=>detail.image === revId+".jpg");
    console.log(result)
  return (
    
    <div>
      <p>{result?._id}</p>
      <img className='object-cover h-48 w-96 border   rounded-xl ' src={`http://127.0.0.1:3001/`+result?.image} alt="" />
      <p>&#9733;</p>
    </div>
  )
}

export default Review