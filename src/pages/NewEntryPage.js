import axios from "axios"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import AddNewValue from "../components/AddNewValue"

export default function NewEntryPage() {
    
    const { setReload, token } = useContext(AppContext)
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    let type
    if (location.pathname === "/new-exit") {
        type = "exit"
    } else {
        type = "entry"
    }
    const nagivate = useNavigate()
   
    function registerNewEntry(e) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setLoading(true)
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/update-wallet?`, { value, description, type }, config)
            .then(() => {
                setReload([])
                console.log('test')
                nagivate("/home")
                setLoading(false)
            })
            .catch(err => alert(err.response.data))
    }

    return (
        <>
            <PageName>Nova entrada</PageName>
            <AddNewValue loading={loading} registerNewEntry={registerNewEntry} setValue={setValue} setDescription={setDescription} />
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

