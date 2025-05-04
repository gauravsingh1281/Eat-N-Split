import { useState } from "react";
const initialFriends = [
  {
    userId: 118836,
    name: "Ayushi",
    image:
      "https://images.unsplash.com/photo-1624610806703-99c0852c31c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D?u=118836",
    balance: -7,
  },
  {
    userId: 933372,
    name: "Vijay",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Vijay_Deverakonda_at_NOTA_pressmeet_%28cropped%29.jpg/500px-Vijay_Deverakonda_at_NOTA_pressmeet_%28cropped%29.jpg?u=933372",
    balance: 20,
  },
  {
    userId: 499476,
    name: "Megha",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Megha_Akash_%28cropped%29.jpg/500px-Megha_Akash_%28cropped%29.jpg?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendForm() {
    setShowAddFriendForm((show) => !show);
  }
  function handleAddNewFriend(newfriend) {
    setFriends((prevFriends) => [...prevFriends, newfriend]);
    setShowAddFriendForm(false);
  }
  function handleSelection(friend) {
    setSelectedFriend((currentSelected) =>
      currentSelected?.userId === friend.userId ? null : friend
    );
    setShowAddFriendForm(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.userId === selectedFriend.userId
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriendForm && (
          <FormAddFriend onAddNewFriend={handleAddNewFriend} />
        )}

        <Button onClick={handleAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.userId}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
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

function FormAddFriend({ onAddNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      userId: id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          )
        }
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill ? bill - userExpense : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
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
          if (value === "" || isNaN(numericValue)) return;
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
          if (value === "" || isNaN(numericValue)) return;
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
      <Button>Split bill</Button>
    </form>
  );
}
