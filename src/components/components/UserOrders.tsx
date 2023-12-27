import UserSidebar from './UserSidebar'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'

import { RootState } from '../../redux/store'


export default function UserOrders() {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const { categories } = useSelector((state: RootState) => state.categoryReducer)

  const getCategoryNameById = (categoryId: number) => {
    const foundCategory = categories.find((cat) => cat.id === categoryId)
    return foundCategory ? foundCategory.name + ', ' : 'Category not found'
  }

  return (
    <div className="main-container">
      <div className="user__container">
        <UserSidebar />
        <div className="user__main-content">
          {cartItems.length == 0 && <h4>No Orders Yet.</h4>}
          <section>
            {cartItems.length > 0 && <h2>List of Orders</h2>}
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    <Table responsive="sm">
                      <thead className="products__table">
                        <tr>
                          <th>id</th>
                          <th>Product Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Variance</th>
                          <th>Sizes</th>
                        </tr>
                      </thead>
                      <tbody className="products__table">
                        <tr>
                          <td>{item.id}</td>
                          <td>
                            <img className="admin__product-img" src={item.image} alt="" />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.description}</td>
                          <td>
                            {item.categories.map((categoryId) => getCategoryNameById(categoryId))}
                          </td>
                          <td>{item.variants.join('\n')}</td>
                          <td>{item.sizes.length > 0 ? item.sizes.join('\n') : 'none'}</td>
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
