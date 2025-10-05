import { useState } from "react";
import "./App.css";
import {
  getTheme,
  getUserPopup,
  type PopupResponse,
  type Theme,
} from "./types";

function App() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<Theme | null>(null);
  const [user, setUser] = useState<PopupResponse | null>(null);

  function setInput(value: string) {
    setUsername(value.trim());
  }

  async function onGetThemeClick() {
    if (username.trim().length <= 0) return;

    try {
      const popup = await getUserPopup(username);
      const result = await getTheme(popup.uuid);
      setUser(popup);
      setTheme(result.theme);
    } catch (e) {
      setUser(null);
      setTheme(null);
    }
  }

  return (
    <>
      <input value={username} onChange={(e) => setInput(e.target.value)} />
      <button disabled={username.length == 0} onClick={onGetThemeClick}>
        Get Theme
      </button>
      {user && theme ? (
        <div>
          <div>
            <img style={{ width: 100 }} src={user.avatarUrl} />
            <div>
              {user.firstName} {user.lastName}
              <div>Best Rating: {user.bestRating}</div>
            </div>
            <div>{user.countryName} </div>
          </div>
          <div>
            <div>Piece set: {theme.pieceSet.name}</div>
            <div>Board Style: {theme.boardStyle.name}</div>
            <img
              style={{ position: "absolute" }}
              src={theme.pieceSet.previewImage.square}
            />
            <img src={theme.boardStyle.previewImage.square} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
