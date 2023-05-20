import { NAVBAR_HEIGHT } from "@/constants";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useChangeMonth } from "@/hooks/useChangeMonth";

type Props = {};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { nextMonth, prevMonth, currentMonth } = useChangeMonth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ height: `${NAVBAR_HEIGHT}` }}>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Box
            sx={{ minWidth: "238px", display: "flex", alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Calendar
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{ flexGrow: 1 }}
            justifyContent={"space-between"}
            px={1}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{ "&>*": { px: 0.5 } }}
            >
              <IconButton onClick={prevMonth}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={nextMonth}>
                <ChevronRightIcon />
              </IconButton>
              <CalendarTodayIcon />
              <Typography fontSize={"22px"} sx={{ color: "var(--on-surface)" }}>
                {currentMonth.format("MMMM YYYY")}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <Select
                  labelId="calendar-view"
                  id="demo-simple-select"
                  value={"month"}
                  label="calendar-view"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  //onChange={handleChange}
                >
                  <MenuItem value={"month"}>Month</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Avatar>D</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;