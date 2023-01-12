import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetails, clearErrors } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard"

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.productDetails)

    const params = useParams()
    useEffect(() => {
        // if(error){

        //     dispatch(clearErrors())
        // }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id])

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images && product.images.map((item, i) => (
                            <img className='CarouselImage'
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product 3 {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                </div>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button>-</button>
                        <input type="number" value="1" />
                        <button>+</button>
                    </div>{" "}
                    <button>Add to Cart</button>
                </div>
                <p>
                    Status:{" "}
                    <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                        {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                    </b>
                </p>
                <div className='detailsBlock-4'>
                    Description : <p>{product.description}</p>

                </div>
                <button className="submitReview">Submit Review</button>
            </div>
            <h3 className="reviewHeading">REVIEWS</h3>

            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>

                    {product.reviews &&
                        product.reviews.map((review) => <ReviewCard review={review} />)}
                </div>
            ) : (
                <p className='noReviews'>No Reviews</p>
            )}
        </Fragment>

    )
}

export default ProductDetails