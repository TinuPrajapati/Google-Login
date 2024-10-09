import React,{useState,useEffect} from 'react';
import axios from "axios"

const Show = () => {
  const [data,setData]= useState({});
  
  const getData= async ()=>{
    try{
      const response = await axios.get("http://localhost:8000/user",{withCredentials:true});
      alert(response.data.msg);
      setData(response.data.userData)
    }catch(err){
      console.log(err)
      alert(err.response.data)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center gap-4'>
      <div>
        <h1>Name: {data.name}</h1>
        <h1>Email: {data.email}</h1>
      </div>
      <div>
        <img src={data.image} alt="no image found" className='rounded-full w-40 h-40' />
      </div>
    </div>
  )
}

export default Show
