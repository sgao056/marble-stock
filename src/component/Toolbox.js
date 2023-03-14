import React, { Component } from 'react'

export class Toolbox extends Component {
    
    state={
        searchText:''
    }
    
    handleChange = (event)=>{
        const value = event.target.value
        this.setState({
            searchText: value
        })
        this.props.search(value)
    }

    handleClick = ()=>{
        this.setState({
            searchText:''
        })
    }

    render() {
        return (
            <div className='tool-box'>
                <div className="logo-text">Stock</div>
                    <div className="search-box">
                        <div className="field has-addons">
                            <div className="control">
                                <input type="text" className='input search-input' placeholder='Search here' onChange={this.handleChange} value={this.state.searchText}/>
                            </div>
                            <div className="control">
                                <button className="button" onClick={this.handleClick}>x</button>
                            </div>
                        </div>
                    </div>                
                <div className="cart-box">
                    <span className="cart-num">
                        <i className="fas fa-shopping-cart"></i>
                    </span>
                </div>
            </div>
        )
    }
}

export default Toolbox
