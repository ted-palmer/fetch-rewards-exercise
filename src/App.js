import React, { useState, useEffect } from "react";
const App = () => {

  let [list, setList] = useState(null) 

    //Fetch data
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json");
          const data = await response.json();
          setList(data);
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
     {list && list.map((item) => <p>{item.name}</p>)}
     {/* {list && JSON.stringify(list)} */}
    </div>
  );
}

export default App;
