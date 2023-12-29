import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useProductId from '../../hooks/useProductID';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GrClose } from 'react-icons/gr';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import NotFound from '../../components/notFound';
import ServerError from '../../components/ServerError';
import { usePaymentContext } from "../../context/PaymentContext"
function StoreProductDetailed() {
  const { addDataToPaymentContext } = usePaymentContext()
  const { id } = useParams();
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [customer_email, setCustomerEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [discount, setDiscount] = useState("")
  // const [state, setStates] = useState(["Abia", "Abuja", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]);
  const state = ["Abia", "Abuja", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
  const [selectedState, setSelectedState] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryNote, setDeliveryNote] = useState("")
  const [shippingMoney, setShippingMoney] = useState(0.00)
  const [deliveryInfo, setDeliveryInfo] = useState([])
  // const [shpping, setShippping] = useState()
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isQuantityZero, setIsQuantityZero] = useState(false)
  const { error, data: productDetail, store, isFetching } = useProductId(`http://localhost:9000/store/product/${id}`)
  const GET_DELIVERY_URL = `${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/delivery`
  const [addedItem, setAddedItem] = useState([])
  // const [isInputValid, setIsInputValid] = useState(false)
  const { email } = localStorage
  let sumPrice = addedItem.reduce((acc, item) => acc + item.price, 0);
  sumPrice = sumPrice * quantity
  let totalPrice = sumPrice + shippingMoney

  const navigate = useNavigate()


  const handleVariantSize = (e) => {
    if (productDetail === null) {
      return;
    }
    const { value } = e.target;
    productDetail[0].size = value
    console.log(value)
  }

  const handleVariantColour = (e) => {
    if (productDetail === null) {
      return;
    }
    const { value } = e.target;
    productDetail[0].colour = value
    console.log(value)
  }

  const handleVariantStyle = (e) => {
    if (productDetail === null) {
      return;
    }
    const { value } = e.target;
    productDetail[0].style = value;
    console.log(value)
  }



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const options = {
  //         method: 'GET',
  //         url: 'https://referential.p.rapidapi.com/v1/country',
  //         params: {
  //           fields: 'currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code',
  //           limit: '20',
  //           // continent_code: 'AF',
  //           currency_code: 'NGN',
  //         },
  //         headers: {
  //           'X-RapidAPI-Key': '8b57bdc3dcmsh8ae267c7ceaff4ep1b9f49jsnf07c663c102b',
  //           'X-RapidAPI-Host': 'referential.p.rapidapi.com',
  //         },
  //       };

  //       const response = await axios.request(options);
  //       console.log(response.data);
  //       setCountries(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleCountryChange = (event) => {
  //   const selectedCountry = event.target.value;
  //   setSelectedCountry(selectedCountry);

  //   // Filter the states based on the selected country
  //   const selectedCountryData = countries.find((country) => country.value === selectedCountry);
  //   const filteredStates = selectedCountryData?.states || [];
  //   setStates(filteredStates);
  //   setSelectedState(''); // Reset the selected state when a new country is selected
  // };



  const added = () => {
    // Assuming 'setAddedItem', 'productDetail', 'Swal', 'setCartItemCount', 'cartItemCount', 'localStorage', 'variant' are defined somewhere

    // Checking if the product is already in the cart
    const isProductInCart = addedItem.some(item => item.id === productDetail.id);

    if (isProductInCart) {
      // Display an error message using SweetAlert2 or other UI element
      Swal.fire({
        icon: 'error',
        title: 'Item already in cart',
        text: 'The selected item is already in your cart.',
      });
    } else {
      // Update the state to add the productDetail to the cart items
      setAddedItem((prevCartItem) => [...prevCartItem, ...productDetail]);

      // Display the success toast notification
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Item added to cart',
      });

      // Update the cart item count in the state
      setCartItemCount(cartItemCount + 1);
    }
  };


  // const addQuantity = (id) => {
  //   // const filter = productDetail.find(obj => obj.id === id)
  //   const secondFilter = addedItem.find(obj => obj.id === id)
  //   // setFilteredQantity(filter)
  //   console.log(secondFilter)
  //   setQuantity(quantity + 1)
  //   // if (quantity > productDetail[0].quantity) {
  //   //   Swal.fire({
  //   //     position: 'top-end',
  //   //     toast: true,
  //   //     title: `Quantity not available`,
  //   //     color: 'red',
  //   //     showConfirmButton: false,
  //   //     timer: 2500,
  //   //   });
  //   //   console.log(quantity)
  //   //   return
  //   // }
  //   // else {
  //   //   setQuantity(quantity + 1)
  //   // }
  //   // setQuantity(id.target.value(quantity + 1))

  // }
  const [firstClick, setFirstClick] = useState(false)

  // useEffect(() => console.log(addedItem), [addedItem])
  const addQuantity = (id) => {
    // Find the index of the item in the addedItem array
    const itemIndex = addedItem.find((item) => item.id === id);
    console.log(itemIndex)
    // console.log(addedItem)

    if (itemIndex.cartQuantity <= itemIndex.quantity) {
      if (firstClick) {
        const newArray = addedItem.map((obj) => (obj.id === id ? { ...obj, cartQuantity: obj.cartQuantity + 1 } : obj))
        setAddedItem(newArray)
      }
      else {
        const newArray = addedItem.map((obj) => (obj.id === id ? { ...obj, cartQuantity: obj.cartQuantity + 2 } : obj))
        setAddedItem(newArray)
        setFirstClick(true)
      }
    }
    else {
      Swal.fire({
        position: 'top-end',
        toast: true,
        title: `Quantity not available`,
        color: 'red',
        showConfirmButton: false,
        timer: 2500,
      });
    }

  };





  const minusQuantity = (id) => {
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
    // console.log(parsedArray)
    // console.log(productDetail)
    if (parsedArray) {
      const itemCount = parsedArray.length;
      // if (productDetail && parsedArray) {
      // console.log("asasas")

      // const updatedArray = parsedArray.filter(result => result.quantity !== 0);

      // Check if productDetail quantity is 0 and remove the item from updatedArray if it matches
      // if (productDetail && productDetail[0].quantity === 0) {
      //   const productIdToRemove = productDetail[0].id;
      //   const filteredArray = updatedArray.filter(result => result.id !== productIdToRemove);
      //   console.log(filteredArray)
      //   localStorage.setItem("cartItem", JSON.stringify(filteredArray));
      // }

      // if(productDetail == null) {
      //   return "Returning null"
      // }
      // else{
      //   if(productDetail[0].quantity === 0) {
      //     setIsQuantityZero(true)
      //   }
      //   else{
      setIsQuantityZero(false)
      setAddedItem(parsedArray)
      setCartItemCount(itemCount);
      //   }
      // }



      // const updatedItem = parsedArray?.filter(result =>  result.quantity !== 0) // return result.quantity !== 0;
      //   if(updatedItem.id === productDetail[0].id) {
      //     if(productDetail && productDetail[0].quantity === 0) {
      //       console.log(updatedItem)
      //       setIsQuantityZero(true)
      //     }
      //     console.log("Quantity is not equal to zero")
      //   }
      //   else{
      //     console.log("results where id does not match")
      //   }

      // Update the localStorage with the updated array
      // localStorage.setItem('cartItem', JSON.stringify(parsedArray));

      // console.log(updatedItems)
      // }
      // console.log(itemCount);
      // console.log(updatedItems);
      // setData(parsedArray);
      // setAddedItem(parsedArray)
      // // setQuantity(itemQuantity)
      // setCartItemCount(itemCount);
    }

  }, []);

  useEffect(() => {
    const check = () => {
      if (productDetail != null) {
        if (productDetail[0].quantity === 0) {
          setIsQuantityZero(true)
        }
        else {
          setIsQuantityZero(false)
        }
      }
      return "Product detail have not mounted"

    }
    check()
  }, [productDetail])


  // useEffect(() => {
  //   localStorage.removeItem("")
  // })

  // useEffect(() => {
  //   if (!error && productDetail) {
  //     const itemsFromStorage = JSON.parse(localStorage.getItem('cartItem'));

  //     const updatedItems = itemsFromStorage?.map(item => {
  //       if (item.id === productDetail[0].id) {
  //         // If the IDs match, update the quantity
  //         setIsQuantityZero(true)
  //         return { ...item, quantity: productDetail[0].quantity };
  //       }
  //       setIsQuantityZero(false);
  //       return item;
  //     });

  //     // Update the localStorage with the updated array
  //     localStorage.setItem('cartItem', JSON.stringify(updatedItems));
  //     setAddedItem(updatedItems)
  //     console.log(updatedItems)
  //   }
  // }, [productDetail])

  // if (!error && productDetail) {
  //   const itemsFromStorage = JSON.parse(localStorage.getItem('cartItem'));

  //   const updatedItems = itemsFromStorage.map(item => {
  //     if (item.id === productDetail[0].id) {
  //       // If the IDs match, update the quantity
  //       return { ...item, quantity: productDetail[0].quantity };
  //     }
  //     return item;
  //   });

  //   // Update the localStorage with the updated array
  //   localStorage.setItem('cartItem', JSON.stringify(updatedItems));
  // }

  const [discountValue, setDiscountValue] = useState([])
  const fetchDiscount = async () => {
    try {
      const response = await axios.get("http://localhost:9000/store/discount", { email })
      console.log(response.data.discounts)
      const discount = response.data.discounts
      const newDiscounts = discount.map(item => ({ name: item.name, price: item.price }))
      console.log(newDiscounts)
      setDiscountValue(newDiscounts)

    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchDeliveryValues();
    // fetchDiscount()
    fetch()
  }, []);


  const fetchDeliveryValues = async () => {
    try {
      const response = await axios.get(GET_DELIVERY_URL, {
        params: { email }
      })
      // console.log(response)
      const shipping = response.data.data
      const newShiping = shipping.map((item) => ({ location: item.location, fee: item.fee }))
      setDeliveryInfo(newShiping)
    }
    catch (error) {
      console.log(error)
      // console.error(error.message);
    }
  };

  const handleDiscount = () => {
    //  validate if discount exist
    const newDiscount = discountValue.filter(items => items.name === discount)
    console.log(newDiscount)
    if (newDiscount.length) {
      Swal.fire({
        title: 'Discount code confirmed.',
        position: "center",
        showConfirmButton: false
      });
      console.log(newDiscount[0].price)
      totalPrice = totalPrice - newDiscount[0].price
    }
    else {
      console.log("Discount code not found")
    }
  }

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
      console.log("working")
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
  let MainImg = document.getElementById('MainImg');
  let smallimg = document.getElementsByClassName('small-img');

  for (let i = 0; i < smallimg.length; i++) {
    smallimg[i].onclick = function () {
      MainImg.src = smallimg[i].src;
    };
  }

  const selectedItemsData = addedItem.map(item => ({
    product_Id: item.id,
    name: item.name,
    price: item.price,
    quantity: quantity,
    image: item.image
  }));


  const initiatePayment = async () => {
    const mainData = { email, firstname, lastname, customer_email, shippingMoney, discount, state: selectedState, address: deliveryAddress, delivery_note: deliveryNote, currency: "NGN", amount: totalPrice }
    addDataToPaymentContext(mainData)
    try {
      const response = await axios.post("http://localhost:9000/payment/initiate", {
        customer_email,
        firstname,
        lastname,
        totalPrice,
        phone
      })
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

 



  // const config = {
  //   // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
  //   public_key: process.env.REACT_APP_FLTW_TEST_PUBLIC_KEY,
  //   tx_ref: Date.now(),
  //   amount: totalPrice,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     email: customer_email,
  //     phone: phone,
  //     name: firstname + " " + lastname
  //   },
  //   customizations: {
  //     title: 'My store',
  //     description: 'Payment for items in cart',
  //     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //   },
  // };

  // const fwConfig = {
  //   ...config,
  //   text: 'Proceed to payment',
  //   callback: async (response) => {
  //     console.log(response);
  //     closePaymentModal(); // this will close the modal programmatically

  //     const { tx_ref, amount, currency, transaction_id, status } = response;
  //     const mainData = { email, firstname, lastname, customer_email, tx_ref, shipping_money: shippingMoney, amount, discount, state: selectedState, address: deliveryAddress, delivery_note: deliveryNote, status, currency, transaction_id }
  //     try {
  //       const response = await axios.post('https://falcon-server-jaek.onrender.com/payment/new_payment', {
  //         mainData,
  //         itemsData: selectedItemsData
  //       });

  //       console.log(response)
  //       console.log('POST request successful:', response.data);
  //       localStorage.removeItem("cartItem")
  //       setFirstname('')
  //       setLastname('')
  //       setCustomerEmail('')
  //       setPhone('')

  //       // window.location.href = `/Store/${store}`

  //       if (status === "successful" || "completed") {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Transaction completed succesfully',
  //           showConfirmButton: false,
  //           timer: 2500
  //         })

  //         console.log("Success status: ", status)
  //       }
  //       else {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: 'Transaction was not succesfully',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })

  //         console.log(status)
  //       }
  //     }
  //     catch (error) {
  //       console.error('POST request error:', error.message);
  //     }
  //   },
  //   onClose: () => console.log("Closing payment modal"),
  // };



  return (
    <div>
      {isFetching && (
        <LineWave
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="line-wave"
          wrapperStyle={{ justifyContent: "center", position: "absolute", display: "flex", alignItems: "center", transform: "translate(-30%, -70%)", top: "50%", left: "50%", }}
          wrapperClass=""
          visible={true}
          firstLineColor="black"
          middleLineColor="black"
          lastLineColor="black"
        />
      )}

      {!isFetching && error === 500 && !productDetail ? (
        <ServerError />
      ) : null}

      {!isFetching && error && error !== 500 ? (
        <NotFound />
      )
        :
        (
          <div>
            <section id="header">
              <div onClick={() => navigate(`/Store/${store}`)}>
                <i className="fa fa-arrow-left cursor-pointer" aria-hidden="true"></i>
              </div>
              <h3 style={{ paddingLeft: "50px" }} className='logo'>{store}</h3>
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
                                    {info.size && (
                                      <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                        {info.size}
                                      </span>
                                    )}
                                    {info.style && (
                                      <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                        {info.style}
                                      </span>
                                    )}
                                    {info.colour && (
                                      <span data-v-7d194230 className='summary_cart_item_product_variant'>
                                        {info.colour}
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
                                      <span data-v-7d194230 className='action__value'>{info.cartQuantity || 1}</span>
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
                      {/* <FlutterWaveButton className="btn_ship btn-success btn-md ms-auto" {...fwConfig} >Proceed to Payment</FlutterWaveButton> */}
                      <button type="" className='btn_ship btn-success btn-md ms-auto' onClick={initiatePayment}>Proceed to Payment</button>
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

            {productDetail?.map((result) => (
              <section id="prodetails" className="section-p1" key={result.id}>
                <div className="single-pro-image">
                  <img src={result.image.split('\r\n')[0]} width="100%" id="MainImg" alt="" />
                  {/* {result.image.length > 1 && ( */}
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
                        src={result.image.split('\r\n')[1]}
                        width="100%"
                        className="small-img"
                        alt=""
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src={result.image.split('\r\n')[2]}
                        width="100%"
                        className="small-img"
                        alt=""
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src={result.image.split('\r\n')[3]}
                        width="100%"
                        className="small-img"
                        alt=""
                      />
                    </div>

                  </div>
                  {/* // )} */}
                </div>

                <div className="single-pro-details">
                  {/* <h6>
                {result.name}
              </h6> */}
                  <h4>
                    {result.name}
                  </h4>
                  <div className=' flex flex-wrap'>
                    <h2>
                      NGN
                      <span> {result.price.toLocaleString()}</span>
                    </h2>
                    {/* {result.compare_price && (
                  <h2 style={{ textDecoration: "line-through", marginLeft: "20px", color: "#828282" }}>
                    NGN
                    <span>{result.compare_price.toLocaleString()}</span>
                  </h2>
                )} */}
                  </div>
                  {/* <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/> */}
                  <div className='product_quantity'>
                    <label
                      // className="block tracking-wide text-xs font-bold mb-2"
                      htmlFor="price"
                    >
                      Quantity:
                    </label>
                    <div className='action'>
                      <button data-v-7be1d382 type="" className='action__btn action__minus' onClick={() => minusQuantity(result.id)}>
                        <span data-v-7be1d382 className='action__btn_label'>-</span>
                      </button>
                      <input data-v-7be1d382 type="" name="" value={quantity} className='action__value' />
                      <button data-v-7be1d382 type="" className='action__btn action__plus' onClick={() => addQuantity(result.id)}>
                        <span className='action__btn_label'>+</span>
                      </button>
                    </div>
                  </div>

                  {result.size && (
                    <div className='select_option'>
                      <label
                        // className="block tracking-wide text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Size:
                      </label>
                      {/* <span className='select_option_name'>variant:</span> */}
                      <select onChange={e => handleVariantSize(e)}>
                        <option className='select_option_value'>Select a size</option>
                        {result.size.split(' ').map((variant, index) => (
                          <option key={index} value={variant} className='select_option_value'>{variant}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {result.style && (
                    <div className='select_option'>
                      <label
                        // className="block tracking-wide text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Style:
                      </label>
                      {/* <span className='select_option_name'>variant:</span> */}
                      <select onChange={e => handleVariantStyle(e)}>
                        <option className='select_option_value'>Select a Style</option>
                        {result.style.split(' ').map((variant, index) => (
                          <option key={index} className='select_option_value'>{variant}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {result.colour && (
                    <div className='select_option'>
                      <label
                        // className="block tracking-wide text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Colour:
                      </label>
                      {/* <span className='select_option_name'>variant:</span> */}
                      <select onChange={e => handleVariantColour(e)}>
                        <option className='select_option_value'>Select a Colour</option>
                        {result.colour.split(' ').map((variant, index) => (
                          <option key={index} className='select_option_value'>{variant}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* <div className='flex flex-wrap'>
                
              </div> */}

                  {/* // onChange={e => setInput(e.target.value)}/ */}
                  <button disabled={isQuantityZero} style={{ backgroundColor: isQuantityZero ? "rgb(130, 130, 130)" : "", cursor: isQuantityZero ? "not-allowed" : "" }} className={`btn ${isQuantityZero ? "rgb(130, 130, 130)" : "btn--primary"}  btn--block`} onClick={added} type='button'>{isQuantityZero ? "Out of Stock" : "Add To Cart"}</button>
                  {/* <h4>Product Details</h4> */}
                  <span>
                    {result.description}
                  </span>
                </div>
              </section>
            ))}
          </div>
        )
      }



    </div>
  );
}

export default StoreProductDetailed;