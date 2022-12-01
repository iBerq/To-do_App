import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../modules/state/slices/homeSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const AddTodoItemModal = (props) => {
  const { visible, handleClose, user_id } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState("");
  const [fileLabel, setfileLabel] = useState("");
  const [imgInputVal, setImgInputVal] = useState("");
  const [fileInputVal, setFileInputVal] = useState("");

  const handleImage = (e) => {
    setImgInputVal(e.target.value);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    if (e.target.files[0].size > 5000000) {
      setImgInputVal("");
      alert("Image size is too big!");
      return;
    }
    reader.onload = () => {
      var docType = reader.result.split(";")[0].split(":")[1];
      if (
        docType === "image/jpeg" ||
        docType === "image/jpg" ||
        docType === "image/png"
      )
        setThumbnail(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleFile = (e) => {
    setFileInputVal(e.target.value);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    if (e.target.files[0].size > 5000000) {
      setFileInputVal("");
      alert("File size is too big!");
      return;
    }
    reader.onload = () => {
      setFile(reader.result);
      setfileLabel(e.target.files[0].name);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(
      addTodo({ user_id, title, description, thumbnail, fileLabel, file })
    );
    setTitle("");
    setDescription("");
    setThumbnail("");
    setfileLabel("");
    setFile("");
    setImgInputVal("");
    setFileInputVal("");
    handleClose();
  };

  const handleDownloadAttachment = () => {
    require("downloadjs")(file, fileLabel);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Tooltip title="Tap to add a thumbnail. You can only upload jpeg,jpg and png.">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input
                  hidden
                  accept="image/jpeg, image/jpg, image/png"
                  type="file"
                  value={imgInputVal}
                  onChange={handleImage}
                />
                <PhotoCamera fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {thumbnail === "" ? null : (
              <Tooltip title="Delete the uploaded thumbnail.">
                <IconButton
                  onClick={() => {
                    setThumbnail("");
                    setImgInputVal("");
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Avatar
            sx={{
              width: 250,
              height: 250,
              ml: 2,
              mb: 2,
            }}
            alt={"title"}
            variant="square"
            src={thumbnail}
          />
        </Box>
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tooltip title="Attach a file.">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              size="large"
            >
              <input
                hidden
                accept="*"
                type="file"
                value={fileInputVal}
                onChange={handleFile}
              />
              <AttachFileIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          {file === "" ? null : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tooltip title="Download the uploaded file.">
                <Button onClick={handleDownloadAttachment}>{fileLabel}</Button>
              </Tooltip>
              <Tooltip title="Remove the uploaded file.">
                <IconButton
                  onClick={() => {
                    setFile("");
                    setfileLabel("");
                    setFileInputVal("");
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  size="large"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        <Button
          sx={{
            mt: 2,
            textTransform: "none",
          }}
          onClick={handleAddTodo}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add To-do
        </Button>
      </Box>
    </Modal>
  );
};
export default AddTodoItemModal;
