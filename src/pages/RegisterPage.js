import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import myWalletImage from '../assets/images/MyWallet.png'





export default function RegistarPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function register(e) {
        e.preventDefault()
        
        const user = {
            name,
            email,
            password,
            confirmPassword
        }
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        
        console.log(user)
         axios.post("http://localhost:5000/cadastro", user)
         .then(res => {
            alert(res.data)
            navigate("/")

         })
         .catch(err => console.log(err.response.data))
    }

    return (
        <>
            <MyWalletContainer src={myWalletImage} />
            <RegisterForm onSubmit={register}>
                <input required type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/>
                <input required type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input required type='password' placeholder='Senha'value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input required type='password' placeholder='Confirma a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button>Cadastrar</button>
                <p>Já tem uma conta? <Link to={"/"}><span>Entre agora!</span></Link></p>

            </RegisterForm>
        </>

    )
}

const MyWalletContainer = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 95px;
    margin-bottom: 28px;

`

const RegisterForm = styled.form`
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