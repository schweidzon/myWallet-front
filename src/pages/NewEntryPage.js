import styled from "styled-components"

export default function NewEntryPage() {
    return (
        <>

            <PageName>Nova entrada</PageName>
            <NewEntryForm>
                <input type="number" placeholder="Valor"/>
                <input type="text" placeholder="Descrição"/>
                <button>Salvar entrada</button>
            </NewEntryForm>

        </>
    )

}

const PageName = styled.h1`
    display: flex;
    justify-content:left;
    margin: 30px 20px 30px 25px;
    font-size: 26px;
    color: white;
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