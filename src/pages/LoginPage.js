import axios from 'axios'
import { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import myWalletImage from '../assets/images/MyWallet.png'
import AppContext from '../context/AppContext'


export default function RegistarPage() {

    const navigate = useNavigate()

    const { setUser, setToken } = useContext(AppContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    function login(e) {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/`, { email, password })
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.token)
                navigate("/home")
                setLoading(false)
            })
            .catch(err => alert(err.response.data))

    }

    return (
        <>
            <MyWalletContainer src={myWalletImage} />
            <RegisterForm onSubmit={login} >
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail' required />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha' required />
                <button>{!loading ? 'Entrar' :
                    <ThreeDots
                        color="#FFFFFF"
                        height="60"
                        width="60"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true} />}</button>
                <p>Primeira vez? <Link to="/sign-up"><span>Cadastre-se!</span></Link> </p>
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
            font-size: 20px;
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
                font-size: 15px;
                font-weight: 700;
            }
        }

`