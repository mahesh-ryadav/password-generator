import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    const inputEl = passwordRef.current;
    inputEl?.select();
    inputEl?.setSelectionRange(0, 999); 

    const selectedText = inputEl?.value.substring(0, 999);

    if (navigator.clipboard && selectedText) {
      navigator.clipboard.writeText(selectedText)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  }, []);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "123456789";
    if (charAllowed) str += "~`!@#$%^&*(){}[];,._-+=";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">🔐 Password Generator</h1>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
            placeholder="Generated Password"
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            COPY
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              id="number"
              className="accent-blue-500"
            />
            <label htmlFor="number">Include Numbers</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              id="character"
              className="accent-blue-500"
            />
            <label htmlFor="character">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
