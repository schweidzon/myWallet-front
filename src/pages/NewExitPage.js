import axios from "axios"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import AddNewValue from "../context/components/AddNewValue"

export default function NewExitPage() {
    const {setReload, token} = useContext(AppContext)
    const nagivate = useNavigate()


    console.log(dayjs().format("DD/MM"))
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    function registerNewEntry(e) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/update-wallet`, {value, description, type: "exit"}, config)
        .then(() => {
            setReload([])
            nagivate("/home")
        })

    }

    return (
        <>
            <PageName>Nova saída</PageName>
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

const NewExitForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin: auto;
    justify-content: center;
    align-items: center;
        input {
            width: 326px;
            height: 58px;
            border-radius: 5px;
            border-style: none;
            padding: 10px;
            &::placeholder {
                font-size: 20px;
                color: black;
            }
        }
        button {
            width: 326px;
            height: 46px;
            background-color: #A328D6;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            font-size: 20px;
            font-weight: 700;

        }
        p {
            margin-top: 30px;
            color: white;
            span {
                color: white;
                text-decoration: underline;
                cursor: pointer;
            }
        }

`