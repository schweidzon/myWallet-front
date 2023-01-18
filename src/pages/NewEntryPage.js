import axios from "axios"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import {  useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import AddNewValue from "../context/components/AddNewValue"

export default function NewEntryPage() {
    const {user, setReload} = useContext(AppContext)
    const nagivate = useNavigate()


    console.log(dayjs().format("DD/MM"))
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    function registerNewEntry(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/update-wallet`, {user, value, description, type: "entry"})
        .then(() => {
            setReload([])
            console.log('test')
            nagivate("/home")
        })

    }

    return (
        <>
            <PageName>Nova entrada</PageName>
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

