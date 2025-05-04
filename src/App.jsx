import { useState } from "react";
import initialFriends from "./data/friendsData";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendList from "./components/FriendList";
import Button from "./components/Button";

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [error, setError] = useState("");

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
          <FormAddFriend
            onAddNewFriend={handleAddNewFriend}
            error={error}
            handleError={setError}
          />
        )}

        <Button onClick={handleAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          error={error}
          handleError={setError}
        />
      )}
    </div>
  );
}
