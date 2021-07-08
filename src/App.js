
import React, { useState, useEffect } from "react";
import { Table, Tabs } from 'antd';
const App = () => {
  const [list, setList] = useState([]);
  const { TabPane } = Tabs;

  //Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fetch-hiring.s3.amazonaws.com/hiring.json"
        );
        const data = await response.json();

        //Filter out items where "name" is null and sort by listId or name
        let filteredData = data
          .filter((item) => item.name)
          .sort(function (a, b) {
            return a.listId - b.listId || +a.name.slice(5) - +b.name.slice(5);
          });

        //Add a unique key to each row
        // filteredData.map((row) => (row.key = row.id));

        setList(filteredData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);


  //Filter items by listId
  const groups = {
    list1: list.filter((item) => item.listId === 1),
    list2: list.filter((item) => item.listId === 2),
    list3: list.filter((item) => item.listId === 3),
    list4: list.filter((item) => item.listId === 4)
  }

  //Columns for table
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "listId",
      dataIndex: "listId",
      key: "listId",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div className="container">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="List 1" key="1">
          <Table dataSource={groups.list1} columns={columns} size="small" rowKey={item => item.id}/>
        </TabPane>
        <TabPane tab="List 2" key="2">
          <Table dataSource={groups.list2} columns={columns} size="small" rowKey={item => item.id}/>
        </TabPane>
        <TabPane tab="List 3" key="3">
          <Table dataSource={groups.list3} columns={columns} size="small" rowKey={item => item.id}/>
        </TabPane>
        <TabPane tab="List 4" key="4">
          <Table dataSource={groups.list4} columns={columns} size="small" rowKey={item => item.id}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
