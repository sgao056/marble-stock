import React, { Component } from 'react'
import axios from '../common/axios'
import {toast} from 'react-toastify'

export class AddInventory extends Component {
    state = {
        name:'',        
        price:'',
        tags:'',
        image:'',
        status:'available',
    }
    
    handleChange = e => {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]:value
        })
    }

    Submit = e=>{
        e.preventDefault();
        const product = {...this.state}
        axios.post('products', product)
        .then(res=>{
            this.props.close(res.data)
            toast.success('Successfully adding')
        })
        .catch(()=>{
            toast.error('Server not found')
        })
    }

    render() {
        return (
            <div className='inventory'>
                <p className="title has-text-centered">Inventory</p>
                <form onSubmit={this.Submit}>
                    <div className="field">
                            <div className="control">
                                <label className="label">Name</label>
                                <textarea 
                                className="textarea" 
                                name='name' 
                                value={this.state.name} 
                                onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                            <label className="label">Price</label>
                                <input 
                                type='number' 
                                className="input" 
                                name='price' 
                                value={this.state.price} 
                                onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                            <label className="label">Tags</label>
                                <input 
                                type='text' 
                                className="input" 
                                name='tags' 
                                value={this.state.tags} 
                                onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="label">Images</label>
                                <input type='text' 
                                className="input" 
                                name='image' 
                                value={this.state.image} 
                                onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="label">Status</label>
                                <div className="select is-fullwidth">
                                    <select 
                                    name="status" 
                                    value={this.state.status} 
                                    onChange={this.handleChange}>
                                        <option>available</option>
                                        <option>unavailable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button 
                            className="button" 
                            type='button' 
                            onClick={()=>{this.props.close()}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInventory
