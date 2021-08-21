import React from 'react';
import './SidebarChat.css';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function SidebarChat() {
  const classes = useStyles();
  return (
    <div className='sidebarChat'>
      <div className={`${classes.root} sidebarChat__avatar`}>
        <Avatar
          alt='Remy Sharp'
          src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
        />
      </div>
      <div className='sidebarChat__heading'>
        <h3>neeraj dighade</h3>
        <p>recent</p>
      </div>
      <div className='sidebarChat__timestamp'>
        <p>16.32</p>
      </div>
    </div>
  );
}

export default SidebarChat;
