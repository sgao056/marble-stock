import React, { Component } from 'react'
import axios from '../common/axios'
import {formatPrice} from '../common/helper.js'
import Panel from './Panel'
import EditInventory from './EditInventory.js'
import { toast } from 'react-toastify'

export class Product extends Component {
    
    toEdit = ()=>{
        Panel.open({
            props: {   
                        product: this.props.product,
                        deleteData: this.props.deleteData
                    },
            component: EditInventory,
            callback: data=>{
                if (data)
                {
                    this.props.updateData(data)
                }
            }
        })
    }

    addCart = async () => {
        try{
            const {id, name, image, price} = this.props.product;
            const res = await axios.get(`/carts?productId=${id}`)
            const carts = res.data
            if(carts && carts.length>0){
                const cart = carts[0]
                cart.mount += 1
                axios.put(`/carts/${cart.id}`, cart)
            }
            else {
                const cart = {
                    productId:id,
                    name,
                    image,
                    price,
                    mount:1
                }
                await axios.post('/carts',cart)
            }
            toast.success('Add Cart Success');
        }
        catch(error){
            toast.error('Add Cart Failed');
        }
    }
    
    render() {

        const {name, price, tags, image, status} = this.props.product
        const _pClass = {
            available: 'product',
            unavailable: 'product out-stock'
        }
        return (
            <div className={_pClass[status]}>
                <div className="p-content">
                    <div className="p-head has-text-right" onClick={this.toEdit}>
                        <span className="icon edit-btn">
                            <i className="fas fa-sliders-h"></i>
                        </span>
                    </div>
                   <div className="img-wrapper">
                        <div className="out-stock-text">Out of stock</div>
                        <figure className="image is-4by3" style={{height:"100%",width:"100%",marginTop:"20px",display:"flex",justifyContent:"start"}}>
                            <img src={image} alt={name} style={{height:"100%",width:"100%"}}/>
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="p-name">{name}</p>
                </div>
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart" disabled= {status==='unavailable'} onClick={this.addCart}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Product;
