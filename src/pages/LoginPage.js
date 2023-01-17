import { Link } from 'react-router-dom'
import styled from 'styled-components'
import myWalletImage from '../assets/images/MyWallet.png'


export default function RegistarPage() {
    return (
        <>
            <MyWalletContainer src={myWalletImage} />
            <RegisterForm>
                <input  type="email" placeholder='E-mail' required/>
                <input type="password" placeholder='Senha' required/>
                <button>Entrar</button>
                <p>Primeira vez? <Link to="/cadastro"><span>Cadastre-se!</span></Link> </p>
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