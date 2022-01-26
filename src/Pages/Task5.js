import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../AppContext';
import DataTable from '../Components/DataTable';
import SidePanel from '../Components/SidePanel';
import data from "../products.json";

export default function Task5() {
  const [ productData, setProductData ] = useState(data);
  const [ showSidePanel, setShowSidePanel ] = useState(false);
  const {
    categoryFilter,
    manufacturerFilter,
    priceFrom,
    priceTo,
   } = useContext(AppContext);

  const handleApply = () => {
    let filteredData = [];
    if (priceFrom && priceTo) {
      if (categoryFilter.length === 0 && manufacturerFilter.length === 0) {
        filteredData = productData.slice().filter(product => {
          if (product.price >= priceFrom && product.price <= priceTo) return product});
      } else if (categoryFilter.length !== 0 && manufacturerFilter.length === 0) {
        filteredData = productData.slice().filter(product => {
          if (product.price >= priceFrom && product.price <= priceTo && categoryFilter.includes(product.category)) return product});
      } else if (categoryFilter.length === 0 && manufacturerFilter.length !== 0) {
        filteredData = productData.slice().filter(product => {
          if (product.price >= priceFrom && product.price <= priceTo && manufacturerFilter.includes(product.manufacturer)) return product});
      } else {
        filteredData = productData.slice().filter(product => {
          if (product.price >= priceFrom && product.price <= priceTo && manufacturerFilter.includes(product.manufacturer) && categoryFilter.includes(product.category)) return product});
      }
    } else {
      if (categoryFilter.length > 0 && manufacturerFilter.length === 0) {
        filteredData = productData.slice().filter(product => {
          if (categoryFilter.includes(product.category)) return product});
      } else if (categoryFilter.length === 0 && manufacturerFilter.length > 0) {
        filteredData = productData.slice().filter(product => {
          if (manufacturerFilter.includes(product.manufacturer)) return product});
      } else {
        filteredData = productData.slice().filter(product => {
          if (categoryFilter.includes(product.category) && manufacturerFilter.includes(product.manufacturer)) {
            return product;
          }
        });
      }
    }
    setProductData(filteredData);
    setShowSidePanel(false);
  }

  return <>
      <h1 className="text-center">Task 5 - Table Filter and Sort</h1>
      <div className="text-end my-4">
        <Button
          variant="dark"
          className="px-4"
          onClick={() => setShowSidePanel(true)}

        >
        Options
        </Button>
      </div>
      <DataTable 
        productData={productData}
        setProductData={setProductData} 
        setShowSidePanel={setShowSidePanel}
        />
      <SidePanel 
        productData={productData}
        setProductData={setProductData}
        showSidePanel={showSidePanel} 
        setShowSidePanel={setShowSidePanel}
        handleApply={handleApply}
        />
  </>;
}
