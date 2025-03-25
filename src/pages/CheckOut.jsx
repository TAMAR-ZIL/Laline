import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder, getEmail } from "../api/orderService";
import { useForm } from "react-hook-form";
import { clearCart } from "../features/cartSlice";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";
import '../styles/checkout.scss'
import emailjs from "@emailjs/browser";

const CheckOut = () => {
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.currentUser);
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.cartArr);
    const price = useSelector(state => state.cart.totalSum);
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [creditNumber, setCreditNumber] = useState("")
    const [cvv, setCvv] = useState(0)
    useEffect(() => {
        if (!user) navigate('/LogIn');
    }, [user, navigate]);

    const save = (data) => {
        console.log(address);
        addOrder({
            address:data.address,
            email: user?.email ||"t0527199526@gmail.com",
            codeUser: user._id,
            products: items,
            price
        }, localStorage.getItem("token"))
            .then(res => {
                localStorage.removeItem("cart");
                dispatch(clearCart());
                console.log("SERVICE_ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log("TEMPLATE_ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log("PUBLIC_KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
console.log(user);

console.log("User Email:", user.email);


emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID, 
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
    {
        email: user?.email, 
        userName: user?.userName,
        orderId: res._id,
        items: items, 
        total: price,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
.then((response) => {
    console.log("Email sent successfully:", response);
})
.catch((error) => {
    console.error("Error sending email:", error);
});

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "הזמנתך התקבלה",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/rate')
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `שגיאה בשמירת ההזמנה\n${err.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            });
    }

    return (
        <>
            <div className="order-details">
                {items.map((item) => <div key={item._id}>
                    <h3>{item.nameProduct}</h3>
                    <img src={item.description} />
                    <p>{item.price}₪</p>
                    <p>{item.color} :צבע </p>

                </div>)}
                <h2>:סה"כ</h2>
                {price}
            </div>
            <form onSubmit={handleSubmit(save)} className="credit-card-form">
                <label className="lbl" htmlFor="address">הזן כתובת למשלוח</label>
                {errors.address &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">{errors.address.message}</Alert>
                    </Stack>
                }
                <input
                    onChange={(e) => { setAddress(e.target.value); }}
                    className="npt"
                    id="address"
                    type="text"
                    {...register("address", { required: { value: true, message: "עליך להזין כתובת" } })}
                />
                <label className="lbl" htmlFor="creditNumber">הזן מספר כרטיס אשראי</label>
                {errors.creditNumber &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">{errors.creditNumber.message}</Alert>
                    </Stack>
                }
                <input
                    id="creditNumber"
                    type="Password"
                    placeholder="מספר כרטיס"
                    {...register("creditNumber", {
                        required: "יש להזין מספר כרטיס אשראי",
                        pattern: {
                            value: /^\d{16}$/,
                            message: "מספר כרטיס חייב להיות 16 ספרות",
                        },
                    })}
                />
                <label className="lbl" htmlFor="expiryDate">הזן תוקף </label>
                {errors.expiryDate &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">{errors.expiryDate.message}</Alert>
                    </Stack>
                }
                <input
                    id="expiryDate"
                    type="text"
                    placeholder="תוקף (MM/YY)"
                    {...register("expiryDate", {
                        required: "יש להזין תאריך תפוגה",
                        pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: "תאריך לא תקין, יש להזין בפורמט MM/YY",
                        },
                    })}
                />
                <label className="lbl" htmlFor="cvv">הזן 3 ספרות בגב הכרטיס</label>
                {errors.cvv &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">{errors.cvv.message}</Alert>
                    </Stack>
                }

                <input
                    id="cvv"
                    type="text"
                    placeholder="CVV"
                    {...register("cvv", {
                        required: "יש להזין קוד CVV",
                        pattern: {
                            value: /^\d{3,4}$/,
                            message: "CVV חייב להיות 3 או 4 ספרות",
                        },
                    })}
                />
                <button type="submit" className="submit-btn">שלח את ההזמנה</button>
            </form>
        </>
    );
}

export default CheckOut;
