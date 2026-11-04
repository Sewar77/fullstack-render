import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddForm from "./AddForm";
import { useState } from "react";
export default function AddButtun({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="info" onClick={() => setOpen(!open)}>
        <AddIcon /> Add {data}
      </Button>
      <br />
      {open && (
        <AddForm open={open} onClose={() => setOpen(false)} type={data} />
      )}
    </>
  );
}
