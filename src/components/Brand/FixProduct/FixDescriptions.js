import React, { useCallback } from "react";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDescriptions } from "../../../app/hook/ProductHook";
import { setDescriptions } from "../../../app/slices/AddProductSlice";
import { useDispatch } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import { cloneDeep } from "lodash";

const Description = React.memo(({ data, onChangeName, onChangeMarkdown }) => {
  const handleChangeName = useCallback(
    (e) => {
      onChangeName(data.id, e.target.value);
    },
    [data.id, onChangeName]
  );

  const handleChangeMarkdown = useCallback(
    (value) => {
      onChangeMarkdown(data.id, value);
    },
    [data.id, onChangeMarkdown]
  );

  return (
    <div className="my-6 space-y-6">
      <h1 className="font-semibold">Description {data.id + 1} :</h1>
      <div className="p-10 space-y-6 border shadow-md">
        <div className="flex flex-row space-x-4 items-center">
          <h1 className="font-semibold"> Name :</h1>
          <TextField
            required
            size="small"
            onChange={handleChangeName}
            value={data.description_name}
            label="Name Description"
          />
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold"> Description :</h1>
          <MDEditor
            value={data.description_md}
            onChange={handleChangeMarkdown}
          />
        </div>
      </div>
    </div>
  );
});

export const FixDescriptions = () => {
  const dispatch = useDispatch();
  const descriptions = useDescriptions();

  const addDescription = useCallback(() => {
    const newOption = {
      id: descriptions[descriptions.length - 1].id + 1,
      description_name: "",
      description_md: "",
    };
    dispatch(setDescriptions([...descriptions, newOption]));
  }, [descriptions, dispatch]);

  const removeDescription = useCallback(() => {
    if (descriptions.length > 1) {
      const temp = descriptions.slice(0, -1);
      dispatch(setDescriptions([...temp]));
    }
  }, [descriptions, dispatch]);

  const handleChangeDescriptionName = useCallback(
    (id, value) => {
      const temp = cloneDeep(descriptions);
      temp[id].description_name = value;
      dispatch(setDescriptions(temp));
    },
    [descriptions, dispatch]
  );

  const handleChangeDescriptionMarkdown = useCallback(
    (id, value) => {
      const temp = cloneDeep(descriptions);
      temp[id].description_md = value;
      dispatch(setDescriptions(temp));
    },
    [descriptions, dispatch]
  );

  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <div className="space-x-5">
        <h1 className="font-semibold my-5">Descriptions :</h1>
        <Button variant="contained" onClick={addDescription}>
          + Add
        </Button>
        <Button
          onClick={removeDescription}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <div className="space-y-8">
          {descriptions.map((data) => (
            <Description
              key={data.id}
              data={data}
              onChangeName={handleChangeDescriptionName}
              onChangeMarkdown={handleChangeDescriptionMarkdown}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
