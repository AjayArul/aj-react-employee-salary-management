import React, { memo, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { screenRoutes } from './../../constants/routesPath';
import './Sidebar.scss';

const Sidebar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [navActive, setNavActive] = useState(false)

  // menu list
  const menuItems = [
    {
        id: "home", order: 0, 
        key: screenRoutes.HOME,
        label: "Home",
        children: []
    },
    {
        id: "dashboard", order: 1, 
        key: screenRoutes.DASHBOARD,
        label: "Dashboard",
        children: []
    }
  ];  

  // Switch Screens
  const switchScreenFunc = (selectedNewKey) => {
    selectedNewKey ? navigate(selectedNewKey) : navigate(screenRoutes.HOME);
  };

  const renderLabel = item => (
    <Typography
      data-testid='switchScreenFunc'
      onClick={()=>switchScreenFunc(item.key)}
      component="div"
      className="listItemLable"
    >
      {item.label}
    </Typography>
  );

  const renderList = items => {
    //nested function.
    const nestedList = items => (
       items.map(item => (
          <TreeItem key={item.id} nodeId={item.id} 
            label={item?.children?.length > 0 ? item.label : renderLabel(item)}
            className={
              (location?.pathname === item.key ? 'listItem selectedItem' : 'listItem') + 
              (item?.children?.length > 0 ? ' hasChild' : '')
            }
          >
            {item?.children?.length > 0 && nestedList(item.children, true)}
          </TreeItem>
      ))
    );
    
    return (
      <TreeView
        className={`sidebarTree ${navActive ? "active" : ""}`}
        defaultCollapseIcon={<ExpandLessIcon />}
        defaultExpandIcon={<ExpandMoreIcon />}
      > 
        {nestedList(items)}
      </TreeView>
    );
  };

  return (
    <div className="sideBar">
        <h1>
          <span className='user'>
            <span><img className="userThumb" src="./aj_fav.png" alt="user"/></span>
            <span className='userName'>AJ LOGO AJ LOGO AJ LOGO AJ LOGO AJ LOGO </span>
          </span>
          
          <span className="navBtn">
            <IconButton
              aria-label="menu"
              color="inherit"
              size="small"
              onClick={() => {
                setNavActive(!navActive);
              }}
              ><MenuIcon /></IconButton>
          </span>
        </h1>
        
        {renderList(menuItems)}
    </div>
  );
};

export default memo(Sidebar);