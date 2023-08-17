import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import "../../App.css";
import useProductId from '../../hooks/useProductID';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GrAdd } from "react-icons/gr"
import { BiMinus } from "react-icons/bi"
import { GrClose } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import axios from "axios"


function StorePreview() {

  const { store } = useParams();
  const { data: storeData } = useProductId(`http://localhost:9000/stores/get-store/${store}`)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [customer_email, setCustomerEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [discount, setDiscount] = useState("")
  const state = ["Abia", "Abuja", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
  const [selectedState, setSelectedState] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryNote, setDeliveryNote] = useState("")
  const [shippingMoney, setShippingMoney] = useState(0.00)
  const [deliveryInfo, setDeliveryInfo] = useState([])
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const [size, setSize] = useState(() => {
  //   const storedSize = localStorage.getItem("size")
  //   return storedSize ? storedSize : null
  // })

  // console.log(storeData)
  // console.log(productDetail)
  const [addedItem, setAddedItem] = useState([])
  const GET_DELIVERY_URL = "http://localhost:9000/store/get-delivery"
  const { email, token, size } = localStorage
  let sumPrice = addedItem.reduce((acc, item) => acc + item.price, 0);
  sumPrice = sumPrice * quantity
  const totalPrice = sumPrice + shippingMoney


  const added = (item) => {
    setAddedItem((prevCartItem) => [...prevCartItem, item]);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Item added to cart',
    });
    setCartItemCount(cartItemCount + 1);
    // setIsButtonDisabled(false)
    // localStorage.setItem("size", size)
  };

  const addQuantity = (id) => {
    // setQuantity(id.target.value(quantity + 1))
    setQuantity(quantity + 1)

  }

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  useEffect(() => {
    if (addedItem.length > 0) {
      localStorage.setItem('cartItem', JSON.stringify(addedItem));
      // localStorage.setItem("quantity", quantity)
    }
  }, [addedItem]);

  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem");
    // const itemQuantity = localStorage.getItem("quantity")
    const parsedArray = cartItem ? JSON.parse(cartItem) : [];
    if (parsedArray) {
      const itemCount = parsedArray.length;
      // console.log(itemCount);
      console.log(parsedArray[0]);
      // setData(parsedArray);
      setAddedItem(parsedArray)
      // setQuantity(itemQuantity)
      setCartItemCount(itemCount);
      // setQuantity(parsedArray)
    }

  }, []);

  useEffect(() => {
    fetchSavedValues();
  }, []);

  const fetchSavedValues = async () => {
    try {
      const response = await axios.post(GET_DELIVERY_URL, { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      const shipping = response.data.data2
      const newShiping = shipping.map((item) => ({ location: item.location, fee: item.fee }))
      setDeliveryInfo(newShiping)
    }
    catch (error) {
      console.error(error.message);
    }
  };


  const handleStateChange = (e) => {
    const { value } = e.target
    const nes = deliveryInfo.find(item => item.location.toLowerCase() === value.toLowerCase())
    const result = nes ? nes.fee : 0.00
    setShippingMoney(result)
    setSelectedState(e.target.value);
  }

  const removeFromCart = (itemId) => {
    // Remove the item from addedItem state
    setAddedItem((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));

    // Update the cart item count
    setCartItemCount((prevCount) => prevCount - 1);

    // Remove the item from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem('cartItem', JSON.stringify(updatedCartItems));
  };


  // const emptyCart = () => {
  //   localStorage.removeItem("cartItems")
  // }
  // SideBar toggle function
  const bar = document.getElementById('cart');
  const close = document.getElementById('close');
  const close2 = document.getElementById("close2")
  const close3 = document.getElementById("close3")
  const nav = document.getElementById('navbar');
  const nav2 = document.getElementById("navbar2")
  const nav3 = document.getElementById("navbar3")
  const emptyCartButton = document.getElementById("summary_emptyCart_button")
  const infoNav = document.getElementById("infoNav")
  const shippingNav = document.getElementById("shippingNav")
  const back_Cart = document.getElementById("back_Cart")
  const back_Info = document.getElementById("back_Info")

  if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
    });
  }
  if (infoNav) {
    infoNav.addEventListener("click", () => {
      nav2.classList.add("active2")
    })
  }

  if (shippingNav) {
    shippingNav.addEventListener('click', () => {
      nav3.classList.add('active3')
    })
  }

  if (close) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }

  if (emptyCartButton) {
    emptyCartButton.addEventListener("click", () => {
      nav.classList.remove("active")
    })
  }

  if (back_Cart) {
    back_Cart.addEventListener("click", () => {
      nav2.classList.remove("active2")
    })
  }

  if (back_Info) {
    back_Info.addEventListener('click', () => {
      nav3.classList.remove("active3")
    })
  }

  if (close2) {
    close2.addEventListener('click', () => {
      nav2.classList.remove('active2', "active");
      // nav2.classList.remove('active');
    });
  }

  if (close3) {
    close3.addEventListener('click', () => {
      nav3.classList.remove('active3');
      // nav2.classList.remove('active');
    });
  }

  const selectedItemsData = addedItem.map(item => ({
    product_Id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image
  }));

  const config = {
    // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
    public_key: process.env.REACT_APP_FLTW_TEST_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: customer_email,
      phone: phone,
      name: firstname + " " + lastname
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Proceed to payment',
    callback: async (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically

      const { tx_ref, amount, currency, transaction_id, status } = response;
      const mainData = { email, firstname, lastname, customer_email, tx_ref, shipping_money: shippingMoney, amount, discount, state: selectedState, address: deliveryAddress, delivery_note: deliveryNote, status, currency, transaction_id }
      try {
        const response = await axios.post('http://localhost:9000/payment/new_payment', {
          mainData,
          itemsData: selectedItemsData
        });

        // Handle the response from your server if needed
        console.log('POST request successful:', response.data);
        window.location.href = `/Store/${store}`
      }
      catch (error) {
        console.error('POST request error:', error.message);
      }
    },
    onClose: () => { },
  };

  const itemsToDisplay = [];

  storeData?.forEach((result) => {
    if (result.quantity === 0) {
      itemsToDisplay.push(
        <div key={result.id} class="soldout-container">
          <div class="sold-out">SOLD OUT!</div>
          <div class="divider"></div>
          <div class="deets">Next session date: 2 February</div>
        </div>
      );
    } else {
      itemsToDisplay.push(
        <div className="pro"
          key=
          {result.id}
        >
          <Link to={`/Store/Product/Details/${result.id}`}>
            <img src=
              {result.image.split('\r\n')[0]}
              alt="" />
            <div className="des">
              <span><b>
                {result.name}
              </b></span>
              <h5>
                {result.description}
              </h5>
              <div className="star">
                <i className="mdi mdi-star" />
                <i className="mdi mdi-star" />
                <i className="mdi mdi-star" />
                <i className="mdi mdi-star" />
                <i className="mdi mdi-star" />
              </div>
              <h4>₦
                {result.price.toLocaleString()}
              </h4>
            </div>
          </Link>
          <div className='proItems'>

            <div>
              <button
                onClick={() => added(storeData.id)}
                style={{ backgroundColor: '#0a0e27', color: "white", padding: "15px", paddingRight: "35px", paddingLeft: "35px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "8px", marginLeft: "5px" }}>
                Quick Add
              </button>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      <section id="header">
        {/* <a href><img src="img/logo.png" class="logo" alt="" /></a> */}
        <h3 className='logo'>{store}</h3>
        <div>
          <ul id="navbar">
            <div data-v-7d194230 className='summary_body'>
              <div data-v-7d194230 className='summary_cart'>
                <div data-v-7d194230 className='summary_cart_item'>
                  {Array.isArray(addedItem) && addedItem.length > 0 ? (
                    <div data-v-7d194230 className='summary_cart_item'>
                      {addedItem.map((info) => (
                        <div key={info.created_at} data-v-7d194230 className='summary_cart_item_variants'>
                          <div data-v-7d194230 className='summary_cart_item_product'>
                            <div data-v-7d194230 className='summary_cart_item_product_details'>
                              <p data-v-7d194230 className='summary_cart_item_product_name'>
                                {info.name}
                              </p>
                              {size && (
                                <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                  {size}
                                </span>
                              )}
                              <span data-v-7d194230 className='summary_cart_item_product_price'>
                                NGN {info.price.toLocaleString()}
                              </span>
                            </div>
                            <div data-v-7d194230 className='summary__cart__item__product__cta'>
                              <div data-v-7d194230 className='action'>
                                <button onClick={() => minusQuantity(info.id)} data-v-7d194230 type="button" className='action_minus'>
                                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
                                </button>
                                <span data-v-7d194230 className='action__value'>{quantity}</span>
                                <button onClick={() => addQuantity(info.id)} data-v-7d194230 type='button' className='action_plus'>
                                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
                                </button>
                              </div>
                              <i style={{ marginLeft: "65%", marginTop: "20%", cursor: "pointer" }} onClick={() => removeFromCart(info.id)} className="fa fa-trash" aria-hidden="true"></i>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='summary_cart_empty'>
                      <p className='summary_cart_empty_msg'>Your cart is currently empty</p>
                      <button id='summary_emptyCart_button' className='btn btn--default btn--sm summary__cart__empty__btn'>
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {Array.isArray(addedItem) && addedItem.length > 0 && (
              <div data-v-7d194230 className='summary__footer'>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary_footer_item_name'>
                    Items
                  </div>
                  <div data-v-7d194230 className='summary_footer_item_value'>
                    <strong>NGN</strong> {sumPrice.toLocaleString()}
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary_footer_item_name'>
                    Shipping
                  </div>
                  <div data-v-7d194230 className='summary_footer_item_value'>
                    <strong>NGN</strong> {shippingMoney}
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary__footer__item__name'>
                    Total
                  </div>
                  <div data-v-7d194230 className='summary__footer__item__value--2'>
                    <strong>NGN</strong> {totalPrice.toLocaleString()}
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <button type="" id='infoNav' className='btn_cart btn--primary btn--block'>Continue</button>
                </div>
              </div>
            )}

            <AiOutlineShoppingCart className='cartDesktop' /><p className='cartNumber'>{cartItemCount}</p>
            <GrClose id='close' />
            {Array.isArray(addedItem) && addedItem.length > 0 && (
              <ul id='payment_process' className='payment_process'>
                <li style={{ color: "blue" }}>Cart</li>
                <li>Information</li>
                <li>Shipping</li>
              </ul>
            )}
          </ul>

          <ul id="navbar2">
            <div className='summary_body'>

              <div className='summary_form'>
                <div className='form_item_flex'>
                  <div className='form_item'>
                    <label for="firstname">Firstname</label>
                    <input className='form_input' placeholder="Firstname" onChange={e => setFirstname(e.target.value)} />
                  </div>
                  <div className='form_item'>
                    <label for="lastname">Lastname</label>
                    <input className='form_input' placeholder="Lastname" onChange={e => setLastname(e.target.value)} />
                  </div>
                </div>
                <div className='form_item'>
                  <label for="email">Email</label>
                  <input className='form_input' placeholder="myemail@gmail.com"
                    onChange={e => setCustomerEmail(e.target.value)}
                  />
                </div>

                <div className='form_item'>
                  <label for="phone">Phone</label>
                  <input className='form_input' type='number' onChange={e => setPhone(e.target.value)} />
                </div>

                <label for="discount">Discount</label>
                <div data-v-7ef2909e className='discount_group'>
                  <input data-v-7ef2909e id='discountCode' className='form_input' placeholder="Optional" onChange={e => setDiscount(e.target.value)} />
                  <button data-v-7ef2909e className='btn discount_cta' type="">Apply</button>
                </div>
                {/* {isEmpty && <p style={{ color: 'red' }}>Inputs must not be empty</p>} */}
              </div>

            </div>

            <div data-v-7d194230 className='summary__footer'>
              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Items
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {sumPrice.toLocaleString()}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Shipping
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {shippingMoney}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary__footer__item__name'>
                  Total
                </div>
                <div data-v-7d194230 className='summary__footer__item__value--2'>
                  <strong>NGN</strong> {totalPrice.toLocaleString()}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                <button type="" id='shippingNav' className='btn_info btn--primary blocks'><span className='btn-span'>Continue to shipping</span></button>
              </div>
            </div>

            <GrClose id='close2' />
            <ul id='payment_process2' className='payment_process'>
              <li id="back_Cart">Cart</li>
              <li style={{ color: "blue" }}>Information</li>
              <li>Shipping</li>
            </ul>
          </ul>

          <ul id="navbar3"
          // style={{right: "0px"}}
          >
            <div className='summary_body'>

              <div className='summary_form'>
                <div className='form_item'>
                  <label for="country">Country</label>
                  <select
                    // value={selectedCountry}
                    style={{ width: "90%" }}
                    className='focus:shadow-soft-primary-outline block pl-3  py-2 text-base border-gray-300 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm '
                  // onChange={handleCountryChange}
                  >
                    {/* {countries.map((country) => ( */}
                    <option>
                      Nigeria
                    </option>
                    {/* ))} */}
                  </select>
                </div>

                <div className='form_item'>
                  <label for="state">State</label>
                  <select
                    value={selectedState}
                    style={{ width: "90%" }}
                    className='focus:shadow-soft-primary-outline block pl-3  py-2 text-base border-gray-300 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm '
                    onChange={handleStateChange}
                  >
                    <option value="">Select a state...</option>
                    {state.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form_item'>
                  <label for="delivery_address">Delivery Address</label>
                  <input className='form_input' type='text' onChange={e => setDeliveryAddress(e.target.value)} />
                </div>

                {/* <select style={{width: "90%"}} className='focus:shadow-soft-primary-outline block pl-3  py-2 text-base border-gray-300 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm '>
                    {shpping?.map((result, index) => (
                    <option key={[index]}>{result}</option>
                    ))}
                  </select> */}

                <div className='form_item'>
                  <label for="delivery_note">Delivery Note</label>
                  <textarea className='form_textarea' value={deliveryNote} rows="" cols="" onChange={e => setDeliveryNote(e.target.value)} />
                </div>

              </div>

            </div>

            <div data-v-7d194230 className='summary__footer'>
              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Items
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {sumPrice.toLocaleString()}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Shipping
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {shippingMoney}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary__footer__item__name'>
                  Total
                </div>
                <div data-v-7d194230 className='summary__footer__item__value--2'>
                  <strong>NGN</strong> {totalPrice.toLocaleString()}
                </div>
              </div>

              <div data-v-7d194230 className='summary__footer__item'>
                {/* <button 
                    type="" 
                    className='btn btn--primary btn--block'
                    onClick={() => {
                      handleFlutterPayment({
                        callback: (response) => {
                          console.log(response)
                          closePaymentModal()
                        },
                        onClose: () => {},
                      })
                    }}
                    >PLACE YOUR ORDER</button> */}
                <FlutterWaveButton type="submit" className="btn_ship btn-success btn-md ms-auto" {...fwConfig} >Proceed to Payment</FlutterWaveButton>
              </div>
            </div>

            <GrClose id='close3' />
            <ul id='payment_process3' className='payment_process'>
              <li id="back_Info">Cart</li>
              <li>Information</li>
              <li style={{ color: "blue" }}>Shipping</li>
            </ul>
          </ul>
        </div>
        <div id="mobile">
          <AiOutlineShoppingCart id='cart' /><p className='cartNumber'>{cartItemCount}</p>
        </div>
      </section>

      <section id="page-header">
        <h2>{store}<br />#stayhome </h2>
        <p>save more with coupons & up to 70% off!</p>
      </section>
      {/* {store && storeData.map((result, index) => ( */}
      <section id="Product1" className="section-p1">
        <div className="pro-container">
          {itemsToDisplay.map(item => item)}
        </div>
      </section>

      <div class="soldout-container">
        <div class="sold-out">SOLD OUT!</div>
        <div class="divider"></div>
        <div class="deets">Next session date: 2 February</div>
      </div>
    </div>
  );
}

export default StorePreview;


// {
//   storeData?.map((result) => (

//     <div className="pro"
//       key=
//       {result.id}
//     >
//       <Link to={`/Store/Product/Details/${result.id}`}>
//         <img src=
//           {result.image.split('\r\n')[0]}
//           alt="" />
//         <div className="des">
//           <span><b>
//             {result.name}
//           </b></span>
//           <h5>
//             {result.description}
//           </h5>
//           <div className="star">
//             <i className="mdi mdi-star" />
//             <i className="mdi mdi-star" />
//             <i className="mdi mdi-star" />
//             <i className="mdi mdi-star" />
//             <i className="mdi mdi-star" />
//           </div>
//           <h4>₦
//             {result.price.toLocaleString()}
//           </h4>
//         </div>
//       </Link>
//       <div className='proItems'>

//         <div>
//           <button
//             onClick={() => added(storeData.id)}
//             style={{ backgroundColor: '#0a0e27', color: "white", padding: "15px", paddingRight: "35px", paddingLeft: "35px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "8px", marginLeft: "5px" }}>
//             Quick Add
//           </button>
//         </div>
//       </div>
//     </div>
//   ))
// }