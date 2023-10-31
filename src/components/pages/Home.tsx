import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Hero } from "../Hero"
import { ChangeEvent, useEffect } from "react";
import { fetchProducts, setSearchTerm, sortProducts } from "../../redux/slices/products/productSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Home = ()=>{

    const {error , isLoading , products, searchTerm} = useSelector((state : RootState) => state.productsReducer);  

    const dispatch: AppDispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchProducts())
    },[])

    const handleChange =(event:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchTerm(event.target.value))
    }

    const handleSort=(event:ChangeEvent<HTMLSelectElement>)=>{
        dispatch(sortProducts(event.target.value))
    }

    const searchedProducts = searchTerm ? products.filter((product)=> 
    product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    : products;

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
                <div className="home-page__functionality">
                    <div className="home__search">
                        <label htmlFor="search-product">Search Bar</label>
                        <input name="search-product" type="text" placeholder="search by name" value={searchTerm} onChange={handleChange} />
                    </div>
                    <div className="home__sort">
                        <label htmlFor="sort-product">Sort By</label>
                        <select name="sort-product" onChange={handleSort}>
                            <option value="price" defaultValue="price">Price</option>
                            <option value="name" >Name</option>
                        </select>
                    </div>
                </div>
                <div className="home-main-content">
                    <section className="home__list-of-products">
                      {searchedProducts.length>0 && searchedProducts.map((product)=>{
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