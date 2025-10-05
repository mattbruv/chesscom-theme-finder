import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [data, setData] = useState("");

  // https://cors-anywhere.herokuapp.com/corsdemo
  useEffect(() => {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    // target API (example: fetching from GitHub API)
    const targetUrl =
      "https://www.chess.com/rpc/chesscom.themes.v2.ThemesService/GetActiveTheme";

    fetch(proxy + targetUrl, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en_US",
        "connect-protocol-version": "1",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      referrer: "https://www.chess.com/game/143936931234",
      body: '{"platform":"PLATFORM_WEB","boardSize":200,"piecesSize":150,"userId":"16f9b24c-8ba8-11ed-9d3d-276131eb70f3"}',
      method: "POST",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data, null, 2));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>{data}</div>
    </>
  );
}

export default App;
