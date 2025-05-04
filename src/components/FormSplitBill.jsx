import { useState } from "react";
import Button from "./Button";
export default function FormSplitBill({
  selectedFriend,
  onSplitBill,
  error,
  handleError,
}) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill ? bill - userExpense : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) {
      handleError("Please enter valid values for the bill and your expense.");
      return;
    }
    handleError("");
    onSplitBill(whoIsPaying === "user" ? friendExpense : -userExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          const value = e.target.value.trim();
          const numericValue = Number(value);
          if (numericValue < 0 || isNaN(numericValue)) {
            handleError("Please enter a valid number and it must be positive.");
            return;
          }
          handleError("");
          setBill(numericValue);
        }}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => {
          const value = e.target.value.trim();
          const numericValue = Number(value);
          if (isNaN(numericValue)) {
            handleError("Please enter a valid number.");
            return;
          }
          if (numericValue < 0 || numericValue > bill) {
            handleError("Value must be between 0 and the total bill.");
            return;
          }
          handleError("");
          setUserExpense(numericValue > bill ? userExpense : numericValue);
        }}
      />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      {error && <p className="error-msg">{error}</p>}
      <Button>Split bill</Button>
    </form>
  );
}
