import React from 'react';
import { Link, useParams } from "react-router-dom"
import  "../../App.css";
// import useFetch from "../component/utls/useFetch"
// import NotFound from "../../components/notFound"
import useProductId from '../../hooks/useProductID';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GrAdd } from "react-icons/gr"
import { BiMinus } from "react-icons/bi"
function StorePreview () {
  
  const { store } = useParams();
  const { error, data: storeData } = useProductId(`http://localhost:9000/store/get-store/${store}`)


  // if(!error) {
    return (
      <div>
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
              {result.image} 
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
                  {result.price}
                  </h4>
              </div>
              </Link>
              <div className='lg-bag'>
                 <i className="bi bi-cart2" />
              </div>
              <BiMinus className='minus'/>
              <GrAdd className='add'/>
              {/* <AiOutlineShoppingCart id='bar' className='cart'/> */}
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