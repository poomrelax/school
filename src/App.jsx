import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppStle from './App.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";
import Nav from './components/nav/Nav'

function App() {
  const url = 'https://node-api-production-d005.up.railway.app/school'

  const [Text, setText] = useState("")
  const [Loadding, setLoadding] = useState(false)

  async function submit(e) {

    try{
        setLoadding(true)
      e.preventDefault()
      await axios.post(url , {
        text: Text
      }).then(r=> {
        toast.success("add success")
      })
    }catch(err) {
      console.log(err)
    }finally{
      setLoadding(false)
      setText("")
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if(!user) {
      localStorage.setItem("user", "user")
    }
  }, [])

  return (
    <>
      <Nav/>
      <ToastContainer/>
      <div className={AppStle.container}>
        <div className={AppStle.content}>
         <form onSubmit={submit}>
         <h3>ความในใจ</h3>
          <input type="text" value={Text} placeholder='ใส่ความในใจ' onChange={e => setText(e.target.value)}/>
          {Loadding ? (
            <>
              <div className={AppStle.loadding} style={{marginTop: '1rem', padding: '10px', display: 'flex', justifyContent: 'center', background: '#eee', borderRadius: '5px'}}><FadeLoader /></div>
            </>
          ) : (
            <>
             <button onClick={submit}>ส่งความในใจ</button>
            </>
          )}
         </form>
        </div>
      </div>
      {/* <footer>&copy; puripat m.3/3</footer> */}
    </>
  )
}

export default App
