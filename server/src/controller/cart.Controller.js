import {
    addCartItem,
    createCart,
    decreaseQuantity,
    getCartbyUserId,
    increaseQuantity,
} from "../model/cart.Model.js";
import { getUserById } from "../model/user.Model.js";
import { sendEmail } from "../utils/sendMail.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, qantity = 1 } = req.body;
        const userId = req.user.id;
        const cart = await createCart(userId);
        const item = await addCartItem(cart.id, productId, qantity);
        if (!item) {
            return res
                .status(400)
                .json({ message: "cant add more products because it empty stock!" });
        }
        return res.status(201).json({ message: "added to cart", item });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const getCartbyUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await getCartbyUserId(userId);
        if (!cart) {
            return res.status(404).json({ message: "not found" });
        }
        return res.status(200).json({ message: "cart", cart });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const increaseQuantityController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        if (!userId) {
            return res.status(403).json({ message: "you should login" });
        }
        if (!productId) {
            return res.status(404).json({ message: "item not found!" });
        }
        const cart = await getCartbyUserId(userId);
        if (!cart) {
            return res.status(404).json({ message: "not found" });
        }
        const item = await increaseQuantity(cart.id, productId);

        if (!item) {
            return res
                .status(404)
                .json({ message: "item not found or its empty in storage" });
        }
        return res.status(200).json({ message: "increase quantity by one!" });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const decreaseQuantityController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        if (!userId) {
            return res.status(403).json({ message: "you should login" });
        }
        if (!productId) {
            return res.status(404).json({ message: "item not found!" });
        }
        const cart = await getCartbyUserId(userId);
        if (!cart) {
            return res.status(404).json({ message: "not found" });
        }
        const item = await decreaseQuantity(cart.id, productId);

        if (!item) {
            return res.status(404).json({ message: "item not found!" });
        }
        return res.status(200).json({ message: "decrease quantity by one!" });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const checkOutCart = async (req, res) => {
    try {
        const { items } = req.body;
        const { id } = req.user;
        const user = await getUserById(id);

        const details = items.map(
            (item) =>
                `item: ${item.name} , Quantity: ${item.quantity}, price: ${item.price}`,
        );
        const sendMail = await sendEmail(
            user.email,
            "Check Out Cart",
            `
            <h1>check out cart</h1>
<p>you check out from our stote with cart:</p>
<p>${details}</p>

                `,
        );
        return res.status(200).json({ message: "email sent with cart details" })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
