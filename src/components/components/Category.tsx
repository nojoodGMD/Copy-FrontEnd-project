import React, { useEffect , useState,ChangeEvent, FormEvent} from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addCategory, deleteCategory, editedCategory, fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import { ToastContainer, toast } from 'react-toastify'
import Form from 'react-bootstrap/Form';



export default function Category() {

const {error , isLoading , categories} = useSelector((state : RootState) => state.categoryReducer);

const [isAddNewCategory,setIsAddNewCategory] = useState(false);
const [newCategory,setNewCategory] = useState('');

const [isEdit, setIsEdit] = useState(false);
const  [editCategory, setEditCategory] = useState({
  id:0,
  name:''
});



const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchCategory())
},[])

const handleDelete = (id:number)=>{
  dispatch(deleteCategory(id))
  toast.success("Category deleted successfully!");
}

const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
  setNewCategory(event.target.value)
}

const handleAdd=()=>{
  dispatch(addCategory(newCategory))
  setIsAddNewCategory(false);
  toast.success("Category added successfully!")
  setNewCategory('')
}

const handleSubmitEdit =(event: FormEvent)=>{
  event.preventDefault();
  setIsEdit(false);
  dispatch(editedCategory(editCategory))
  toast.success("Category Updated Successfully!")
}

const handleOpenEdit = (id : number)=>{
  setIsEdit(true);
  const foundCategory = categories.find((cat)=> cat.id === id);
  console.log(foundCategory)
  if(foundCategory){
    setEditCategory({id: foundCategory.id, name: foundCategory.name});
  }
}

const handleEditChange = (event:ChangeEvent<HTMLInputElement>)=>{
  const {name,value} = event.target;
  setEditCategory((prevCat)=>{
    return(
      {...prevCat,
      [name]:value
      }
    )
  })
}

if(isLoading){
  return <p>Loading ...</p>
}

if(error){
  return <p>{error}</p>
}


  return (
    <div className="main-container">
    <ToastContainer />
    <div className='admin__container'>
    <AdminSidebar/>
    <div className='admin__main-content'>
    <h2>Create a category</h2>
    {!isAddNewCategory && <p id='product-add' onClick={()=>setIsAddNewCategory(true)}><i className="fa-solid fa-circle-plus "  onClick={()=>setIsAddNewCategory(true)}></i> Add Category</p>}
    {isAddNewCategory && 
    <Form onSubmit={handleAdd}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Category Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter Category Name" value={newCategory} onChange={handleChange} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>    
    }
    <h2>List of Categories</h2>
    {isEdit && 
    <Form onSubmit={handleSubmitEdit}>
    <Form.Group className="mb-3" >
      <Form.Label>Category Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Category Name" value={editCategory.name} name='name' onChange={handleEditChange} />
    </Form.Group>
    <Button variant="primary" type='submit' >Update</Button>
    </Form>
    }
    <section className='products'>
      {categories.length > 0 && categories.map((category)=>{
        return(
          <div key={category.id}>
          
          <Card>
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          id: {category.id}
        </Card.Text>
        <Button variant="primary" onClick={()=>handleOpenEdit(category.id)} >Edit</Button>
        <Button variant="primary" className='home__btn' onClick={()=>handleDelete(category.id)}>Delete</Button>
      </Card.Body>
    </Card>
          </div>
        )
      })}
    </section>

    </div>
  </div>
  </div>
  )
}
