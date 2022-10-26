import React from 'react';
import axios from '../axios';
import MaskedInput from "react-text-mask";

import styled from "styled-components";
import {
  OTHERCARDS,
  EXPIRYDATE,

} from "../constant"

import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
 
} from "../validations"



const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "cardHolder":
      return { ...state, cardHolder: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};



function AddCard(props) {

  const [error, setError] = React.useState({});

  const [state,dispatch]=React.useReducer(reducer,{
    card: "",
    cardHolder: "",
    expiry: ""
  })
   

const handleValidations=(type, value)=>
{
  let errorText;
  switch (type)
  {
    case "card":
      errorText=value==="" ? "Required" : stripeCardNumberValidation(value);
      setError({ ...error, cardError: errorText });
      break;
    case "cardHolder":
      errorText=value==="" ? "Required": textWithSpacesOnly(value);
      setError({ ...error, cardHolderError: errorText });
      break;
    case "expiry":
      errorText=value==="" ? "Required" : stripeCardExpirValidation(value);
      setError({ ...error, expiryError: errorText });
break
      default:
        break;
  }
}

const handleInputData=(e)=>
{
  dispatch({
    type:e.target.name,data:e.target.value
  })
}

const openCard=()=>
{
  props.setCard(!props.addCard);
}

const handleBlur=(e)=>
{
  handleValidations(e.target.name,e.target.value)
}

const checkErrorBeforeSave = () => {
  let errorValue = {};
  let isError = false;
  Object.keys(state).forEach(async (val) => {
    if (state[val] === "") {
      errorValue = { ...errorValue, [`${val + "Error"}`]: "Required" };
      isError = true;
    }
  });
  setError(errorValue);
  return isError;
}

const addCard=(e)=>
    {
      e.preventDefault();
      let errorCheck=checkErrorBeforeSave();
      if(!errorCheck)
      {
     axios
        .post("/cards/add",{...state})
        .then(()=>
        {
           dispatch(
            {
              type:"cleanState",
              data: {
                card: "",
                cardHodler: "",
                expiry: ""
              } 
            }
           )
            
        })
        .catch((err)=>alert(err.message));
   
      }
      props.setCard(false);
      props.setsaveCard(false)
}
  return (
      <Container>
 <Add onClick={openCard}>
    <div className='text'>Add Card</div>
   </Add>
   <FormContainer>
      {props.addCard && (
        <>
<InputContainer>
      <p>Card Number:</p>
       <MaskedInput
         mask={OTHERCARDS}
         name="card"
         guide={false}
         placeholderChar={'\u2000'}
         placeholder="Enter card number"
         required
         onChange={handleInputData}
         value={state.card}
          onBlur={handleBlur}
         />
          {error && error.cardError && error.cardError.length > 1 && (
                        <Error>{error.cardError}</Error>
                      )}
       
        </InputContainer>

<InputContainer>
       <p>CardHolder's Name</p>
      <input type="text"
       required
       name='cardHolder'
       onChange={handleInputData}
placeholder="Enter cardholder's name"
       value={state.cardHolder}
        onBlur={handleBlur}
       />
        {error &&
                error.cardHolderError &&
                error.cardHolderError.length > 1 && (
                  <Error>{error.cardHolderError}</Error>
                )}
      </InputContainer>

<InputContainer>
      <p>Expiry Date:</p>
         <MaskedInput
        mask={EXPIRYDATE}
        name="expiry"
        required
        placeholderChar={"\u2000"}
        placeholder="MM/YY"
      onChange={handleInputData}
            value={state.expiry}
              onBlur={handleBlur}
            />
              {error &&
                    error.expiryError &&
                    error.expiryError.length > 1 && (
                      <Error>{error.expiryError}</Error>
                    )}
       </InputContainer>

          <Button onClick={addCard}>
            Add Card
          </Button>
          </>
      )}
      
       
      </FormContainer>
      </Container>

  );
}

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`

  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 1px solid orange;
    }
  }
`;

const Button = styled.button`
  width: 70%;
  height: 35px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

 const Error = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: red;
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 60px;
  color: black;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  border:1px solid white;
  
  .text {
    width: 100%;
    font-weight: 800;
    font-size: 20px;
    text-align: center;
  }
  `;

export default AddCard;