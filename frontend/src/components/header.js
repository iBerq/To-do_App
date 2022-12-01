import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const Header = (props) => {
  const { username, handleLogout } = props;

  return (
    <Box
      sx={{
        mb: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <PlaylistAddCheckOutlinedIcon sx={{ mr: 1 }} />
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
          }}
        >
          To-do Application
        </Typography>
      </Box>
      <Tooltip title="Tap to logout">
        <Button
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            textTransform: "none",
          }}
          onClick={handleLogout}
          variant="text"
          startIcon={<AccountCircleIcon sx={{ mr: 1 }} />}
        >
          {username}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Header;
