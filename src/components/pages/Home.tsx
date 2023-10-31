import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Hero } from "../Hero"
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/products/productSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Home = ()=>{

    const {error , isLoading , products} = useSelector((state : RootState) => state.productsReducer);  

    const dispatch: AppDispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchProducts())
    },[])

    if(isLoading){
    return <p>Loading ...</p>
    }

    if(error){
    return <p>{error}</p>
    }
    return(
        <>
            <Hero/>
            <main className="home-container">
                <div className="functionality-home">
                    <p>Serach and filter goes here</p>
                </div>
                <div className="home-main-content">
                    <section className="home__list-of-products">
                      {products.length>0 && products.map((product)=>{
                        return(
                            <div key={product.id} className="home__signel-product">
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" className="home__product-img" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{product.price} SAR</Card.Subtitle>
                                    <Card.Text>
                                    {product.description}
                                    </Card.Text>
                                    <Link to={`/product-details/${product.id}`}>
                                        <Button variant="primary" className="home__btn">Show details</Button>
                                    </Link>
                                    <Button variant="primary" className="home__btn">Buy</Button>
                                </Card.Body>
                                </Card>
                            </div>
                        )
                      })}  
                    </section>
                    
                </div>
            </main>
            
        </>
    )
}

export default Home;