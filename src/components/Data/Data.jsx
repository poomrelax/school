import React, { useState, useEffect } from 'react'
import DataStyle from './Data.module.css'
import axios from 'axios'
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';

function Data() {

    const navigator = useNavigate()

    const userStatus = localStorage.getItem('user')

    if(!userStatus) {
        localStorage.setItem('user', 'user')
    }

    const url = 'http://localhost:2553/school/'
    // const url = 'https://node-api-production-d005.up.railway.app/school'

    const [Data, setData] = useState([])
    const [loadding, setLoadding] = useState(true)
    const [loaddingBtn, setLoaddingBtn] = useState(false)

    async function fectApi() {
        try{
            await axios.get(url).then(r => {
                // console.log(r.data)
                setData(r.data)
            })
        }catch(err) {
            console.log(err)
        }

        finally{
            setLoadding(false)
        }
    }

    async function deleteContent(id) {
        setLoaddingBtn(true)
        if(userStatus == 'user') {
            navigator('/login')
            setLoaddingBtn(false)
        }else if(userStatus == 'admin') {
            await axios.delete(url + id).then(r => {
                console.log(r)
                setLoaddingBtn(false)
                fectApi()
            })
        }
    }

    useEffect(() => {
        fectApi()
    }, [])
  return (
    <>
        {loadding ? (
            <>
                <div className={DataStyle.loadding}>
                    <FadeLoader color='#fff' width={5}/>
                </div>
            </>
        ): (
            <>
            <Nav/>
                <div className={DataStyle.container}>
            {Data.map((data, index) => {
                console.log(data.Text)
            if(Data.length === null) {
                // return (
                //     <>
                //         <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                //             <h1 style={{color: '#fff'}}>ยังไม่มีข้อมูล</h1>
                //         </div>
                //     </>
                // )
                alert("ยังไม่มีข้อมูล")
            }else {
                return (
                    <>
                            <div className={DataStyle.data}>
                        <h3>{data.Text}</h3>
                        <p>{data.Date}</p>
                        {loaddingBtn ? (
                            <>
                                <div className={DataStyle.btn_loadding}>Loadding...</div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => deleteContent(data._id)}>Delete</button>
                            </>
                        )}
                </div>
                    </>
                )
            }
            })}
        </div>
            </>
        )}
    </>
  )
}

export default Data