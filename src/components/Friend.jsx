import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.userId === friend.userId;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img className="avatar" src={friend.image} alt={`${friend.name}-image`} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ₹ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ₹ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
