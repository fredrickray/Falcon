import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import product2 from '../component/Image/products/n3.jpg';
import product3 from '../component/Image/products/n5.jpg';
import product4 from '../component/Image/products/n6.jpg';
import NotFound from "../component/ProductNotFound"
import Swal from 'sweetalert2';
import useNotFound from "../component/useEffects/useNotFound"

function Cart () {
  const {id} = useParams ();
  // const [product, setProducts] = useState(null)
  // const URL = `http://localhost:8080/get-products/${id}`;
  const [cartAdd, setCartAdd] = useState(0)
  const [hasData, setHasData] = useState(true);
  const [quantity, setQuantity] = useState (1);
  const { error, data: productDetail } = useNotFound(`http://localhost:8080/get-products/${id}`)

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
  const bar = document.getElementById ('bar');
  const close = document.getElementById ('close');
  const nav = document.getElementById ('navbar');

  if (bar) {
    bar.addEventListener ('click', () => {
      nav.classList.add ('active');
    });
  }

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
  

  // const productData = JSON.parse (localStorage.getItem ('productID'));
  
  if(!error) {
  return (
    <div>
      <h1>WORKING --{id} </h1>
      <section id="header">
        {/* <a href="#"><img src={Logo} className="logo" alt="" style={{height: "100px"}}/></a> */}

        <div>
          <ul id="navbar">
            <li id="lg-bag">
              <i className="bi bi-cart2" >{cartAdd}</i>
              {/* <i class="bi bi-cart2"></i> */}
            </li>
            <i id="close" className="bi bi-x" />
          </ul>
        </div>
        <div id="mobile">
          <a href="a"><i className="bi bi-cart2" >{cartAdd}</i></a>
          <i id="bar" className="bi bi-list" />

        </div>
      </section>
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
                    src={product2}
                    width="100%"
                    className="small-img"
                    alt=""
                  />
                </div>
                <div className="small-img-col">
                  <img
                    src={product3}
                    width="100%"
                    className="small-img"
                    alt=""
                  />
                </div>
                <div className="small-img-col">
                  <img
                    src={product4}
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
                {result.price}
              </h2>
              <select>
                <option>Select Size</option>
                <option>XL</option>
                <option>XXL</option>
                <option>Small</option>
                <option>Large</option>
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
            <img src="img/products/n2.jpg" alt="" />
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
            <img src="img/products/n3.jpg" alt="" />
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
            <img src="img/products/n4.jpg" alt="" />
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
            <img src="img/products/f5.jpg" alt="" />
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
      {/* // ))} */}

    </div>
  );
}
  else{
  return(
    <NotFound />
  )
}

}

export default Cart;
