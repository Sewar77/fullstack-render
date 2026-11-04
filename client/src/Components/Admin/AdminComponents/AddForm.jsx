import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useCategories } from "../../../Hooks/useCategories";
import { useEffect, useState } from "react";
import { useProducts } from "../../../Hooks/useProducts";
import { useUpload } from "../../../Hooks/useUpload";
import toast from "react-hot-toast";

// Fixed typo globally from initailValues -> initialValues
const initialValues = {
  User: {
    fname: "",
    lname: "",
    email: "",
    password: "", // Fixed typo: paswword -> password
    confirmPassword: "",
    role: "user", // Set default string value
    status: "pending",
  },
  Product: {
    name: "",
    description: "",
    stock: "",
    price: "",
    catId: "",
  },
  Category: {
    name: "",
    description: "",
  },
};

export default function AddForm({ type, onClose, open }) {
  const { categories } = useCategories();
  const { addProduct } = useProducts();

  const {
    handleFileChange,
    file,
    error: uploadError,
    fileRef,
    resetFile,
  } = useUpload();

  const [data, setData] = useState(() => ({ ...initialValues[type] }));
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form data when the form type shifts
  useEffect(() => {
    setData({ ...initialValues[type] });
    resetFile();
  }, [type, resetFile]);

  let fields;
  switch (type) {
    case "User":
      fields = (
        <>
          <TextField
            label="First Name"
            required
            name="fname"
            value={data.fname ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            required
            name="lname"
            value={data.lname ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            type="email"
            required
            name="email"
            value={data.email ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            required
            name="password"
            value={data.password ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            type="password"
            required
            name="confirmPassword"
            value={data.confirmPassword ?? ""}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel>Role</FormLabel>
            <RadioGroup
              name="role"
              value={data.role ?? "user"}
              onChange={handleChange}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="trader"
                control={<Radio />}
                label="Trader"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              value={data.status ?? "pending"}
              onChange={handleChange}
            >
              <MenuItem value={"approved"}>Approved</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
            </Select>
          </FormControl>
        </>
      );
      break;
    case "Product":
      fields = (
        <>
          <TextField
            label="Name"
            required
            name="name"
            value={data.name ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            value={data.description ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            type="number"
            name="stock"
            value={data.stock ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={data.price ?? ""}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              name="catId"
              required
              value={data.catId ?? ""}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      );
      break;
    case "Category":
      fields = (
        <>
          <TextField
            label="Name"
            required
            name="name"
            value={data.name ?? ""}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            value={data.description ?? ""}
            onChange={handleChange}
          />
        </>
      );
      break;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialValues[type]) return;

    if (uploadError) {
      toast.error(uploadError);
      return;
    }

    if (type === "Product" && !file) {
      toast.error("Please select a product image");
      return;
    }

    if (type !== "Product") {
      toast.error(`${type} submission is not connected yet`);
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        console.log(key, value);
        formData.append(key, value);
      }
    });
    // Add this right under your Object.entries(data).forEach loop:
    for (let [key, value] of formData.entries()) {
      console.log("CONFIRMED APPENDED:", key, value);
    }

    if (file) {
      formData.append("image", file);
    }

    setSubmitting(true);

    try {
      const success = await addProduct(formData);

      if (!success) return;

      toast.success("Product form submitted successfully");

      setData({ ...initialValues[type] });
      resetFile();

      onClose?.();
    } catch (err) {
      // FIXED: Safely changed parameter string identifier to "err" to match usage inside the block
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };;

  return (
    <Box sx={{ maxWidth: "90%" }}>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          p: 3,
        }}
      >
        {fields}

        {/* Conditional rendering: Only displays file selector when adding a Product */}
        {type === "Product" && (
          <TextField
            inputRef={fileRef}
            type="file"
            slotProps={{
              htmlInput: {
                accept: "image/png, image/jpeg, image/webp",
              },
            }}
            onChange={handleFileChange}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Adding..." : `Add ${type}`}
        </Button>
      </Paper>
    </Box>
  );
}
