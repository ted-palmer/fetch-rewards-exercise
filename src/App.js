
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
const App = () => {

  const [list, setList] = useState([]);

  //Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json");
        const data = await response.json();

        //Filter out any items where "name" is blank or null
        const filteredData = data.filter((item) => item.name);
        setList(filteredData);

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  //Filter items by listId
  const list1 = list.filter((item) => item.listId === 1);
  const list2 = list.filter((item) => item.listId === 2);
  const list3 = list.filter((item) => item.listId === 3);
  const list4 = list.filter((item) => item.listId === 4);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ListId</th>
            <th>Name</th>
          </tr>
          <tbody>
            {list1 &&
              list1.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.listId}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
          </tbody>
        </thead>
      </Table>
    </div>
  );
};

export default App;
