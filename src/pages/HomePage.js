import styled from 'styled-components'
import logOut from '../assets/images/logOut.png'
import plusButton from '../assets/images/plusButton.png'
import minusButton from '../assets/images/minusButton.png'
import { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function HomePage() {
    const { user, wallet, reload, setWallet } = useContext(AppContext)
    console.log(user)
    console.log(wallet)
    useEffect(() => {
        const config = {
            headers: {
                User: user
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/values`, config)
            .then(res => {
                const newWallet = res.data.wallet
                console.log(user)

                setWallet(newWallet)
            })
    }, [reload])





    let balance
    console.log(wallet)



    balanceCalculator()
    function balanceCalculator() {
        const balanceArray = wallet.map((item) => {
            if (item.type === "entry") {
                return Number(item.value)
            } else {
                return Number(-item.value)
            }

        })

        balance = balanceArray.reduce((acc, current) => acc + current, 0)
        return balance
    }
    

    return (
        <>
            <TopStyle>
                <h1>Olá, {user}</h1>
                <img src={logOut} alt="outImage" />
            </TopStyle>
            <CashFlowContainer>
                {/* Não há registros de  <br /> entrada ou saída */}
                {wallet.map((item) => (
                    <CashFlowItem  >
                        <div>
                            <span>{item.date}</span>
                            <h2>{item.description}</h2>
                        </div>
                        <ItemValue type={item.type} >R$ {item.value},00</ItemValue>
                    </CashFlowItem>


                ))}
                {balance === 0 ? '' :
                    <Balance balance={balance.toString()} >
                        <h2>Saldo</h2>
                        <p >R$ {balance},00</p>
                    </Balance>
                }

            </CashFlowContainer>
            <ButtonsContainer>
                <Link to={"/nova-entrada"}>
                    <button > <img src={plusButton} /> Nova<br /> entrada</button>
                </Link>

                <Link to={"/nova-saida"}>
                    <button> <img src={minusButton} />Nova<br /> saída</button>
                </Link>
            </ButtonsContainer>
        </>

    )
}

const TopStyle = styled.div`
            display: flex;
            justify-content: space-between;
            margin: 30px 20px 20px 20px;
            h1 {
                font-size: 26px;
                color: white;
                font-weight: 700;
           }
`

const CashFlowContainer = styled.div`
            width: 326px;
            min-height: 446px;
            display: flex;
            flex-direction: column;
            //justify-content: center;
            //align-items: center;
            margin: auto;
            border-radius: 5px;
            font-size: 20px;
            color: #868686;
            text-align: center;
            background-color: white;
            margin-bottom: 20px;
            padding-top: 10px;
            gap: 10px;
            position: relative;
       
         
`
const CashFlowItem = styled.div`
    display: flex;
    gap: 10px;
    word-break: break-all;
        h2 {
            color: black;
        }
        div {
            display: flex;
            gap: 10px;
            margin-left: 10px;
            width: 180px;
        }
    
`
const Balance = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
    left: 10px;
    gap: 140px;
    color:${props => props.balance.includes("-") ? "#C70000" : "#03AC00"}
        
`

const ButtonsContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  
    
           button {
            width: 155px;
            height: 114px;
            border-radius: 5px;
            background-color: #A328D6;
            color: white;
            position: relative;
            flex-direction:column-reverse;
            text-align: left;
            display: flex;
            padding: 10px;
            font-size: 17px;
            font-weight: 700;
           }
           img {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 22px;
            height: 22px;
           }

`

const ItemValue = styled.p`

           color: ${props => props.type === "entry" ? "#03AC00" : "#C70000"}


`


