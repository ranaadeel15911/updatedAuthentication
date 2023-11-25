'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  const route = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:'',
  })
  const [buttonDisabled,setbuttonDisabled] = useState(false)
  useEffect(() => {  
    if (user.email.length > 0 && user.password.length > 0) {
     setbuttonDisabled(false) 
    }
    else{
      setbuttonDisabled(true)
    }
  }, [user])
  const [loading,setLoading] = useState(false)
  const onLogin = async() =>{
    console.log(user.email,user.password)
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      toast('Successfully Loged In', {
        icon: '✅',
      });      
      console.log("Success true",response.data)
      route.push('/profile')
    } catch (error : any) {
      console.log('Signup Failed')
      toast.error(error.message)
    } finally{
setLoading(false)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-center text-white text-2xl'>
          {loading ? "Processing" : "Login"}
          </h1>
          <label htmlFor="email">Email</label>
          <input value={user.email} style={{color:'black'}} type="text" id='email' placeholder='type email here...' onChange={(e)=>setUser({...user,email:e.target.value})}/>
          <label htmlFor="password">Password</label>
          <input value={user.password} style={{color:'black'}} type="text" id='password' placeholder='type password here...' onChange={(e)=>setUser({...user,password:e.target.value})}/>
        <button onClick={onLogin} style={{margin:6,paddingLeft:6,paddingRight:6,background:'white',color:'black' }} className='rounded'>{buttonDisabled ? 'No Login' : 'Login'} </button>
        <Link href={'/signup'} style={{background:'white',color:'black',padding:3}} className='rounded'>Sign Link</Link>
        </div>
  )
}
