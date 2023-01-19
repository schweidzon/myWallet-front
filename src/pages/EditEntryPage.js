import axios from "axios"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import {  useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import AddNewValue from "../context/components/AddNewValue"

export default function EditEntryPage() {
    const {setReload, token} = useContext(AppContext)
    const location = useLocation()
    let type
    if(location.pathname === "/nova-saida") {
        type = "exit"
    } else {
        type = "entry"
    }
    const nagivate = useNavigate()    
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    function registerNewEntry(e) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/update-wallet?`, {value, description, type}, config)
        .then(() => {
            setReload([])
            console.log('test')
            nagivate("/home")
        })
        .catch(err => alert(err.response.data))

    }

    return (
        <>
            <PageName>Editar entrada</PageName>
           <AddNewValue registerNewEntry={registerNewEntry} setValue={setValue} setDescription={setDescription}/>
        </>
    )

}

const PageName = styled.h1`
    display: flex;
    justify-content:left;
    margin: 30px 20px 40px 25px;
    font-size: 26px;
    color: white;
    font-weight: 700;
`

