import React, { Fragment, useEffect } from 'react'
// import { CgMouse } from "react-icons/cg"
import "./Home.css"
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productAction'
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader/Loader"

const Home = () => {
  const { loading,  products } = useSelector((state) => state.products)

  const dispatch = useDispatch();
  useEffect(() => {
    // if(error){
    //   dispatch(clearErrors)
    // }
    dispatch(getProduct())
  }, [dispatch])
  return (
    <Fragment>
      {loading ? (<Loader/>) :
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

        </Fragment>
        }
    </Fragment>
  )
}

export default Home