import React, { useState, useEffect } from 'react'
import NavStyle from './Nav.module.css'
import { useNavigate } from 'react-router-dom'

function Nav() {

    const navigator = useNavigate()

  return (
    <>
        <div className={NavStyle.container}>
            <h3 onClick={() => navigator('/')}>heart</h3>
            <div className={NavStyle.detall}>
                <a onClick={() => navigator('/data')}>Data</a>
            </div>
        </div>
    </>
  )
}

export default Nav