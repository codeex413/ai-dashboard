
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuery, setResult, clearHistory, setError } from "./Redux/querySlice";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css"


function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useSelector((state) => state.query.history);
  const result = useSelector((state) => state.query.result);
  const error = useSelector((state) => state.query.error);

  
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setSuggestions(["Sales data analysis", "Customer behavior insights", "Monthly revenue trends"]);
  }, []);

  const handleSubmit = () => {
    if (!query.trim()) {
      dispatch(setError("Query cannot be empty!"));
      return;
    }
    
    setLoading(true);
    dispatch(setError(null)); 

    setTimeout(() => {
      dispatch(addQuery(query));

      
      const randomResult = Math.floor(Math.random() * 500);
      dispatch(setResult(`AI processed result: ${randomResult} data points`));

      setLoading(false);
      setQuery("");
    }, 1500); 
  };

  return (
    <div>
      <h2>AI Analytics Dashboard</h2>

      {/* Query Input Section */}
         <div > 
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300 bg-white/50 
             backdrop-blur-md shadow-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
             text-gray-900 placeholder-gray-500 transition-all duration-300 hover:shadow-2xl"
          list="query-suggestions" 
          
        />
        <datalist id="query-suggestions">
          {suggestions.map((s, index) => (
            <option key={index} value={s} />
          ))}
        </datalist>
        <button
          onClick={handleSubmit}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      
      {error && <p >{error}</p>}

      {/* Result Display */}
      {result && (
        <div >
          <h3 >Result:</h3>
          <p>{result}</p>
        </div>
      )}

      {/* Query History */}
      {history.length > 0 && (
        <div >
          <h3>Query History:</h3>
          <ul >
            {history.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Chart Display */}
      {result && (
        <div>
          <Bar
            data={{
              labels: ["Product A", "Product B", "Product C"],
              datasets: [
                {
                  label: "AI Analysis",
                  data: [85, 92, 78],
                  backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
                  borderRadius: 10,
                  barThickness: 50, 
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "top" },
              },
              scales: {
                y: {
                  grid: { color: "rgba(0, 0, 0, 0.1)" },
                },
              },
            }}
          />
        </div>
      )}

      
      {history.length > 0 && (
        <button
          onClick={() => dispatch(clearHistory())}
         
        >
          Clear History
        </button>
      )}
    </div>
  );
}

export default App;
