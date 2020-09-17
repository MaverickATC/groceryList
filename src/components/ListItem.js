import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: '200px',
    minHeight: '50px',
    border: '1px solid #232323',
    marginTop: '5px',
    textAlign: 'center'
  }
})

export const ListItem = props => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <p>Name: {props.item.name}</p>
      <p>Status: {props.item.status}</p>
      <p>Priority: {props.item.prior}</p>
    </div>
  )
}