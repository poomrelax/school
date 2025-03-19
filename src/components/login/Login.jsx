import React, { useState, useEffect } from 'react'
import LoginStyle from './Login.module.css'
// import { config } from 'dotenv'
import data from '../../../data.json'
import FadeLoader from "react-spinners/FadeLoader";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login() {

    // config()

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [loadding, setloadding] = useState(false)

    const navigator = useNavigate()


    async function loginSubmit(e) {
            e.preventDefault()
            setloadding(true)
            if(Username == data.username) {
                if(Password == data.password) {
                    toast.success("login success")
                    localStorage.setItem('user', 'admin')
                    setloadding(false)
                    navigator('/data')
                    setUsername("")
                    setPassword("")
                }else {
                    setPassword("")
                    toast.error("รหัสไม่ถูกต้อง")
                    setloadding(false)
                }
            }else{
                setUsername("")
                setPassword("")
                toast.error("username ไม่ถูกต้อง")
                setloadding(false)
            }

    }

    // useEffect(() => {
    //     console.log(data.username)
    // }, [])

  return (
    <>
        <ToastContainer/>
        <div className={LoginStyle.container}>
            <div className={LoginStyle.content}>
                <h3>Login</h3>
                <form action="" onSubmit={loginSubmit}>
                    <div className={LoginStyle.from}>
                        <p>Username</p>
                        <input autoFocus type="text" placeholder='Username' value={Username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className={LoginStyle.from}>
                        <p>Password</p>
                        <input type="password" placeholder='Password' value={Password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    {loadding ? (
                    <>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}><FadeLoader width={5}/></div>
                    </>
                ) : (
                    <>
                        <button onClick={() => loginSubmit()}>Submit</button>
                    </>
                )}
                </form>
              
            </div>
        </div>
    </>
  )
}

export default Login