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

function StorePreview() {

  const { store } = useParams();
  const { data: storeData } = useProductId(`http://localhost:9000/stores/get-store/${store}`)
  const [firstanme, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(() => {
    const storedSize = localStorage.getItem("size")
    return storedSize ? setSize(storedSize) : null
  })
  // console.log(productDetail)
  const [addedItem, setAddedItem] = useState([])
  const totalPrice = addedItem.reduce((acc, item) => acc + item.price, 0);


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
    localStorage.setItem("size", size)
  };

  // to add to quantity function
  const addQuantity = () => {
    // setCartAdd(cartAdd + 1);
    setQuantity(quantity + 1)
  };

  // to remove from quantity function
  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const minus = () => {
  //   if (quantity > 0) {
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: 'top-end',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //       didOpen: toast => {
  //         toast.addEventListener('mouseenter', Swal.stopTimer);
  //         toast.addEventListener('mouseleave', Swal.resumeTimer);
  //       },
  //     });

  //     Toast.fire({
  //       icon: 'success',
  //       title: 'Item removed from cart',
  //     });

  //     setCartAdd(cartAdd - 1);
  //     setQuantityAdd(quantityAdd - 1);
  //   }
  // };

  useEffect(() => {
    if (addedItem.length > 0) {
      localStorage.setItem('cartItem', JSON.stringify(addedItem));
    }
  }, [addedItem]);

  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem");
    const parsedArray = cartItem ? JSON.parse(cartItem) : [];
    if (parsedArray) {
      const itemCount = parsedArray.length;
      // console.log(itemCount);
      console.log(parsedArray);
      // setData(parsedArray);
      setAddedItem(parsedArray)
      setCartItemCount(itemCount);
    }

  }, []);



  const emptyCart = () => {
    localStorage.removeItem("cartItems")
  }
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

  const config = {
    // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
    public_key: 'FLWPUBK_TEST-21c38cdcf4a96ed2f051470b7d362f30-X',
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone: phone,
      name: firstanme + lastname
      // email: email,
      // phone_number: phone,
      // name: name,
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
    callback: response => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => { },
  };

  return (
    <div>
      <section id="header">
        <a href><img src="img/logo.png" class="logo" alt="" /></a>
        <h3 className='logo'>Star Tech</h3>
        <div>
          <ul id="navbar">
            <div data-v-7d194230 className='summary_body'>
              <div data-v-7d194230 className='summary_cart'>






                <div data-v-7d194230 className='summary_cart_item'>
                  {(Array.isArray(addedItem) && addedItem.length > 0) ? (
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
                                NGN {info.price}
                              </span>
                            </div>
                            <div data-v-7d194230 className='summary__cart__item__product__cta'>
                              <div data-v-7d194230 className='action'>
                                <button data-v-7d194230 type="button" className='action_minus'>
                                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
                                </button>
                                <span data-v-7d194230 className='action__value'>{quantity}</span>
                                <button data-v-7d194230 type='button' className='action_plus'>
                                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  ) : null}

                </div>




                {/* Each child in a list should have a unique "key" prop. */}

                {!addedItem ? (<div className='summary_cart_empty'>
                  <p className='summary_cart_empty_msg'>Your cart is currently empty</p>
                  <button id='summary_emptyCart_button' className='btn btn--default btn--sm summary__cart__empty__btn'>CONTINUE SHOPPING</button>
                </div>) : (
                  <div data-v-7d194230 className='summary__cart__cta'>
                    <button type="button" className='summary__cart__cta__btn' onClick={emptyCart}>
                      <svg data-v-7d194230="" viewBox="0 0 477.9 477.9" xmlns="http://www.w3.org/2000/svg" className="summary__cart__cta__btn__icon"><path data-v-7d194230="" d="M443.7 68.3H324.3V51.2c0-28.3-22.9-51.2-51.2-51.2H204.8c-28.3 0-51.2 22.9-51.2 51.2v17.1H34.1c-9.4 0-17.1 7.6-17.1 17.1S24.7 102.4 34.1 102.4h18.6l32.6 360c0.8 8.8 8.2 15.6 17.1 15.5h273.1c8.9 0 16.3-6.7 17.1-15.5L425.2 102.4h18.6c9.4 0 17.1-7.6 17.1-17.1S453.2 68.3 443.7 68.3zM187.7 51.2c0-9.4 7.6-17.1 17.1-17.1h68.3c9.4 0 17.1 7.6 17.1 17.1v17.1h-102.4V51.2zM359.9 443.7H118L87 102.4h83.6 220.2L359.9 443.7z"></path> <path data-v-7d194230="" d="M187.7 391.4c0 0 0 0 0-0.1l-17.1-238.9c-0.7-9.4-8.9-16.5-18.3-15.9 -9.4 0.7-16.5 8.9-15.9 18.3L153.6 393.7c0.6 8.9 8.1 15.9 17.1 15.9h1.2C181.3 408.9 188.4 400.8 187.7 391.4z"></path> <path data-v-7d194230="" d="M238.9 136.5c-9.4 0-17.1 7.6-17.1 17.1v238.9c0 9.4 7.6 17.1 17.1 17.1S256 402 256 392.5V153.6C256 144.2 248.4 136.5 238.9 136.5z"></path> <path data-v-7d194230="" d="M325.5 136.5c-9.4-0.7-17.6 6.4-18.3 15.9l-17.1 238.9c-0.7 9.4 6.4 17.6 15.8 18.3 0 0 0.1 0 0.1 0h1.2c9 0 16.4-6.9 17.1-15.9l17.1-238.9C342 145.4 334.9 137.2 325.5 136.5z"></path></svg>
                      <span className='summary__list__cta__button__label'>
                        Empty Cart
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div data-v-7d194230 className='summary__footer'>

              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Items
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {totalPrice.toLocaleString()}
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

            <AiOutlineShoppingCart className='cartDesktop' /><p className='cartNumber'>{cartItemCount}</p>
            <GrClose id='close' />
            <ul id='payment_process' className='payment_process'>
              <li style={{ color: "blue" }}>Cart</li>
              <li>Information</li>
              <li>Shipping</li>
            </ul>
          </ul>

          <ul id="navbar2">
            <div className='summary_body'>

              <div className='summary_form'>
                <div className='form_item_flex'>
                  <div className='form_item'>
                    <input className='form_input' placeholder="Firstname" onChange={e => setFirstname(e.target.value)} />
                  </div>
                  <div className='form_item'>
                    <input className='form_input' placeholder="Lastname" onChange={e => setLastname(e.target.value)} />
                  </div>
                </div>
                <div className='form_item'>
                  <input className='form_input' placeholder="e.g myemail@gmail.com" onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='form_item'>
                  <input className='form_input' placeholder="+234" type='number' onChange={e => setPhone(e.target.value)} />
                </div>

                <div data-v-7ef2909e className='discount_group'>
                  <input data-v-7ef2909e id='discountCode' className='form_input' placeholder="Optional" />
                  <button data-v-7ef2909e className='btn discount_cta' type="">Apply</button>
                </div>

              </div>

            </div>

            <div data-v-7d194230 className='summary__footer'>
              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Items
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {totalPrice.toLocaleString()}
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
                  <input className='form_input' placeholder="e.g myemail@gmail.com" />
                </div>

                <div className='form_item_flex'>
                  <div className='form_item'>
                    <label for="state">State</label>
                    <input className='form_input' placeholder="" />
                  </div>
                  <div className='form_item'>
                    <label for="city">City</label>
                    <input className='form_input' placeholder="city" />
                  </div>
                </div>


                <div className='form_item'>
                  <label for="delivery_address">Delivery Address</label>
                  <input className='form_input' placeholder="+234" type='number' />
                </div>

                <div className='form_item'>
                  <label for="delivery_note">Delivery Note</label>
                  <textarea className='form_textarea' rows="" cols="" />
                </div>

              </div>

            </div>

            <div data-v-7d194230 className='summary__footer'>
              <div data-v-7d194230 className='summary__footer__item'>
                <div data-v-7d194230 className='summary_footer_item_name'>
                  Items
                </div>
                <div data-v-7d194230 className='summary_footer_item_value'>
                  <strong>NGN</strong> {totalPrice.toLocaleString()}
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
          {storeData?.map((result) => (
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
                <div className='minus'>
                  <div className='minus-icon' onClick={() => minusQuantity(result.id)}>
                    <BiMinus className='minus-icon__svg' />
                  </div>
                </div>
                <p className='proValue'>{quantity}</p>
                <div className='add'>
                  <div className='add-icon' onClick={() => addQuantity(result.id)}>
                    <GrAdd className='add-icon__svg' />
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => added(storeData.id)}
                    style={{ backgroundColor: '#61e361', padding: "15px", paddingRight: "35px", paddingLeft: "35px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "8px", marginLeft: "5px" }}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  // }

  // else{
  //   return(
  //     <NotFound />
  //   )
  // }

}

export default StorePreview;