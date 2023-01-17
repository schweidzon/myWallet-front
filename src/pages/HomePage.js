import styled from 'styled-components'
import logOut from '../assets/images/logOut.png'
import plusButton from '../assets/images/plusButton.png'
import minusButton from '../assets/images/minusButton.png'

export default function HomePage() {
    return (
        <>
            <TopStyle>
                <h1>Olá, Fulano</h1>
                <img src={logOut} alt="outImage" />
            </TopStyle>
            <CashFlowContainer>
                Não há registros de  <br /> entrada ou saída
            </CashFlowContainer>
            <ButtonsContainer>
                <button>
                    <img src={plusButton}/>
                    Nova<br/> entrada
                    </button>

                <button> <img src={minusButton}/>Nova<br/> saída</button>
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
           }
`

const CashFlowContainer = styled.div`
            width: 326px;
            height: 446px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            border-radius: 5px;
            font-size: 20px;
            color: #868686;
            text-align: center;
            background-color: white;
            margin-bottom: 20px;
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
           }
           img {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 22px;
            height: 22px;
           }

`


