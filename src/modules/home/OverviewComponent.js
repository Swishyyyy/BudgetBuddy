import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    font-family: Montserrat;
    width: 100%;
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;
const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
`;
const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: flex;
  color: #0d1d2c;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTransactionView = (props) => {
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");

    const addTransaction =()=>{
        props.addTransaction({ 
            amount:Number(amount),
             desc, 
             type, 
             id: Date.now(), 
            });
       props.toggleAddTxn();
    };

   return(
    <AddTransactionContainer>
       <input placeholder="Amount" 
       value = {amount} 
       type = "number"
       onChange={(e) => setAmount(e.target.value)}
       />
       <input placeholder="Description"
       value = {desc} 
       onChange={(e) => setDesc(e.target.value)}
       />
       <RadioBox>
         <input type="radio" 
         id = "expense" 
         name = "type" 
         value="EXPENSE" 
         checked= {type ==="EXPENSE"}
         onChange={(e) => setType(e.target.value)}
         />
         <label htmlFor = "expense">Expense</label>
         <input 
         type="radio"
         id = "income" 
         name = "type" 
         value="INCOME" 
         checked= {type ==="INCOME"}
         onChange={(e) => setType(e.target.value)}
         />
         <label htmlFor = "income">Income</label>
       </RadioBox>
       <AddTransaction onClick = {addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
   )
};

const OverviewComponent = (props) =>{
     const [isAddTxnVisible, toggleAddTxn] = useState(false);
     return <Container>
        <BalanceBox>
            Balance: Rs{props.income - props.expense}
            <AddTransaction onClick={() => toggleAddTxn((isVisible) => !isVisible)}>
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransaction>
      </BalanceBox>
        {isAddTxnVisible && 
        <AddTransactionView 
        toggleAddTxn = {toggleAddTxn} 
        addTransaction = {props.addTransaction}
        />
        }
        <ExpenseContainer>
        <ExpenseBox>
          Expense<span>Rs{props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>Rs{props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
        </Container>;
};
export default OverviewComponent;