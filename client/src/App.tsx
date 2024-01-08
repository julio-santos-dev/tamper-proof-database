import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [verified, setVerified] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = async () => {
    const response = await fetch(`${API_URL}/verify-data`);

    const { verified } = await response.json();
    setVerified(verified);
  };

  const recoverData = async () => {
    const response = await fetch(`${API_URL}/recover-data`);

    await getData();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        {verified ? (
          <p>Data is valid: {data}</p>
        ) : (
          <div>
            <p>Data is invalid or tampered with.</p>
            <button style={{ fontSize: "20px" }} onClick={recoverData}>
              Recover Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
