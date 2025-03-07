import React, { useState, useEffect } from 'react'
import DataStyle from './Data.module.css'
import axios from 'axios'

function Data() {

    const url = 'https://node-api-production-d005.up.railway.app/school'

    const [Data, setData] = useState([])

    async function fectApi() {
        await axios.get(url).then(r => {
            // console.log(r.data)
            setData(r.data)
        })
    }

    useEffect(() => {
        fectApi()
    }, [])
  return (
    <>
        <div className={DataStyle.container}>
            {Data.map((data, index) => {
                console.log(data.Text)
            return(
                <>
                <div className={DataStyle.data}>
                    <h3>{data.Text}</h3>
                    <p>{data.Date}</p>
            </div>
                </>
            )
            })}
        </div>
    </>
  )
}

export default Data