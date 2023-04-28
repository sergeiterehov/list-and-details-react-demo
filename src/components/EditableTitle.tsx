import { InputBase, Typography } from "@mui/material";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";

const EditableTitle = memo<{ title: string; onRename?: (newTitle: string) => void }>(
  function EditableTitle(props) {
    const propsRef = useRef(props);

    propsRef.current = props;

    const { title } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [newName, setNewName] = useState(title);
    const [editing, setEditing] = useState(false);

    const startEditingHandler = useCallback(() => {
      setNewName(propsRef.current.title);
      setEditing(true);
    }, []);

    const blurEditingHandler: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
      = useCallback((e) => {
        propsRef.current.onRename?.(e.currentTarget.value);
        setEditing(false);
      }, []);

    const keyDownEditingHandler: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>
      = useCallback((e) => {
        switch (e.code) {
        case "Enter": {
          propsRef.current.onRename?.(e.currentTarget.value);
          setEditing(false);
          break;
        }
        case "Escape": {
          setEditing(false);
          break;
        }
        }
      }, []);

    const changeNewNameHandler: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
      = useCallback((e) => {
        setNewName(e.currentTarget.value);
      }, []);

    // Выделяем весь текст при переходе в режим редактирования
    useLayoutEffect(() => {
      if (editing) {
        inputRef.current?.select();
      }
    }, [editing]);

    if (editing) {
      return (
        <Typography variant="h1">
          <InputBase
            autoFocus
            inputRef={inputRef}
            sx={{
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",

              ".MuiInputBase-input": {
                p: 0,
                m: 0,
                height: "inherit",
              },
            }}
            value={newName}
            onChange={changeNewNameHandler}
            onBlur={blurEditingHandler}
            onKeyDown={keyDownEditingHandler}
          />
        </Typography>
      );
    }

    return (
      <Typography
        sx={{ cursor: "pointer", "&:hover": { bgcolor: "ButtonHighlight" } }}
        variant="h1"
        onClick={startEditingHandler}
      >
        {title}
      </Typography>
    );
  },
);

export default EditableTitle;
