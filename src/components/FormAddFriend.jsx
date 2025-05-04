import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddNewFriend, error, handleError }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) {
      handleError("Please fill the required fields.");
      return;
    }
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
        onChange={(e) => {
          setName(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          );
          handleError("");
        }}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
          handleError("");
        }}
      />
      {error && <p className="error-msg">{error}</p>}

      <Button>Add</Button>
    </form>
  );
}
