import styled from 'styled-components'
import logOut from '../assets/images/logOut.png'
import plusButton from '../assets/images/plusButton.png'
import minusButton from '../assets/images/minusButton.png'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import {FiTrash2} from 'react-icons/fi'

export default function HomePage() {
    const navigate = useNavigate()

    const { user, reload, token, setReload } = useContext(AppContext)
    const [wallet, setWallet] = useState([])
    const [loading, setLoading] = useState(false)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    useEffect(() => {
        setLoading(true)

        axios.get(`${process.env.REACT_APP_API_URL}/wallet`, config)
            .then(res => {               
                const newWallet = res.data              
                setWallet(newWallet)
                setLoading(false)
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
            setLoading(true)
            axios.delete(`${process.env.REACT_APP_API_URL}/update-wallet/${id}`, config)
                .then(res => setReload([]))
                .catch(err => err.response.message)
            setLoading(false)

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
            <CashFlowContainer loading={loading}>
                {loading ? <Oval
                    color="#8C11BE"
                    secondaryColor="#A328D6"
                    height="80"
                    width="80"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true} /> : wallet.length === 0 ? <h4>Não há registros de  <br /> entrada ou saída</h4> :
                    wallet.map((item) => (
                        <CashFlowItem key={item._id} >
                            <div>
                                <span>{item.date}</span>
                                <Link to={item.type === "entry" ? `/edit-entry/${item._id}` : `/edit-exit/${item._id}`}>
                                    <h2>{item.description}</h2>
                                </Link>
                            </div>
                           
                            <ItemValue type={item.type} >R$ {
                                
                                    (Number(item.value).toFixed(2)).toString().replace(".", ",")
                                   
                            }</ItemValue>
                            <p onClick={() => deleteEntry(item._id)}><FiTrash2 size='0.9em'/></p>
                        </CashFlowItem>


                    ))
                }
            </CashFlowContainer>
            {wallet.length > 0 ?
                <BalanceItem>
                    <h2>Saldo</h2>                   
                    <BalanceValue type={balance.toString()} >R$ {(balance.replace(".", ","))}</BalanceValue>
                </BalanceItem>
                :
                <BalanceItem></BalanceItem>
            }

            <ButtonsContainer>
                <Link to={"/new-entry"}>
                    <button > <img src={plusButton} alt="addImage" /> Nova<br /> entrada</button>
                </Link>

                <Link to={"/new-exit?"}>
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
        align-items:${props => props.loading ? "center" : ""} ;
        justify-content:${props => props.loading ? "center" : ""} ;
        
        h4 {
         margin: auto;
        }
           
         
`
const CashFlowItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 12px;
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
            right: -11px;
            font-size: 16px;
            top: 4px;
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
            font-weight: 700;
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
            transition: 0.4s;
            &:hover {
                background-color: #7c2c9f;
            }
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



