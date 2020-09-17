import React, {useEffect, useState} from 'react';
import {CssBaseline, Tabs, Tab, AppBar} from "@material-ui/core";
import {ListView} from "./components/ListView";
import {EntryView} from "./components/EntyView";

const list = [
  {
    name: 'apples',
    status: 'Have',
    priority: '1'
  },
  {
    name: 'bananas',
    status: 'Have',
    priority: '2'
  },
  {
    name: 'orange',
    status: 'Ran Out',
    priority: '5'
  },
  {
    name: 'milk',
    status: 'Ran Out',
    priority: '1'
  },
  {
    name: 'Tea',
    status: 'Have',
    priority: '3'
  }
]

function TabPanel(props) {
  const {children, value, index, ...other} = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(0);
  const [itemsList, setItemsList] = useState([]);
  
  const sortList = (a, b) => {
    if (a.prior === b.prior) {
      if (a.name > b.name) {
        return 1
      } else if (a.name === b.name) {
        return 0
      } else return -1
    }
    return a.prior - b.prior
  }
  
  const compare = (a, b) => {
    if (
      a.name === b.name && a.status === b.status && a.prior === b.prior
    ) {
      return true
    } else return false
  }
  
  const handleAdd = (item) => {
    let prev = [...itemsList];
    // itemsList ? prev = [...itemsList] : prev = [];
    prev.push(item);
    localStorage.setItem('itemsList', JSON.stringify(prev));
    prev.sort((a,b)=>sortList(a,b))
    setItemsList(prev);
  }
  
  const handleDel = (item) => {
    const delIndex = itemsList.findIndex((inListItem) => {
      return compare(inListItem, item)
    })
    if (delIndex >= 0) {
      const prev = [...itemsList];
      console.log('before: ', prev);
      prev.splice(delIndex, 1);
      console.log(prev);
      localStorage.setItem('itemsList', JSON.stringify(prev));
      prev.sort((a,b)=>sortList(a,b))
  
      setItemsList(prev)
    }
  }
  
  const handleStatusChange = (item) => {
    const changeIndex = itemsList.findIndex((inListItem) => {
      return compare(inListItem, item)
    })
    if (changeIndex >= 0) {
      let prev = [...itemsList];
      const newItem = prev[changeIndex];
      if (newItem.status === "Have") {
        newItem.status = "Run Out"
      } else {
        newItem.status = "Have"
      }
      prev[changeIndex] = newItem;
      localStorage.setItem('itemsList', JSON.stringify(prev));
      prev.sort((a,b)=>sortList(a,b))
  
      setItemsList(prev)
    }
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('itemsList'));
    if (saved) {
      saved.sort((a,b)=>sortList(a,b))
      
      setItemsList(saved);
    }
  }, [setItemsList]);
  
  return (
    <>
      <CssBaseline/>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="List View"/>
          <Tab label="Entry View"/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ListView list={itemsList} add={handleAdd}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EntryView list={itemsList} del={handleDel} change={handleStatusChange}/>
      </TabPanel>
    </>
  );
}

export default App;
