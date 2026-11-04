import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { useCart } from "../../Hooks/useCart";
import { useEffect } from "react";
import Header from "../Layout/Header";

export default function Cart() {
  const { cart, loading, getCart, creatCart, increase, decrease, checkOut } =
    useCart();
  useEffect(() => {
    getCart();
  }, []);
  let totalCart = 0;
  console.log(cart);
  for (let t of cart) {
    totalCart += Number(t.total);
  }
  const handleCheckOut = () => {
    console.log(cart);

    checkOut(cart);
  };
  return (
    <>
      <Header />
      <Container sx={{ my: 3 }}>
        {!cart && (
          <>
            <Typography>
              Your cart is empty, add product to cart to create new!
            </Typography>
          </>
        )}

        <Box>
          <Grid
            container
            direction="column"
            sx={{ gap: 5, width: "50%", justifyContent: "center", mx: "auto" }}
          >
            <Typography variant="h3">yOUR cART</Typography>
            <Typography variant="h4">Total: {totalCart} JD</Typography>
            {cart.map((cart) => {
              return (
                <Grid key={cart.id}>
                  <Card sx={{ border: "black", p: 3 }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Typography> {cart.name}</Typography>
                      <Typography> {cart.price}</Typography>
                    </CardContent>
                    <Typography>
                      Your Order:
                      <IconButton onClick={() => increase(cart.product_id)}>
                        +
                      </IconButton>
                      {cart.quantity}
                      <IconButton onClick={() => decrease(cart.product_id)}>
                        -
                      </IconButton>
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Button onClick={() => handleCheckOut()}>CheckOUt</Button>
        </Box>
      </Container>
    </>
  );
}
