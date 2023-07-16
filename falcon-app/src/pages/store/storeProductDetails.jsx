import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import product2 from '../component/Image/products/n3.jpg';
// import product3 from '../component/Image/products/n5.jpg';
// import product4 from '../component/Image/products/n6.jpg';
// import NotFound from "../component/ProductNotFound"
import Swal from 'sweetalert2';
import useProductId from '../../hooks/useProductID';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GrClose } from 'react-icons/gr';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
function StoreProductDetailed() {
  const { id } = useParams();
  // const [cartAdd, setCartAdd] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null)
  const { error, data: productDetail } = useProductId(`http://localhost:9000/store/get-product/${id}`)
  const [data, setData] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [addedItem, setAddedItem] = useState(() => {
    const storedCartItem = localStorage.getItem('cartItem');
    return storedCartItem ? JSON.parse(storedCartItem) : null;
  });

  // console.log(size)

  const added = () => {
    setAddedItem((prevCartItem) => {
      if (prevCartItem === null) {
        setIsButtonDisabled(true)
        return productDetail;
      } else {
        // Handle adding multiple products to the cart, if needed
        // For example, you can create an array of cart items
        return [prevCartItem, productDetail];
      }
    });
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
    setIsButtonDisabled(false)
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
      // setCartAdd(cartAdd - 1);
      setQuantity(quantity - 1);
    }
  };
  const [localStSize, setLocalStSize] = useState()
  // 
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(addedItem));
  }, [addedItem]);

  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem");
    const localStSize = localStorage.getItem("size")
    const parsedArray = cartItem ? JSON.parse(cartItem) : [];
    if(parsedArray) {
      const itemCount = parsedArray.length;
      // console.log(itemCount);
      console.log(parsedArray);
      setData(parsedArray);
      setCartItemCount(itemCount);
    }
    
  }, []);
  console.log(data)

  console.log(cartItemCount)

  // useEffect(() => {
  //   const cartItem = localStorage.getItem("cartItem");
  //   if(!cartItem == null) {
  //     const parsedArray = JSON.parse(cartItem);
  //     let arrayCount =  parsedArray.lenght
  //     console.log(arrayCount)
  //     console.log(parsedArray.length)
  //     setData(parsedArray);
  //   }
  //   return
  // }, []);

  const emptyCart = () => {
    localStorage.removeItem("cartItems")
  }
  // SideBar toggle function
  const bar = document.getElementById('cart');
  const close = document.getElementById('close');
  const close2 = document.getElementById("close2")
  const nav = document.getElementById('navbar');
  const nav2 = document.getElementById("navbar2")
  const nav3 = document.getElementById("navbar3")
  // const summaryBody = document.querySelector("#navbar .summary_body");
  const emptyCartButton = document.getElementById("summary_emptyCart_button")
  const infoNav = document.getElementById("infoNav")
  const shippingNav = document.getElementById("shippingNav")
  const back_Cart = document.getElementById("back_Cart")
  const back_Info = document.getElementById("back_Info")
  //   const bar1 = document.getElementById("bar1")

  if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
    });
  }
  if (infoNav) {
    infoNav.addEventListener("click", () => {
      nav2.classList.add("active2")
      //   summaryBody.innerHTML = `
      //   <div className='summary_body'>
      //   <div className='summary_form'>
      //   <div className='form_item_flex'>
      //   <div className='form_item'>
      //     <input className='form_input' placeholder="Firstname"/>
      //   </div>
      //   <div className='form_item'>
      //     <input className='form_input' placeholder="Firstname"/>
      //   </div>
      //   </div>
      //   <div className='form_item'>
      //     <input className='form_input' placeholder="e.g myemail@gmail.com"/>
      //   </div>

      //   <div className='form_item'>
      //     <input className='form_input' placeholder="+234" type='number'/>
      //   </div>

      //   <div data-v-7ef2909e className='discount_group'>
      //     <input data-v-7ef2909e id='discountCode' className='form_input' placeholder="Optional"/>
      //     <button data-v-7ef2909e className='btn discount_cta' type="">Apply</button>
      //   </div>
      //   </div> 
      // </div>`;
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
  let MainImg = document.getElementById('MainImg');
  let smallimg = document.getElementsByClassName('small-img');

  function getParsedAddedItems(addedItem) {
    let item = '';
    if (Array.isArray(addedItem)) {
      for (let i = 0; i < addedItem.length; i++) {
        const element = addedItem[i];

        item += `
        <div key=${item.id} data-v-7d194230 className='summary_cart_item_variants'>
          <div data-v-7d194230 className='summary_cart_item_product'>
            <div data-v-7d194230 className='summary_cart_item_product_details'>
              <p data-v-7d194230 className='summary_cart_item_product_name'>
                ${item.name}
              </p>
              <span data-v-7d194230 className='summary_cart_item_product_variant'>
                ${item.quantity}
              </span>
              <span data-v-7d194230 className='summary_cart_item_product_price'>
                NGN ${item.price}
              </span>
            </div>
            <div data-v-7d194230 className='summary__cart__item__product__cta'>
              <div data-v-7d194230 className='action'>
                <button data-v-7d194230 type="button" className='action_minus'>
                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
                </button>
                <span data-v-7d194230 className='action__value'>1</span>
                <button data-v-7d194230 type='button' className='action_plus'>
                  <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>`;
      }
    } else {
      item = `<div>
        <p>Product Name: ${addedItem.name}</p>
        <p>Product Variant: ${addedItem.variant}</p>
        <p>Product Price: ${addedItem.price}</p>
      </div>`;

    }

    return item;
  }
  // smallimg[0].onclick = function () {
  //     MainImg.src = smallimg[0].src;
  // }
  // smallimg[1].onclick = function () {
  //     MainImg.src = smallimg[1].src;
  // }
  // smallimg[2].onclick = function () {
  //     MainImg.src = smallimg[2].src;
  // }
  // smallimg[3].onclick = function () {
  //     MainImg.src = smallimg[3].src;
  // }
  //   const config = {
  //     // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
  //     public_key: 'FLWPUBK-8bc4fc27f95377a4bf1b478af957f69f-X',
  //     tx_ref: Date.now (),
  //     amount: 100,
  //     currency: 'NGN',
  //     payment_options: 'card,mobilemoney,ussd',
  //     customer: {
  //       email: localStorage.email,
  //       phone: "0908272651",
  //       name: "Mike"
  //       // email: email,
  //       // phone_number: phone,
  //       // name: name,
  //     },
  //     customizations: {
  //       title: 'My store',
  //       description: 'Payment for items in cart',
  //       logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //     },
  //   };

  //   const fwConfig = {
  //     ...config,
  //     text: 'Pay with Flutterwave!',
  //     callback: response => {
  //       console.log (response);
  //       closePaymentModal (); // this will close the modal programmatically
  //     },
  //     onClose: () => {},
  //   };
  if (!error) {
    return (
      <div>
        <section id="header">
          <a href="#"><img src="img/logo.png" class="logo" alt="" /></a>
          <h3 className='logo'>Star Tech</h3>
          <div>
            <ul id="navbar">
              <div data-v-7d194230 className='summary_body'>
                <div data-v-7d194230 className='summary_cart'>

                  

           

                  {(addedItem || data) && (
                    <div data-v-7d194230 className='summary_cart_item'>
                      {(Array.isArray(addedItem) && addedItem.length > 0) ? (
                        <div data-v-7d194230 className='summary_cart_item'>
                          {addedItem.map((item) => (
                            <div key={item.id} data-v-7d194230 className='summary_cart_item_variants'>
                              <div data-v-7d194230 className='summary_cart_item_product'>
                                <div data-v-7d194230 className='summary_cart_item_product_details'>
                                  <p data-v-7d194230 className='summary_cart_item_product_name'>
                                    {item.name}
                                  </p>
                                  <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                    {size}
                                  </span>
                                  <span data-v-7d194230 className='summary_cart_item_product_price'>
                                    NGN {item.price}
                                  </span>
                                </div>
                                <div data-v-7d194230 className='summary__cart__item__product__cta'>
                                  <div data-v-7d194230 className='action'>
                                    <button data-v-7d194230 type="button" className='action_minus'>
                                      <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
                                    </button>
                                    <span data-v-7d194230 className='action__value'>1</span>
                                    <button data-v-7d194230 type='button' className='action_plus'>
                                      <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        Array.isArray(data) && data.length > 0 && (
                          <div data-v-7d194230 className='summary_cart_item'>
                            {data.map((item) => (
                              <div key={item.id} data-v-7d194230 className='summary_cart_item_variants'>
                                <div data-v-7d194230 className='summary_cart_item_product'>
                                  <div data-v-7d194230 className='summary_cart_item_product_details'>
                                    <p data-v-7d194230 className='summary_cart_item_product_name'>
                                      {item.name}
                                    </p>
                                    <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                      {size}
                                    </span>
                                    <span data-v-7d194230 className='summary_cart_item_product_price'>
                                      NGN {item.price}
                                    </span>
                                  </div>
                                  <div data-v-7d194230 className='summary__cart__item__product__cta'>
                                    <div data-v-7d194230 className='action'>
                                      <button data-v-7d194230 type="button" className='action_minus'>
                                        <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
                                      </button>
                                      <span data-v-7d194230 className='action__value'>1</span>
                                      <button data-v-7d194230 type='button' className='action_plus'>
                                        <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      )}

                    </div>
                  )}




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
                    NGN 150,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary__footer__item__name'>
                    Total
                  </div>
                  <div data-v-7d194230 className='summary__footer__item__value--2'>
                    NGN 15,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <button type="" disabled={isButtonDisabled ? false : true} id='infoNav' className='btn btn--primary btn--block'>Continue</button>
                </div>
              </div>

              <AiOutlineShoppingCart className='cartDesktop' /><p className='cartNumber'>{cartItemCount}</p>
              <GrClose id='close' />
              <ul id='payment_process' className='payment_process'>
                <li>Cart</li>
                <li>Information</li>
                <li>Shipping</li>
              </ul>
            </ul>

            <ul id="navbar2">
              <div className='summary_body'>

                <div className='summary_form'>
                  <div className='form_item_flex'>
                    <div className='form_item'>
                      <input className='form_input' placeholder="Firstname" />
                    </div>
                    <div className='form_item'>
                      <input className='form_input' placeholder="Lastname" />
                    </div>
                  </div>
                  <div className='form_item'>
                    <input className='form_input' placeholder="e.g myemail@gmail.com" />
                  </div>

                  <div className='form_item'>
                    <input className='form_input' placeholder="+234" type='number' />
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
                    NGN 150,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary__footer__item__name'>
                    Total
                  </div>
                  <div data-v-7d194230 className='summary__footer__item__value--2'>
                    NGN 15,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <button type="" id='shippingNav' className='btn btn--primary btn--block'>Continue to shipping</button>
                </div>
              </div>

              <GrClose id='close2' />
              <ul id='payment_process2' className='payment_process'>
                <li id="back_Cart">Cart</li>
                <li>Information</li>
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
                    <textarea rows="" cols="" />
                  </div>

                </div>

              </div>

              <div data-v-7d194230 className='summary__footer'>
                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary_footer_item_name'>
                    Items
                  </div>
                  <div data-v-7d194230 className='summary_footer_item_value'>
                    NGN 150,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <div data-v-7d194230 className='summary__footer__item__name'>
                    Total
                  </div>
                  <div data-v-7d194230 className='summary__footer__item__value--2'>
                    NGN 15,000
                  </div>
                </div>

                <div data-v-7d194230 className='summary__footer__item'>
                  <button type="" className='btn btn--primary btn--block'>PLACE YOUR ORDER</button>
                </div>
              </div>

              <GrClose id='close2' />
              <ul id='payment_process3' className='payment_process'>
                <li id="back_Info">Cart</li>
                <li>Information</li>
                <li>Shipping</li>
              </ul>
            </ul>
          </div>
          <div id="mobile">
            <AiOutlineShoppingCart id='cart' /><p className='cartNumber'>{cartItemCount}</p>
          </div>
        </section>

        {productDetail?.map((result) => (
          <section id="prodetails" className="section-p1" key={result.id}>
            <div className="single-pro-image">
              <img src={result.image} width="100%" id="MainImg" alt="" />
              {/* {{if(result) {
                
              }}} */}
              {result.image.length > 1 && (
                <div className="small-img-group">
                  <div className="small-img-col">
                    <img
                      src={result.image.split('\r\n')[0]}
                      width="100%"
                      className="small-img"
                      alt=""
                    />
                  </div>
                  <div className="small-img-col">
                    <img
                      src={result.image}
                      width="100%"
                      className="small-img"
                      alt=""
                    />
                  </div>
                  <div className="small-img-col">
                    <img
                      src={result.image}
                      width="100%"
                      className="small-img"
                      alt=""
                    />
                  </div>
                  <div className="small-img-col">
                    <img
                      src={result.image}
                      width="100%"
                      className="small-img"
                      alt=""
                    />
                  </div>

                </div>
              )}
            </div>

            <div className="single-pro-details">
              {/* <h6>
                {result.name}
              </h6> */}
              <h4>
                {result.name}
              </h4>
              <h2>
                ₦
                {result.price.toLocaleString()}
              </h2>
              {/* <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/> */}
              <div className='product_quantity'>
                <div className='action'>
                  <button data-v-7be1d382 type="" className='action__btn action__minus' onClick={minusQuantity}>
                    <span data-v-7be1d382 className='action__btn_label'>-</span>
                  </button>
                  <input data-v-7be1d382 type="" name="" value={quantity} className='action__value' onChange={e => setQuantity(e.target.value)} />
                  <button data-v-7be1d382 type="" className='action__btn action__plus' onClick={addQuantity}>
                    <span className='action__btn_label'>+</span>
                  </button>
                </div>
              </div>
              <div className='select_option'>
                <span className='select_option_name'>Size:</span>
                <select onChange={e => setSize(e.target.value)}>
                  {result.size.split(' ').map((size, index) => (
                    <option key={index} className='select_option_value'>{size}</option>
                  ))}
                </select>
              </div>

              {/* // onChange={e => setInput(e.target.value)}/ */}
              <button className="btn btn--primary btn--block" onClick={added} type='button'>Add To Cart</button>
              <h4>Product Details</h4>
              <span>
                {result.description}
              </span>
            </div>
          </section>
        ))}

        {/* {product &&
        productData.map ((result, index) => ( */}
        <section id="Product1" className="section-p1">
          <h2>Featured Products</h2>
          <p>T-shirts, Shoes, And Others</p>
          <div className="pro-container">
            <div className="pro">
              <img src="https://res.cloudinary.com/dlokxjygn/image/upload/v1679793002/r7cb5lygjksmxk8dhg7v.jpg" alt="" />
              <div className="des">
                <span><b>Turkey</b></span>
                <h5>Turkey malavian Gown</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$35</h4>
              </div>
              <a href="pp"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src="https://res.cloudinary.com/dlokxjygn/image/upload/v1678717409/fuigrjhwntvm4wmquivi.jpg" alt="" />
              <div className="des">
                <span><b>Turkey</b></span>
                <h5>Turkey malavian Gown</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$35</h4>
              </div>
              {/* <a href> */}
              <i className="bi bi-cart3" />
              {/* </a> */}
            </div>
            <div className="pro">
              <img src="https://res.cloudinary.com/dlokxjygn/image/upload/v1678226677/qkhsunqqaocjc4hldm0x.jpg" alt="" />
              <div className="des">
                <span><b>Turkey</b></span>
                <h5>Turkey malavian Gown</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$35</h4>
              </div>
              <a href="p"><i className="mdi mdi-shoppingbag" /></a>
            </div>
            <div className="pro">
              <img src="https://res.cloudinary.com/dlokxjygn/image/upload/v1680014852/woaydqodwup9be5ry8uo.jpg" alt="" />
              <div className="des">
                <span><b>Turkey</b></span>
                <h5>Turkey malavian Gown</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$35</h4>
              </div>
              <a href="pp"><i className="fal fa-shopping-cart cart" /></a>
            </div>

          </div>
        </section>
        {/* <FlutterWaveButton type="submit"  className="normal" {...fwConfig} >Proceed to Payment</FlutterWaveButton> */}
        {/* // ))} */}

      </div>
    );
  }
  //   else{
  //   return(
  //     <NotFound />
  //   )
  // }

}

export default StoreProductDetailed;




{/* <div>
{data && data.length > 0 ? (
  <ul>
    {data.map((item, index) => (
      <li key={index}>{item.name}</li>
    ))}
  </ul>
) : (
  <p>No data found.</p>
)}
</div> */}





// {((addedItem || Array.isArray(addedItem)) || data.length > 0) && (
//   <div data-v-7d194230 className='summary_cart_item'>
//   {Array.isArray(addedItem) || data.length > 0 ? (
//     (addedItem || data).map((item) => (
//       <div key={item.id} data-v-7d194230 className='summary_cart_item_variants'>
//         <div data-v-7d194230 className='summary_cart_item_product'>
//           <div data-v-7d194230 className='summary_cart_item_product_details'>
//             <p data-v-7d194230 className='summary_cart_item_product_name'>
//               {item.name}
//             </p>
//             <span data-v-7d194230 className='summary_cart_item_product_variant'>
//               {quantity}
//             </span>
//             <span data-v-7d194230 className='summary_cart_item_product_price'>
//               NGN {item.price}
//             </span>
//           </div>
//           <div data-v-7d194230 className='summary__cart__item__product__cta'>
//             <div data-v-7d194230 className='action'>
//               <button data-v-7d194230 type="button" className='action_minus'>
//                 <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M14.158 12.332H10.7V11.275H14.158V12.332Z" fill="#333333"></path></svg>
//               </button>
//               <span data-v-7d194230 className='action__value'>1</span>
//               <button data-v-7d194230 type='button' className='action_plus'>
//                 <svg data-v-7d194230="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle data-v-7d194230="" cx="12" cy="12" fill="#F2F2F2" r="11.5" stroke="#E0E0E0"></circle> <path data-v-7d194230="" d="M15.406 11.772H12.557V14.782H11.535V11.772H8.7V10.827H11.535V7.838H12.557V10.827H15.406V11.772Z" fill="#333333"></path></svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <div>
//       {/* Render single item details */}
//       <p>Product Name: {addedItem.name}</p>
//       <p>Product Variant: {addedItem.variant}</p>
//       <p>Product Price: {addedItem.price}</p>
//     </div>
//   )}

//   {/* Render data details */}
  
// </div>
// )}