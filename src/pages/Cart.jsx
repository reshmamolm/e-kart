import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { emptyCart, removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartArray = useSelector((state) => state.cartReducer);
  // console.log("===Cart items===");
  // console.log(cartArray);

  // hook used to navigate to a particular path or page
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const getTotal = () => {
    let sum = 0;
    cartArray.forEach((item) => {
      sum = sum + item.price;
    });
    setTotal(sum)

  }
  useEffect(() => {
    getTotal();

  },[cartArray])
  const handlecart=()=>{
    alert("Thank you ...your order placed successfully")
    dispatch(emptyCart())
    navigate('/')

  }


  return (
    <>
      <div style={{ marginTop: '100px' }} className='d-flex justify-content-center'>

        {
          cartArray?.length > 0 ?
            <div className='row w-100 justify-content-center'>
              < div className='col-lg-6 mb-5  '>
                <table className='table shadow border'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Title</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      cartArray?.map((item, index) => (
                        <tr >
                          <td>{index + 1}</td>
                          <td>{item.title.slice(0, 20)}...</td>
                          <td><img src={item.image} alt="" height="75px" width="75px" /></td>
                          <td>₹{item.price}</td>
                          <td><Button variant='outline-danger'
                            onClick={() => dispatch(removeFromCart(item.id))}><i class="fa-solid fa-trash"></i></Button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className='col-lg-4 ms-5'>
                <div className='border shadow p-5'>
                  <h4 className='text-primary'>Cart Summary</h4>
                  <h6>Total Number of products: <span className='text-warning fw-bolder'>{cartArray?.length}</span></h6>
                  <h6>Total Price: <span className='text-warning fw-bolder'>₹{total}</span></h6>
                  <button className='btn btn-success rounded w-100 mt-3' onClick={handlecart}>CHECKOUT</button>
                </div>

              </div>
            </div> :

            <div style={{ height: '100vh' }} className='d-flex align-items-center flex-column'>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--state-no-items-zero-page-added-states-pack-design-development-illustrations-5875081.png?f=webp" height='300px' alt="" />
              <h4 className='text-danger fw-bolder'>Your Cart is Empty</h4>
            </div>

        }

      </div>


    </>
  )
}

export default Cart