
import React, { useState, useEffect } from "react";
import { Table } from 'antd';
const App = () => {

  const [list, setList] = useState([]);

  //Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fetch-hiring.s3.amazonaws.com/hiring.json"
        );
        const data = await response.json();

        //Filter out items where "name" is null and sort by listId or name
        const filteredData = data
          .filter((item) => item.name)
          .sort(function (a, b) {
            return a.listId - b.listId || +a.name.slice(5) - +b.name.slice(5);
          });
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

  //Columns for table
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'listId',
      dataIndex: 'listId',
      key: 'listId',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div className="container">
      <h1>List 1:</h1>
     <Table dataSource={list1} columns={columns} size="small" rowKey="Id1"/>
     <h1>List 2:</h1>
     <Table dataSource={list2} columns={columns} size="small" rowKey="Id2"/>
     <h1>List 3:</h1>
     <Table dataSource={list3} columns={columns} size="small" rowKey="Id3"/>
     <h1>List 4:</h1>
     <Table dataSource={list4} columns={columns} size="small" rowKey="Id4"/>
    </div>
  );
};

export default App;
