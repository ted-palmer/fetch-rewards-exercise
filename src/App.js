import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
const App = () => {

  let [list, setList] = useState(null) 

    //Fetch data
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json");
          let data = await response.json();
          let filteredData = data.filter(item => item.name)
          setList(filteredData);
          console.log(data)
        }

        catch (e) {
          console.log(e)
        }
        
      }
      fetchData();
  },[])




  return (
    <div>
     {list && list.map((item) => 
     <div>
     <p>Name: {item.name}</p>
     <p>ID: {item.id}</p>
     <p>ListId: {item.listId}</p>
     </div>
      )}
    </div> 
  );
}

export default App;
