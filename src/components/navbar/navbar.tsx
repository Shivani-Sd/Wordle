import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Face2Icon from "@mui/icons-material/Face2";

import "./styles.css";

const NavBar: FC = () => (
  <Box flexGrow={1}>
    <AppBar position="static" id="app-bar">
      <Toolbar>
        <div id="menu-icon">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon fontSize={"large"} />
          </IconButton>
        </div>
        <div id="title">
          <Typography
            variant="h6"
            component="div"
            fontFamily="Georgia"
            fontWeight="bolder"
            fontSize="36px"
          >
            !Wordle
          </Typography>
        </div>
        <div>
          <Face2Icon />
        </div>
      </Toolbar>
    </AppBar>
  </Box>
);

export default NavBar;
