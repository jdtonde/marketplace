import React from 'react'
import { useState,useEffect } from 'react'
import { useParams, useSearchParams} from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'



function Contact() {
    
    //eslint-disable-next-line react-hooks/exhaustive-deps

    const [message,setMessage]=useState('')
    const [landlord, setLandLord] = useState(null)
    const [searchParams, setSearchParams]= useSearchParams()

    const params= useParams()

    useEffect(()=>{
        const getLandLord= async()=>
        {
            const docRef= doc (db,'users',params.landlordId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                setLandLord(docSnap.data())
            }
            else{
                toast.error('Could not get landlord data')
            }
        }
        getLandLord()
    },[params.landlordId])


    const onChange= (e)=>{
        setMessage(e.target.value)
    }
  return (
    <div className='pageContainer'>
        <header>
            <p className="pageHeader">Contact LandLord</p>
        </header>

        {landlord !== null && (
            <main>
                <div className="contactLandlord">
                    <p className="landlordName">Contact {landlord?.name}</p>
                </div>
                <form className="messageF orm">
                    <div className="messageDiv">
                        <label htmlFor="message" className="messageLabel">Message</label>
                        <textarea name="message" id="message" className='="texarea' value={message} onChange={onChange}></textarea>
                    </div>

                    <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                        <button  type ='button' className="primaryButton"> Send Message</button>
                    </a>
                </form>
            </main>
        )}
    </div>
  )
}

export default Contact