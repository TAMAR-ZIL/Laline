import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { logOut } from "../features/userSlice";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";

const LogOut = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser)
  const cart = useSelector((state) => state.cart)
  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Are you shure do you want exit? the items in your basket will lose",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "yes",
        denyButtonText: `no`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("you loged out");
          localStorage.removeItem("user");
          localStorage.removeItem("cart");
          dispatch(logOut());
          dispatch(clearCart())
          navigate('/products')
        } else if (result.isDenied) {
          Swal.fire("you still login", "", "info");
          navigate('/products')
        }
        navigate('/products')
      });

    }
  }, [location.key]);
  return null;

}

export default LogOut;