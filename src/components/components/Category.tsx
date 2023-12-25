import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {addCategory, deleteCategory,fetchCategory, updateCategory} from '../../redux/slices/products/CategoriesSlice'
import { ToastContainer, toast } from 'react-toastify'
import Form from 'react-bootstrap/Form'

export default function Category() {
  const { error, isLoading, categories } = useSelector((state: RootState) => state.categoryReducer)

  const [isAddNewCategory, setIsAddNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const [isEdit, setIsEdit] = useState(false)
  const [editCategory, setEditCategory] = useState({_id:'',name:''})

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const handleDelete = async (slug : string) => {
    try {
      const response = await deleteCategory(slug)
      await dispatch(fetchCategory())
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value)
  }

  const handleAdd = async (event: FormEvent) => {
    try {
      event.preventDefault()
      const response = await addCategory(newCategory)
      await dispatch(fetchCategory())
      setIsAddNewCategory(false)
      toast.success(response?.data.message)
      setNewCategory('')
    } catch (error) {
      console.log(error)
    }
    
  }

  // Edit Category functions
  const handleOpenEdit = (_id: string) => {
    setIsEdit(true)
    const foundCategory = categories.find((cat) => cat._id === _id)
    if (foundCategory) {
      setEditCategory({ _id: foundCategory._id, name: foundCategory.name })
    }
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditCategory((prevCat) => {
      return { ...prevCat, [name]: value }
    })
  }

  const handleSubmitEdit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      setIsEdit(false)
      const response = await updateCategory(editCategory._id, editCategory.name)
      await dispatch(fetchCategory())
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }


  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="admin__container">
        <AdminSidebar />
        <div className="admin__main-content">
          <h2>Create a category</h2>
          {!isAddNewCategory && (
            <p id="product-add" onClick={() => setIsAddNewCategory(true)}>
              <i className="fa-solid fa-circle-plus " onClick={() => setIsAddNewCategory(true)}></i>{' '}
              Add Category
            </p>
          )}
          {isAddNewCategory && (
            <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Category Name"
                  value={newCategory}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
          <h2>List of Categories</h2>
          {isEdit && (
            <Form onSubmit={handleSubmitEdit}>
              <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name"
                  value={editCategory.name}
                  name="name"
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          )}
          <section className="products">
            {categories &&
              categories.map((category) => {
                return (
                  <div key={category._id}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{category.name}</Card.Title>
                        <Card.Text>slug: {category.slug}</Card.Text>
                        <Button variant="primary" onClick={() => handleOpenEdit(category._id)}>
                          Edit
                        </Button>
                        <Button
                          variant="primary"
                          className="home__btn"
                          onClick={() => handleDelete(category.slug)}>
                          Delete
                        </Button>
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
