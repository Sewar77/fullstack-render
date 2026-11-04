import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function DataTable({ data = [] }) {
  if (data.length === 0) {
    return (
      <>
        <Box sx={{ my: "auto", p: 3 }}>
          <Typography variant="h2">There is no data yet. add new</Typography>
        </Box>
      </>
    );
  }
  const uniqueKeys = [...new Set(data.flatMap((obj) => Object.keys(obj)))];
  return (
    <>
      <TableContainer sx={{ maxWidth: "90%", overflow: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              {uniqueKeys.map((header, idx) => {
                return <TableCell key={header}>{header}</TableCell>;
              })}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((obj, rowIdx) => (
              <TableRow key={rowIdx}>
                {uniqueKeys.map((key) => (
                  <TableCell key={key}>
                    {obj[key] !== undefined ? String(obj[key]) : ""}
                  </TableCell>
                ))}
                <TableCell>
                  <Button color="warning" variant="contained">
                    Edit
                  </Button>
                  <Button color="error" variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
