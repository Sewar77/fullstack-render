import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import DataCard from "../Card/DataCard";
import { useCategories } from "../../Hooks/useCategories";
export default function Categories() {
  const { categories, loading } = useCategories();
  console.log("Cat", categories);

  return (
    <>
      <Box sx={{ my: 3 }}>
        {loading ? (
          <Grid container spacing={4} sx={{ justifyContent: "center", my: 4 }}>
            {[1, 2, 3, 4, 5].map((num) => {
              return (
                <Grid key={num}>
                  <Card sx={{ width: 200 }}>
                    <Skeleton variant="square" height={100} />
                    <CardContent>
                      <Skeleton height={20} />
                      <Skeleton height={40} />
                      <Skeleton height={60} />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <DataCard type={"Categories"} data={categories} />
        )}
      </Box>
    </>
  );
}
