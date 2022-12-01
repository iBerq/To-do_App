import React, { useState, useLayoutEffect, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuthUser, isAuthTokenExpired } from "../../common/utils/authUtil";
import ROUTES from "../../common/constants/routeConstants";
import Header from "../../components/header";
import TodoListItem from "../../components/todoListItem";
import { getTodos, searchTodos } from "../state/slices/homeSlice";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddTodoItemModal from "../../components/addTodoItemModal";
import { logout } from "../state/slices/authSlice";

const theme = createTheme();

const Home = () => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchString, setSearchString] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  var user = { _id: "", username: "" };
  if (getAuthUser()) user = JSON.parse(getAuthUser());

  useLayoutEffect(() => {
    isAuthTokenExpired().then((res) => {
      setTokenExpired(res);
    });
  }, []);

  const { todos, todosOutdated } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    if (todosOutdated) {
      dispatch(getTodos(filter));
    }
  }, [todosOutdated, dispatch, filter]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (searchString !== "") {
      dispatch(searchTodos({ searchString: searchString, tag: filter }));
    } else {
      dispatch(getTodos(filter));
    }
  }, [searchString, filter, dispatch]);

  const handleTodoItemModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    setTokenExpired(true);
  };

  return (
    <ThemeProvider theme={theme}>
      {tokenExpired ? <Navigate to={ROUTES.LOGIN} /> : null}
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header username={user.username} handleLogout={handleLogout} />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="search"
            label="Search for to-do's"
            name="search"
            value={searchString}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon sx={{ mr: 1 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              mb: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{ textTransform: "none" }}
              onClick={handleTodoItemModal}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add To-do
            </Button>
            <Select
              id="filter-select"
              value={filter}
              label="Filter"
              onChange={handleFilter}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"todo"}>Todo</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </Box>
          <List sx={{ width: "100%" }}>
            {todos?.map((todo) => (
              <TodoListItem
                _id={todo._id}
                title={todo.title}
                description={todo.description}
                tag={todo.tag}
                thumbnail={todo.thumbnail}
                fileLabel={todo.fileLabel}
                file={todo.file}
                updated_at={todo.updated_at}
              />
            ))}
          </List>
        </Box>
        <AddTodoItemModal
          visible={modalVisible}
          handleClose={handleTodoItemModal}
          user_id={user._id}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
