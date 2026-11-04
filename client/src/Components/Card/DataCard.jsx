import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";

export default function DataCard({ data = [], type }) {
  console.log(data);
  const { creatCart } = useCart();
  // product - category
  const navigate = useNavigate();
  const handleAddToCart = (id) => {
    creatCart(id);
  };
  return (
    <>
      <Header />
      {data.length === 0 && <Typography>no data</Typography>}
      <Container sx={{ my: 3 }}>
        <Typography variant="h2">{type}</Typography>
        <Grid container spacing={6} sx={{ p: 2, m: 2 }}>
          {data.map((item) => {
            return (
              <Grid key={item.id}>
                <Card>
                  <CardMedia component={"img"} src={item.image} />
                  <CardContent>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      {item.description || "This is descirpiotn"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {type === "Categories" ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/category/${item.name}/${item.id}/products`)
                        }
                      >
                        View Category
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() =>
                            navigate(`/view-product/${item.name}/${item.id}`)
                          }
                        >
                          View Products
                        </Button>
                        <Button onClick={() => handleAddToCart(item.id)}>
                          Add To Cart
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
