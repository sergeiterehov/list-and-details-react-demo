import { Paper, InputBase } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useCallback } from "react";

const SearchInput: React.FC<{ text?: string; onChange?: (newText: string) => void }> = ({ text, onChange }) => {
  const changeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
    (e) => onChange?.(e.currentTarget.value),
    [],
  );

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <SearchOutlined sx={{ fontSize: 24 }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search film"
        inputProps={{ "aria-label": "search film" }}
        value={text || ""}
        onChange={changeHandler}
      />
    </Paper>
  );
};

export default SearchInput;
