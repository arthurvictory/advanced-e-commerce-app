import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { Button } from "react-bootstrap";

const CheckoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        //Clear Redux state
        dispatch(clearCart());

        // Clear sessionStorage
        sessionStorage.removeItem('cart');

        // Navigate to thank you page
        navigate('/thank-you')

        // Visual Feedback
        alert('Thank you for purchasing items! A confirmation email will be sent to you upon items shipped')
    };

    return (
        <Button onClick={handleCheckout} variant="success">
            Complete your Purchase
        </Button>
    )
}

export default CheckoutButton;