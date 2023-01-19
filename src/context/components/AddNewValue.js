import styled from "styled-components"
import { useLocation } from "react-router-dom"

export default function AddNewValue({setValue, setDescription, registerNewEntry}) {
    const location = useLocation()
    return (

        <NewEntryForm onSubmit={registerNewEntry} >
            <input onChange={(e) => setValue(e.target.value)} type="text" placeholder="Valor" />
            <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Descrição" />
            <button>Salvar {location.pathname === "/nova-entrada" ? 'entrada' : 'saída'}</button>
        </NewEntryForm>

    )
}

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