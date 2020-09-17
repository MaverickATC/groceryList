import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: '200px',
    minHeight: '50px',
    border: '1px solid #232323',
    marginTop: '5px',
    padding: '15px',
    textAlign: 'center'
  },
  button: {
    margin: '5px'
  }
})

export const EntryListItem = props => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <p>Name: {props.item.name}</p>
      <p>Status: {props.item.status}</p>
      <p>Priority: {props.item.prior}</p>
      <Button
        variant={"contained"}
        className={classes.button}
        onClick={()=>props.change(props.item)}
      >
        Change Status
      </Button>
      <Button
        variant={"contained"}
        color={"secondary"}
        className={classes.button}
        onClick={()=>props.del(props.item)}
      >
        Delete
      </Button>
    </div>
  )
}