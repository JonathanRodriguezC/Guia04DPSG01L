import React from "react";
import { data } from "../app/data.js";
import { useState } from "react";

export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal, }) => {

    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };


    const selectProduct = product => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    }

    return (
        <div className="container-items">
            {data.map(product => (
                <div className="item" key={product.id}>
                    <figure>
                        <img src={product.urlImage} alt={product.title} onClick={() => selectProduct(product)} />
                    </figure>
                    <div className="info-product">
                        <h2 className="titulo-producto-carrito ">{product.title}</h2>
                        <p className="price">${product.price}</p>
                        <button onClick={() => onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </div>
            ))}
            {showModal && selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedProduct.urlImage} alt={selectedProduct.title} className="modal-image" />
                        <h2 className="modal-title">{selectedProduct.title}</h2>
                        <p className="modal-description">{selectedProduct.summary}</p>
                        <p className="modal-price">Precio: ${selectedProduct.price}</p>
                        <button onClick={closeModal} className="modal-button">Cerrar</button>
                    </div>
                </div>
            )}
        </div>

    );
}