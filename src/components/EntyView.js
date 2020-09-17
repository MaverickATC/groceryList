import React, {useState} from "react";
import {Button, MenuItem, TextField} from "@material-ui/core";
import {ListItem} from "./ListItem";
import {makeStyles} from "@material-ui/styles";
import {EntryListItem} from "./EntryListItem";

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export const EntryView = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.list ?
        props.list.map((item) => {
          return (
            <EntryListItem key={item.name + item.prior} item={item} del={props.del} change={props.change}/>
          )
        })
        :
        'Nothing to show'
      }
    </div>
  )
}