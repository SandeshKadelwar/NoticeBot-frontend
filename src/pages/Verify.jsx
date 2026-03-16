import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const Verify = () => {
    const {token}= useParams();
    const [status, setStatus]= useState('Verifying your account...');
    const navigate= useNavigate()

    useEffect(()=>{
        const VerifyEmail= async()=>{
            try {
                const res= await axios.post(`${process.env.BACKEND_BASEURL}/user/verify`, {}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(res.data.success){
                    setStatus('✅ Your account has been successfully verified. You can now log in.')
                    setTimeout(()=>{
                        navigate('/login')
                    }, 2000)
                }else{
                    setStatus('❌ Invalid or Expired Verification Token.')
                }
            } catch (error) {
                console.log(error);
                setStatus('❌ Verification failed. Please try again.')
            }
        }

        VerifyEmail();
    }, [token, navigate]);
  return (
    <div className='relative w-full h-190 overflow-hidden bg-blue-100'>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-6 rounded-xl shadow-lg text-center w-[90%] max-w-md'>
            <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
        </div>
      </div>
    </div>
  )
}

export default Verify
