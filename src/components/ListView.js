import React, {useEffect, useState} from "react";
import {TextField, MenuItem, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ListItem} from "./ListItem";

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid #c4c4c4'
  },
  button: {
    minWidth: '100px',
    margin: '10px 5px'
  }
})

export const ListView = props => {
  const classes = useStyles();
  const [status, setStatus] = useState('Have');
  const [prior, setPrior] = useState(1);
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const tempList = [...props.list];
    setList(tempList);
  }, [props.list])
  
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  
  const handlePriorChange = (event) => {
    setPrior(event.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      status,
      prior
    }
    props.add(data);
    setName('')
  }
  
  const sort = (type) => {
    switch (type) {
      case 'Have': {
        const unsorted = [...props.list];
        const sorted = unsorted.filter((item) => {
          return (
            item.status === 'Have'
          )
        })
        setList(sorted);
        break;
      }
      case 'Run Out': {
        const unsorted = [...props.list];
        const sorted = unsorted.filter((item) => {
          return (
            item.status === 'Run Out'
          )
        })
        setList(sorted);
        break;
      }
      default :{
        const tempList = [...props.list];
        setList(tempList);
        break;
      }
    }
  }
  
  
  return (
    <div className={classes.root}>
      <form noValidate autoComplete={"off"} className={classes.form} onSubmit={handleSubmit}>
        <TextField id="entryName" label="Name" value={name} onChange={handleNameChange}/>
        <TextField
          select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          helperText="Select status"
        >
          {['Have', 'Run Out'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Priority"
          value={prior}
          onChange={handlePriorChange}
          helperText="Select priority"
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button variant={'outlined'} color={'primary'} type={"submit"}>Add</Button>
      </form>
      <div>
        <Button color={"primary"} variant={"contained"} className={classes.button} onClick={()=>sort('All')}>All</Button>
        <Button color={"primary"} variant={"contained"} className={classes.button} onClick={()=>sort('Have')}>Have</Button>
        <Button color={"primary"} variant={"contained"} className={classes.button} onClick={()=>sort('Run Out')}>Run Out</Button>
      </div>
      <div>
        
        {list.length ?
          list.map((item) => {
            return (
              <ListItem key={item.name+item.prior} item={item}/>
            )
          })
          :
          'Nothing to show'
        }
      </div>
    </div>
  )
}