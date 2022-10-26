import React,{useState} from "react";


import styled from "styled-components";
import DeleteCard from './DeleteCard';
import UpdateCard from './UpdateCard'
import axios from '../axios'
function SavedCards(props) {
  const [data,setData]=useState([])
const [openCard, setOpen] = useState(false);
const [Edit, setEdit] = useState(false);



const opensavedCard=(e)=>
{
e.preventDefault();
fetchData();
  props.setsaveCard(!props.saveCard);
}

const openCards=(e)=>
{
  e.preventDefault();
setOpen(!openCard);
}

const fetchData=async()=>
    {
      
      const result=await axios.get("/cards/get");
      console.log(result.data);
        setData(result.data)
        props.setsaveCard(!props.saveCard);
    }
        




  return (
    <Container>
    <Add onClick={opensavedCard}>
    {/* <div className='text'>Your saved credit and debit cards</div> */}
    Your saved credit and debit cards
   </Add>
 
      {props.saveCard && (data.length<1 ? <Details> No cards have been saved yet</Details> : data.map((cardsitem,id) => {
        return (
         <Cards key={id}>
          <Cardname onClick={openCards} >
            Card ending with {cardsitem.card.slice(-4)}
        </Cardname>

        {openCard && 
        (<Details>
        <Detailschild>
        <label>Card Number
       </label>
       <p> {cardsitem.card.replace(cardsitem.card.substring(5,14),"**** ****")}</p>
       <label>Name on card
       </label>
       <p>{cardsitem.cardHolder}</p>
          </Detailschild>
          <Detailschild>
          <label>Expiry date
       </label>
          <p>{cardsitem.expiry}</p>
       <DeleteCard id={cardsitem._id} Fetchdata={fetchData}></DeleteCard>
       <UpdateCard Edit={Edit} setEdit={setEdit} id={cardsitem._id} Fetchdata={fetchData}></UpdateCard>
        </Detailschild>    
      </Details>
        )
        }
       
        </Cards >
        );
      }))
      }
     
      </Container>
    
  );
}

const Add = styled.button`
  display: flex;
  align-items: center;
  width:100%;
  height: 60px;
  color: black;
padding:0 0 0 10px;
  cursor: pointer;
  `;

  const Cardname = styled.button`
  display: flex;
  align-items: center;
  width:100%;
  height: 60px;
  color: black;

  cursor: pointer;
 
  `;

  const Cards=styled.div`
  margin:20px 10px 5px 10px;
    height: fit-content;
    border-radius: 8px;
    border:1px solid grey;
  `;

  const Container = styled.div`
  margin:30px 10px 0 10px;
   height: fit-content;
   border-radius: 8px;
   border:1px solid grey;
 `;

 const Details=styled.div`
  display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-gap: 20px; 
  margin:10px ;
  height:fit-content;
 `
 ;



 const Detailschild=styled.div`
  label {
    font-size: 14px;
    font-weight: 600;
  }
  p
  {
margin-top:auto;
  }
 `;



 


export default SavedCards;