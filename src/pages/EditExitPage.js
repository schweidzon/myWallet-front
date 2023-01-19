import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"

export default function EditExitPage() {
    const { setReload, token } = useContext(AppContext)
    const location = useLocation()

    console.log('oi')

    const nagivate = useNavigate()
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    const id = location.pathname.split("/")[location.pathname.split("/").length - 1]

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.put(`${process.env.REACT_APP_API_URL}/update-wallet/${id}`, {}, config)
            .then(res => {
                setValue(((res.data.value).toString().replace(".", ",")))
                console.log((res.data.value).toString().replace(".", ","))
                console.log(res.data.value)
                setDescription(res.data.description)
            })
            .catch(err => console.log(err.response.message))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function editExit(e) {
        e.preventDefault()

        const valueNum = (value.replace(",", "."))
        console.log(valueNum)

        axios.put(`${process.env.REACT_APP_API_URL}/update-wallet/${id}`, { value: valueNum, description }, config)
            .then(() => {
                setReload([])
                console.log('test')
                nagivate("/home")
            })
            .catch(err => alert(err.response.data))

    }

    return (
        <>
            <PageName>Editar saída</PageName>
            <NewEntryForm onSubmit={editExit} >
                <input onChange={(e) => setValue((e.target.value))} type="text" placeholder="Valor" value={`${value}${value.includes(",") ? "" : ",00"}`} />
                <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Descrição" value={description} />
                <button>Atualizar saída</button>
            </NewEntryForm>
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

const NewEntryForm = styled.form`
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
            font-size:20px;
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
            font-weight: 700;
            font-size: 20px;

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

