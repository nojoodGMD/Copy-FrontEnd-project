import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Hero } from "../Hero"
import { ChangeEvent, useEffect } from "react";
import { fetchProducts, setSearchTerm, sortProducts } from "../../redux/slices/products/productSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import SearchingItem from "../components/SearchingItem";
import SortItems from "../components/SortItems";

const Home = ()=>{

    const {error , isLoading , products, searchTerm} = useSelector((state : RootState) => state.productsReducer);  

    const dispatch: AppDispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchProducts())
    },[])


    const handleSort=(event:ChangeEvent<HTMLSelectElement>)=>{
        dispatch(sortProducts(event.target.value))
    }

    const handleSearch =(event:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchTerm(event.target.value))
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
            <div className="main-container">
            <Hero/>
            <main className="home-container">
                <div className="home-page__functionality">
                    <SearchingItem searchTerm={searchTerm} handleSeach={handleSearch}/>
                    <SortItems handleSort={handleSort}/>
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
            </div>
            
        </>
    )
}

export default Home;