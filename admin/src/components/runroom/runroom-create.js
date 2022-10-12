import { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useAuthContext } from "../../contexts/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Box,
  Card,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AdminActions } from "../../store/adminSlice";

export const RunroomCreate = () => {
  const dispatch = useDispatch();
  let token = useSelector((state) => (state.Profile.itemList ? state.Profile.itemList : []));
  let data = useSelector((state) => (state.Profile.item ? state.Profile.item : []));

  const [component, setComponent] = useState("");
  const [runroom, setRunroom] = useState({
    user_id: data._id ? data._id : "",
    type: "0",
    duration: "",
    distance: "",
    time_date: new Date(),
    invite_users: "",
  });

  const [open, setOpen] = useState({
    state: false,
    mesage: "",
  });
  const handleSubmit = async () => {
    try {
      console.log(runroom);
      await axios
        .post(process.env.NEXT_PUBLIC_RUNROOM_URL + "createRunroom", runroom, {
          headers: {
            authorization: token.access_token ? token.access_token : "",
          },
        })
        .then((res) => {
          console.log(res);
          handleClick("success");
          setRunroom({
            user_id: data._id ? data._id : "",
            type: "0",
            duration: "",
            distance: "",
            time_date: new Date(),
            invite_users: "",
          });
          // handleClose()
          // helpers.setSubmitting(true);
          // dispatch(AccountHolderActions.addProfile(res.data));
        })
        .catch((error) => {
          handleClick("Error");
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleClick = (message) => {
    setOpen({
      state: true,
      message: message,
    });
  };

  const handleClose = () => {
    setOpen({
      state: false,
      message: "",
    });
  };
  const handleComponentChange = (e) => {
    setComponent(e.target.value);
    setRunroom({
      user_id: data._id ? data._id : "",
      type: "0",
      duration: "",
      distance: "",
      time_date: new Date(),
      invite_users: "",
    });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open.state}
        autoHideDuration={2500}
        onClose={handleClose}
        message={open.message}
      ></Snackbar>
      <FormControl style={{ display: "inline-block" }}>
        <FormLabel id="demo-radio-buttons-group-label" style={{ marginRight: "2rem" }}>
          Component Type
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          style={{ display: "inline-block" }}
          onChange={(e) => handleComponentChange(e)}
        >
          <FormControlLabel value="duration" control={<Radio />} label="Duration" />
          <FormControlLabel value="distance" control={<Radio />} label="Distance" />
        </RadioGroup>
      </FormControl>
      {component === "duration" ? (
        <>
          <Card>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "31ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-required"
                  required
                  label="User Id"
                  name="user_id"
                  type="text"
                  value={runroom.user_id}
                  variant="outlined"
                  disabled
                />
                <FormControl style={{ width: "31ch", marginTop: 16 }} required>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    value={runroom.type}
                    type="text"
                    onChange={(e) => {
                      setRunroom({
                        ...runroom,
                        type: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"0"} selected>
                      Select
                    </MenuItem>
                    <MenuItem value={"1"}>Private</MenuItem>
                    <MenuItem value={"2"}>Public</MenuItem>
                  </Select>
                  {/* {type === 0 ? <FormHelperText>Error</FormHelperText> : ""} */}
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Duration"
                  onChange={(e) => {
                    setRunroom({
                      ...runroom,
                      distance: "",
                      duration: e.target.value.toString(),
                    });
                  }}
                  name="duration"
                  type="text"
                  value={runroom.duration}
                />
              </div>
              <div>
                <Button
                  style={{ margin: 21 }}
                  onClick={() => handleSubmit()}
                  variant="outlined"
                  size="medium"
                >
                  Submit
                </Button>
              </div>
            </Box>
          </Card>
        </>
      ) : null}
      {component === "distance" ? (
        <>
          {/* <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            TransitionComponent={TransitionDown}
            open={open.state}
            autoHideDuration={2500}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} sx={{ width: "100%" }}>
              {open.message}
            </Alert>
          </Snackbar> */}
          <Card>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "31ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-required"
                  required
                  label="User Id"
                  name="user_id"
                  type="text"
                  value={runroom.user_id}
                  variant="outlined"
                  disabled
                />
                <FormControl style={{ width: "31ch", marginTop: 16 }} required>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    value={runroom.type}
                    type="text"
                    onChange={(e) => {
                      setRunroom({
                        ...runroom,
                        type: e.target.value.toString(),
                      });
                    }}
                  >
                    <MenuItem value={"0"} selected>
                      Select
                    </MenuItem>
                    <MenuItem value={"1"}>Private</MenuItem>
                    <MenuItem value={"2"}>Public</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Distance"
                  onChange={(e) => {
                    setRunroom({
                      ...runroom,
                      distance: e.target.value.toString(),
                      duration: "",
                    });
                  }}
                  name="distance"
                  type="text"
                  value={runroom.distance}
                />
              </div>
              <div>
                <Button
                  style={{ margin: 21 }}
                  onClick={() => handleSubmit()}
                  variant="outlined"
                  size="medium"
                  disabled={
                    !runroom.user_id &&
                    !runroom.type &&
                    !runroom.distance &&
                    !runroom.duration &&
                    !runroom.invite_users &&
                    !runroom.time_date
                  }
                >
                  Submit
                </Button>
              </div>
            </Box>
          </Card>
        </>
      ) : null}
    </>
  );
};
