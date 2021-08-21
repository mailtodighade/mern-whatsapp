import React from 'react';
import './Sidebar.css';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';

//icons
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';


import SidebarChat from './SidebarChat';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Sidebar() {
  const classes = useStyles();
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className={` ${classes.root} sidebar__headerLeft`}>
          <Avatar
            alt='Remy Sharp'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
          />
        </div>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchIcon />
          <input name='search' placeholder='search or start new chat' />
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
