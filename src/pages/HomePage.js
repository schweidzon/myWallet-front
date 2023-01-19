import styled from 'styled-components'
import logOut from '../assets/images/logOut.png'
import plusButton from '../assets/images/plusButton.png'
import minusButton from '../assets/images/minusButton.png'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function HomePage() {
    const navigate = useNavigate()

    const { user, reload, token, setReload } = useContext(AppContext)
    const [wallet, setWallet] = useState([])
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/values`, config)
            .then(res => {
                console.log(res.data)
                const newWallet = res.data
                console.log(user)
                setWallet(newWallet)
            })
            .catch(err => {
                alert(err.response.data)
                navigate("/")

            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])
    let userName = user.charAt(0).toUpperCase() + user.slice(1)
    let balance

    balanceCalculator()
    function balanceCalculator() {
        const balanceArray = wallet.map((item) => {
            if (item.type === "entry") {
                return Number((item.value).replace(",", "."))
            } else {
                return Number(-item.value.replace(",", "."))
            }

        })

        balance = (balanceArray.reduce((acc, current) => acc + current, 0)).toFixed(2).toString()
        balance.replace(".", ",")
        return balance
    }

    function deleteEntry(id) {
        if (window.confirm("Você tem certeza que deseja deletar uma mensagem?")) {
            axios.delete(`${process.env.REACT_APP_API_URL}/update-wallet/${id}`, config)
            setReload([])
        }
    }


    return (
        <>
            <TopStyle>
                <h1>Olá, {userName}</h1>
                <Link to="/">
                    <img src={logOut} alt="outImage" />
                </Link>
            </TopStyle>
            <CashFlowContainer>
                {wallet.length === 0 ? <h4>Não há registros de  <br /> entrada ou saída</h4> :
                    wallet.map((item) => (
                        <CashFlowItem key={item._id} >
                            <div>
                                <span>{item.date}</span>
                                <Link to={item.type === "entry" ? `/editar-entrada/${item._id}` : `/editar-saida/${item._id}`}>
                                    <h2>{item.description}</h2>
                                </Link>
                            </div>
                            {console.log(item.type)}
                            <ItemValue type={item.type} >R$ {
                                item.value % 1 === 0 ?
                                    (Number(item.value).toFixed(2)).toString().replace(".", ",")
                                    : item.value.replace(".", ",")
                            }</ItemValue>
                            <p onClick={() => deleteEntry(item._id)}>x</p>
                        </CashFlowItem>


                    ))
                }
            </CashFlowContainer>
            {wallet.length > 0 ?
                <BalanceItem>
                    <h2>Saldo</h2>
                    {console.log(typeof balance)}
                    <BalanceValue type={balance.toString()} >R$ {(balance.replace(".", ","))}</BalanceValue>
                </BalanceItem>
                :
                <BalanceItem></BalanceItem>
            }

            <ButtonsContainer>
                <Link to={"/nova-entrada"}>
                    <button > <img src={plusButton} alt="addImage" /> Nova<br /> entrada</button>
                </Link>

                <Link to={"/nova-saida"}>
                    <button> <img src={minusButton} alt="addImage" />Nova<br /> saída</button>
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
        min-height: 416px;
        max-height: 446px;
        display: flex;
        flex-direction: column;
        margin: auto;
        border-radius: 5px;
        font-size: 20px;
        color: #868686;
        text-align: center;
        background-color: white;
        padding-top: 10px;
        gap: 13px;
        position: relative;
        overflow-y: scroll;
        h4 {
         margin: auto;
        }
           
         
`
const CashFlowItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    word-break: break-all;
    position: relative;
        h2 {
            color: black;
        }
        div {
            display: flex;
            gap: 10px;
            margin-left: 10px;
            width: 170px;
        }
        p {
            cursor: pointer;
            position: absolute;
            right: -10px;
        }
      
    
    
`
const BalanceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:flex-end;
    margin: auto;
    word-break: break-all;
    width: 326px;
    height: 50px;
    border-radius: 5px;
    background-color: white;
    margin-top: -15px;
    margin-bottom: 20px;
    padding-right: 10px;
    padding-left:10px;
    padding-bottom: 3px;
    font-size: 20px;
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

const ItemValue = styled.h3`
    margin-right: 5px;
    color: ${props => props.type === "entry" ? "#03AC00" : "#C70000"}
`

const BalanceValue = styled.p`
     color: ${props => props.type.includes("-") ? "#C70000" : "#03AC00"}
`



