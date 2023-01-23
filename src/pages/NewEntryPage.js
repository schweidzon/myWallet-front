import axios from "axios"
import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import AddNewValue from "../components/AddNewValue"
import { AiFillHome } from 'react-icons/ai'

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
            <HeaderStyle>
                <PageName>Nova entrada</PageName>
                <Link to="/home">
                    <AiFillHome color="white" size='1.5em' />
                </Link>
            </HeaderStyle>
            <AddNewValue loading={loading} registerNewEntry={registerNewEntry} setValue={setValue} setDescription={setDescription} />
        </>
    )

}

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    margin: 30px 20px 30px 25px;
`

const PageName = styled.h1`
    display: flex;
    font-size: 26px;
    color: white;
    font-weight: 700;
`



