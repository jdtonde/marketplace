import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import  visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'


function SignIn() {
    const [showPassword,setShowPassWord]= useState(false)

    const [formData,setFormData]= useState({
        email:'',
        password:'' 
    })

   const {email,password} = formData

   const navigate =useNavigate()

   const onChange=(e)=>{
        setFormData((x)=>({
            ...x,
            [e.target.id]: e.target.value
        }))
   }

   const onSubmit= async (e)=>{
     e.preventDefault()
        try{
        const auth =getAuth()

        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        if(userCredential.user){
            navigate('/')
        }}
        catch(error){
            toast.error('Wrong Credentials')
        }
   }

  return (
    <>
    <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Welcome back! 
            </p>
        </header>
        <form onSubmit={onSubmit}>
            <input type="email" className='emailInput'  placeholder='Email' id='email' value={email} onChange={onChange}/>
            <div className="passwordInput">
                <input type={showPassword? 'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password
                } onChange={onChange} />
                {/* <img src={visibilityIcon} className='showPassword' alt="show password" onClick={()=>setShowPassWord((x)=> !x )} /> */}
            </div>
            <Link to='/forgot-password' className='forgotPassWordLink'>
                Forgot Password
            </Link>

            <div className="signInBar">
                <p className="signInText">
                    Sign In
                </p>
                <button className='signInButton'>
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
                </button> 
            </div>

        </form>

        {/* gOOGLE Authentigication OAUTH */}
                <OAuth/>
        <Link to='/sign-up' className='registerLink'> Sign Up Instead</Link>
    </div>
    </>
  )
}

export default SignIn