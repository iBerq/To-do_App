import React, { useState, Fragment } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTodo, editTodo } from "../modules/state/slices/homeSlice";
import { useDispatch } from "react-redux";
import { ButtonGroup, Input } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditTodoItemModal from "./editTodoItemModal";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const TodoListItem = (props) => {
  const {
    _id,
    title,
    description,
    tag,
    thumbnail,
    fileLabel,
    file,
    updated_at,
  } = props;
  const [checked, setChecked] = useState(tag === "done" ? true : false);
  const [visible, setVisible] = useState(false);

  const date = new Date(updated_at);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(
      editTodo({
        _id,
        title,
        description,
        thumbnail,
        fileLabel,
        file,
        tag: !checked ? "done" : "todo",
      })
    );
    setChecked((prev) => !prev);
  };

  const handleDelete = () => {
    dispatch(
      deleteTodo({
        _id,
      })
    );
  };

  const handleTodoModal = () => {
    setVisible(!visible);
  };

  const handleTodoClick = () => {
    handleTodoModal();
  };

  const handleDownloadAttachment = () => {
    require("downloadjs")(file, fileLabel);
  };

  return (
    <ButtonGroup sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip title="Edit">
        <ListItemButton
          onClick={handleTodoClick}
          alignItems="flex-start"
          key={_id}
          divider
        >
          <ListItemAvatar>
            <Avatar alt={title} variant="square" src={thumbnail} />
          </ListItemAvatar>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ fontWeight: "bold" }}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: "block" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {date.toLocaleDateString()}
                </Typography>
                <Input
                  sx={{ display: "block" }}
                  variant="text"
                  value={description}
                  disabled
                  disableUnderline
                  multiline
                  fullWidth
                />
              </Fragment>
            }
          />
        </ListItemButton>
      </Tooltip>
      {file === "" ? null : (
        <Tooltip title="Download attached file.">
          <IconButton
            onClick={handleDownloadAttachment}
            sx={{ alignSelf: "center", ml: 1 }}
          >
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={tag === "done" ? "Mark as todo." : "Mark as done."}>
        <Checkbox
          id={`checkbox-${_id}`}
          onChange={handleToggle}
          checked={checked}
          icon={<CheckCircleOutlinedIcon />}
          checkedIcon={<CheckCircleIcon />}
          sx={{ alignSelf: "center", ml: 1 }}
        />
      </Tooltip>
      <Tooltip title="Delete.">
        <IconButton onClick={handleDelete} sx={{ alignSelf: "center", ml: 1 }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditTodoItemModal
        visible={visible}
        _id={_id}
        title={title}
        description={description}
        tag={tag}
        thumbnail={thumbnail}
        fileLabel={fileLabel}
        file={file}
        handleClose={handleTodoModal}
      />
    </ButtonGroup>
  );
};

export default TodoListItem;
