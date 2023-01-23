import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

export default function AddNewValue({ setValue, setDescription, registerNewEntry, loading }) {
    const location = useLocation()

    return (

        <NewEntryForm onSubmit={registerNewEntry} >
            <input onChange={(e) => setValue((e.target.value).replace(",", "."))} type="text" placeholder="Valor" />
            <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Descrição" />
            <button> {!loading ? location.pathname === "/new-entry" ? 'Salvar entrada' : 'Salvar saída' :
                <ThreeDots
                    color="#FFFFFF"
                    height="60"
                    width="60"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true} />}</button>
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
            transition: 0.4s;
            &:hover {
                background-color: #7c2c9f;
            }
          

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