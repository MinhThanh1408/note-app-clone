import { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthProvider";
import { Box } from "@mui/system";
import { Avatar, Typography, Menu, MenuItem } from "@mui/material";

function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
    setUser,
  } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    auth.signOut();
    setUser({});
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleClick}>
        <Typography>{displayName} </Typography>
        <Avatar
          alt='avatar'
          src={photoURL}
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        />
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ float: "right" }}
      >
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
