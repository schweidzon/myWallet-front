import styled from 'styled-components'
import logOut from '../assets/images/logOut.png'


export default function HomePage() {
    return (
        <>
            <TopStyle>
                <h1>Olá, Fulano</h1>
                <img src={logOut} alt="outImage"/>
            </TopStyle>
            <TextStyle type="text" placeholder='Não há registros de entrada ou saída' />
            <div>
            <button></button>

            <button></button>
            </div>
        </>

    )
}

const TopStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 20px 30px 20px;
    h1 {
        font-size: 26px;
        color: white;
    }
    
`

const TextStyle = styled.textarea`
    width: 326px;
    height: 446px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border-radius: 5px;
    text-align: center;
    
        &::placeholder {
           font-size:20px;
           color:#868686 ;
           line-height: 423px;
           text-align: center;
          
          
        }
    
`
