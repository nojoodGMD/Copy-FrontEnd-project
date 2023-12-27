import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ChangeEvent, useEffect, useState } from 'react'
import {Product, fetchProducts,setSearchTerm,sortProducts} from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import SearchingItem from '../components/SearchingItem'
import SortItems from '../components/SortItems'
import { addToCart } from '../../redux/slices/products/CartSlice'
import { ToastContainer, toast } from 'react-toastify'
import { Hero } from './Hero'

const Home = () => {
  const { error, isLoading, products, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  const searchedProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : products

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = searchedProducts.slice(indexOfFirstItem, indexOfLastItem)

    const totalPagesNumber = Math.ceil(searchedProducts.length / itemsPerPage)

    const buttonElements = []
    for (let i = 2; i <= totalPagesNumber - 1; i++) {
        buttonElements.push(<button onClick={() => handlePageChange(i)}>{i}</button>)
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
    }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Product Added to Cart.')
  }

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <div className="main-container">
        <Hero />
        <ToastContainer />
        <main className="home-container">
          <div className="home-page__functionality">
            <SearchingItem searchTerm={searchTerm} handleSeach={handleSearch} />
            <SortItems handleSort={handleSort} />
          </div>
          <div className="home-main-content">
            <section className="home__list-of-products">
              {currentItems.length > 0 &&
                currentItems.map((product) => {
                  return (
                    <div key={product._id} className="home__signel-product">
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" className="home__product-img" src={product.image as string} />
                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {product.price} SAR
                          </Card.Subtitle>
                          <Card.Text>{product.description}</Card.Text>
                          <Link to={`/productDetails/${product.slug}`}>
                            <Button variant="primary" className="home__btn">
                              Show details
                            </Button>
                          </Link>
                          <Button
                            variant="primary"
                            className="home__btn"
                            onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                })}
            </section>
          </div>
        </main>
        <div className="home__pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {buttonElements}
          <button onClick={handleNextPage} disabled={currentPage === totalPagesNumber}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
