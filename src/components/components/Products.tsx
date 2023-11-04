import React, { useEffect, useState , FormEvent, ChangeEvent} from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts, deleteProduct, addProduct, Product, editedProduct } from '../../redux/slices/products/productSlice'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import {v4 as uuidv4 } from 'uuid'


export default function Products() {

const {categories} = useSelector((state:RootState)=>state.categoryReducer);
const {error , isLoading , products} = useSelector((state : RootState) => state.productsReducer);  
const [isAddProduct,setIsAddProduct] = useState(false);

const initialProduct = {
  id: new Date().getMilliseconds(),
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

const [newProduct, setNewProduct] = useState<Product>(initialProduct)

const [isEdit, setIsEdit] = useState(false);
const [editProduct, setEditProduct] = useState({})



const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchProducts())
  dispatch(fetchCategory())
},[])


if(isLoading){
  return <p>Loading ...</p>
}

if(error){
  return <p>{error}</p>
}

const handleDelete=(id:number)=>{
  dispatch(deleteProduct(id));
  toast.success("Product deleted successfully!");
}


const handleAddProduct=(event: FormEvent)=>{
  event.preventDefault()
  dispatch(addProduct(newProduct))
  setNewProduct(initialProduct)
  setIsAddProduct(false);
  <ToastContainer />
  toast.success("Product added successfully!")
}

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target
 
  const isList = name === 'variants' || name === 'sizes'
  if (isList) {
    setNewProduct({
      ...newProduct,
      [name]: value.split(',')
    })
    return
  }

  const isPrice = name === 'price'
  if(isPrice){
    setNewProduct({
      ...newProduct,
      [name]: Number(value)
    })
    return
  }

  setNewProduct({
    ...newProduct,
    [name]: value
  })
  
}

const getCategoryNameById =(categoryId : number)=>{
  const foundCategory =categories.find((cat)=>cat.id === categoryId)
  return foundCategory ? foundCategory.name + ', ' : 'Category not found'
}


const checkedCategories:number[] = []

const handleCheckbox =(event:React.ChangeEvent<HTMLInputElement>)=>{
   const {value, checked} = event.target;
  if(checked && !checkedCategories.includes(Number(value))){
    checkedCategories.push(Number(value));
  }
  if(!checked && checkedCategories.includes(Number(value))){
    const index = checkedCategories.indexOf(Number(value));
    checkedCategories.splice(index, 1);
  }
  
  // Logic error: won't update 
  setNewProduct({
    ...newProduct,
    ['categories']: checkedCategories
  })

}

//  Handle Edit
const handleEdit=(id:number)=>{
  setIsEdit(true);
  const foundProduct = products.find((product)=> product.id === id);
  if(foundProduct){
    setEditProduct(foundProduct)
  }
}

const handleEditChange =(event:ChangeEvent<HTMLInputElement>)=>{
  const { name, value } = event.target

  // It doesnt work for some reason. The values of the arrays are changed into string.
  // will split the 'sizes' and 'varaince' in the ProductSlice
  const isList = name === 'variants' || name === 'sizes';
  if (isList) {
    setEditProduct((prevData)=>{
      return(
        {...prevData,
          [name]: value.split(',')
        }
      )
    })
  }

  const isPrice = name === 'price'
  if(isPrice){
    setEditProduct((prevData)=>{
      return(
        {...prevData,
          [name]: Number(value)
        }
      )
    })

  }

  setEditProduct((prevData)=>{
    return(
      {...prevData,
        [name]: value
      }
    )
  })

}

const handleEditSubmit=(event:FormEvent)=>{
  event.preventDefault()
  setIsEdit(false)
  dispatch(editedProduct(editProduct))
  toast.success("Product Data Updated Successfully!")
}




  return (
    <div className="main-container">
    <ToastContainer />
    <div className='admin__container'>
    <AdminSidebar/>
    <div className='admin__main-content'>
    <h2>Create a product</h2>
    {!isAddProduct && <p id='product-add' onClick={()=>setIsAddProduct(true)}><i className="fa-solid fa-circle-plus " onClick={()=>setIsAddProduct(true)}></i> Add product</p>}
    {isAddProduct && 
    <>
      <Form onSubmit={handleAddProduct}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter Product Name" value={newProduct.name} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" name='image' value={newProduct.image} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name='description' placeholder="Enter Product Description" value={newProduct.description} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Variants (Optional)</Form.Label>
        <Form.Control type="text" name='variants' value={newProduct.variants} onChange={handleChange} placeholder="Example: 64GB, 128GB" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Sizes (Optional)</Form.Label>
        <Form.Control type="text" name='sizes' value={newProduct.sizes} onChange={handleChange} placeholder="Example: big, medium, small" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name='price' placeholder='Enter Product Price' value={newProduct.price<=0 ? '' : newProduct.price} onChange={handleChange} required />
      </Form.Group>
      <Form.Label htmlFor='categories'>Choose Categories:</Form.Label>
      {categories.length>0 && categories.map((category)=>{
        return(
          <>
      <Form.Group className="mb-3" key={category.id}>
        <Form.Check type="checkbox" name='categories' value={category.id} label={category.name} onChange={handleCheckbox}  />
      </Form.Group>
          </>
        )
      })}
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
    </>
    }
    {/* Edit product */}
    {isEdit && 
    <Form onSubmit={handleEditSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Product Name</Form.Label>
      <Form.Control type="text" name='name' placeholder="Enter Product Name" value={editProduct.name} onChange={handleEditChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Product Image</Form.Label>
      <Form.Control type="text" name='image' placeholder="Enter Image URL" value={editProduct.image} onChange={handleEditChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name='description' placeholder="Enter Product Description" value={editProduct.description} onChange={handleEditChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Variants (Optional)</Form.Label>
      <Form.Control type="text" name='variants' value={editProduct.variants}  placeholder="Example: 64GB, 128GB" onChange={handleEditChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Sizes (Optional)</Form.Label>
      <Form.Control type="text" name='sizes' value={editProduct.sizes}  placeholder="Example: big, medium, small" onChange={handleEditChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Price</Form.Label>
      <Form.Control type="number" name='price' placeholder='Enter Product Price' value={editProduct.price} onChange={handleEditChange} />
    </Form.Group>
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    }

    <h2>List of products</h2>
    <section>
      {products.length > 0 && products.map((product)=>{
        return(
          
          <div key={product.id}>
            <Table responsive="sm">
            <thead className='products__table'>
          <tr>
            <th>id</th>
            <th>Product Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Variance</th>
            <th>Sizes</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className='products__table'>
          <tr>
            <td>{product.id}</td>
            <td><img className='admin__product-img' src={product.image} alt="" /></td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.categories.map((categoryId)=>getCategoryNameById(categoryId))}</td>
            <td>{product.variants.join("\n")}</td>
            <td>{product.sizes.length>0 ? product.sizes.join("\n") : 'none'}</td>
            <td><i className="fa-solid fa-trash" id='product-detail__delete' onClick={()=>handleDelete(product.id)}></i></td>
            <td><i className="fa-solid fa-pen-to-square" id='product-detail__edit' onClick={()=>handleEdit(product.id)}></i> </td>
          </tr>
          
        </tbody>
      </Table>
          </div>
        )
      })}
    </section>

    </div>
  </div>
  </div>
  )
}

