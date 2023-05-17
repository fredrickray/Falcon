import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// import product2 from '../component/Image/products/n3.jpg';
// import product3 from '../component/Image/products/n5.jpg';
// import product4 from '../component/Image/products/n6.jpg';
// import NotFound from "../component/ProductNotFound"
import Swal from 'sweetalert2';
import useProductId from '../../hooks/useProductID';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GrClose } from 'react-icons/gr';
import {FlutterWaveButton, closePaymentModal} from 'flutterwave-react-v3';
function StoreProductDetailed () {
  const {id} = useParams ();
  // const [product, setProducts] = useState(null)
  // const URL = `http://localhost:8080/get-products/${id}`;
  const [cartAdd, setCartAdd] = useState(0)
  const [hasData, setHasData] = useState(true);
  const [quantity, setQuantity] = useState (1);
    const[ count, setCount ] = useState(0)
  const { error, data: productDetail } = useProductId(`http://localhost:9000/store/get-product/${id}`)
    
  const added = () => {
    const Toast = Swal.mixin ({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener ('mouseenter', Swal.stopTimer);
        toast.addEventListener ('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire ({
      icon: 'success',
      title: 'Item added to cart',
    });
    setCartAdd(cartAdd + 1);
  };
  // SideBar toggle function
  const bar = document.getElementById ('cart');
  const close = document.getElementById ('close');
  const nav = document.getElementById ('navbar');
//   const bar1 = document.getElementById("bar1")

  if (bar) {
    bar.addEventListener ('click', () => {
      nav.classList.add ('active');
    });
  }

//   if (bar) {
//     bar1.addEventListener ('click', () => {
//       nav.classList.add ('active');
//     });
//   }

  if (close) {
    close.addEventListener ('click', () => {
      nav.classList.remove ('active');
    });
  }

  let MainImg = document.getElementById ('MainImg');
  let smallimg = document.getElementsByClassName ('small-img');

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
  const config = {
    // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
    public_key: 'FLWPUBK-8bc4fc27f95377a4bf1b478af957f69f-X',
    tx_ref: Date.now (),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: localStorage.email,
      phone: "0908272651",
      name: "Mike"
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
    text: 'Pay with Flutterwave!',
    callback: response => {
      console.log (response);
      closePaymentModal (); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  if(!error) {
  return (
    <div>
        <section id="header">
        <a href="#"><img src="img/logo.png" class="logo" alt="" /></a>
        <h3 className='logo'>Star Tech</h3>
        <div>
            <ul id="navbar">
                <div className='summary_body'>
                    <div className='summary_cart'>
                        <div className='summary_cart_item'>
                            <div className='summary_cart_item_product'>
                                <div className='summary_cart_item_product_details'>
                                    <p className='summary_cart_item_product_name'>
                                        Airforce  
                                    </p>
                                    <span className='summary_cart_item_product_variant'>
                                        44  
                                    </span>
                                    <span className='summary_cart_item_product_price'>
                                        NGN 15,000
                                    </span>
                                </div>
                            </div> 
                        </div>
                        <div className='summary_cart_cta'>
                           <button type="button" className='summary_cart_cta_button'>
                                <span className='summary_list_cta_button_label'>
                                    Empty Cart
                                </span>
                            </button> 
                        </div>
                    </div>  
                </div>
                
                <div className='summary_footer'>
                    <div className='summary_footer_item'>
                       <div className='summary_footer_item_name'>
                        Items
                       </div>
                       <div className='summary_footer_item_value'>
                        NGN 150,000
                       </div> 
                    </div>

                    <div className='summary_footer_item'>
                       <div className='summary_footer_item_name'>
                        Total
                       </div>
                       <div className='summary__footer__item__value--2'>
                        NGN 15,000
                       </div> 
                    </div>

                    <div className='summary_footer_item'>
                       <button type="" className='btn btn--primary btn--block'></button> 
                    </div>
                </div>
                <AiOutlineShoppingCart className='cartDesktop'/><p className='cartNumber'>{cartAdd}</p>
                <GrClose id='close' />
            </ul>
        </div>
        <div id="mobile">
            <AiOutlineShoppingCart id='cart' /><p className='cartNumber'>{cartAdd}</p>
        </div>
    </section>
      {/* <section id="header">
        <div>
          <ul id="navbar">
            <li id="lg-bag">
              <i className="bi bi-cart2" >{cartAdd}</i>
            </li>
            <i id="close" className="bi bi-x" />
          </ul>
        </div>
        <div id="mobile">
          <a href="a"><i className="bi bi-cart2" >{cartAdd}</i></a>
          <AiOutlineShoppingCart id='bar' style={{color: "black"}}/>
        </div>
      </section> */}
      {productDetail?.map ((result) => (
          <section id="prodetails" className="section-p1" key={result.id}>
            <div className="single-pro-image">
              <img src={result.image} width="100%" id="MainImg" alt="" />

              <div className="small-img-group">
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
                <div className="small-img-col">
                  <img
                    src={result.image}
                    width="100%"
                    className="small-img"
                    alt=""
                  />
                </div>

              </div>
            </div>

            <div className="single-pro-details">
              <h6>
                {result.name}
              </h6>
              <h4>
                {result.name}
              </h4>
              <h2>
                ₦
                {result.price.toLocaleString()}
              </h2>
              <select>
                <option>Select Size</option>
                <option>{result.size}</option>
              </select>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
              {/* // onChange={e => setInput(e.target.value)}/ */}
              <button className="normal" onClick={added}>Add To Cart</button>
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
      <FlutterWaveButton type="submit"  className="normal" {...fwConfig} >Proceed to Payment</FlutterWaveButton>
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
