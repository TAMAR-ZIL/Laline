import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import "../styles/Root.css"
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="image-container">
            <img className="full-width-image" src="public\images\laline-style-1.webp" />
            <div className="overlay-element">
                <h1>Small pleasures create big moments.</h1>
            </div>
            <div className="images-container">
                <img id="img1" className="img-category" src="public\images\laline-global.webp" />
                <img id="img2" className="img-category" src="public\images\Laline_-6825742.webp" />
                <img id="img3" className="img-category" src="public\images\LA_1-1024x768.webp" />
                <img id="" className="img-category" src="public\images\L_g0207578956.webp" />
                <h1 onClick={() => navigate('/products')}>← See more products </h1>
            </div>
        </div>

    );
}

export default Home;