import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  width: 400px;
  height: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
`;

export const Add = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 60px;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  border:1px solid white;
  

  :hover{
    background: #ffb347;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #ffcc33, #ffb347);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #ffcc33, #ffb347); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .plusFont {
    font-size: 34px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 50%;
    margin-left: 10px;
    height: 50px;
    cursor: pointer;
  }
  .text {
    width: 100%;
    font-weight: 800;
    font-size: 20px;
    text-align: center;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
  .expiry {
    display: flex;
    flex-direction: column;
  }
  .cvc {
    display: flex;
    flex-direction: column;
  }
`;

export const Inputs = styled.div`
  height: 65px;
  width: 90%;
  input {
    width: ${({ inputSize }) => (inputSize === "small" ? "85%" : "100%")};
    height: 30px;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;

  div {
    margin-left: 25px;

    button {
      padding: 6px;
      border-radius: 10px;
      width: 80px;
    }

    .btn-grad {
      background-image: linear-gradient(
        to right,
        #f09819 0%,
        #edde5d 51%,
        #f09819 100%
      );
    }
    .btn-grad:hover {
      background-position: right center;
    }
  }
`;

export const Error = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: red;
`;