import React, { useContext, useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Offcanvas } from 'react-bootstrap';
import AppContext from '../AppContext';
import CheckboxFilterTempate from './CheckboxFilterTempate';
import data from "../products.json";

export default function SidePanel(props) {
    const { showSidePanel,
        setShowSidePanel,
        productData,
        handleApply,
        setProductData
    } = props
    const { reset,
        setReset,
        categoryFilter,
        manufacturerFilter,
        setCategoryFilter,
        setManufacturerFilter,
        setAllExceptCategory,
        setAllExceptManufacturer,
        priceFrom,
        setPriceFrom,
        priceTo,
        setPriceTo
    } = useContext(AppContext);
    const [categoriesCheckboxes, setCategoriesCheckboxes] = useState([]);
    const [manufacturerCheckboxes, setManufacturerCheckboxes] = useState([]);

    const originalProductData = data;

    const handleClose = () => {
        setShowSidePanel(false);
    }

    const handleReset = () => {
        setReset(true);
        setCategoryFilter([]);
        setManufacturerFilter([]);
        setProductData(originalProductData);
        setAllExceptCategory(false);
        setAllExceptManufacturer(false);
        setShowSidePanel(false);
        setPriceFrom("");
        setPriceTo("");
    }

    const handleCheckboxes = () => {
        const uniqueCategories = [...new Set(productData.map(product => product.category))]
        const uniqueManufacturers = [...new Set(productData.map(product => product.manufacturer))];
        uniqueCategories.sort((a, b) =>{
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0
        })
        uniqueManufacturers.sort((a, b) =>{
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0
        })
        const category = uniqueCategories.map((category, index) => {
            return(
                <CheckboxFilterTempate
                    reset={reset}
                    id={`category-box-${index + 1}`}
                    key={index}
                    type="checkbox"
                    label={category}
                    data="category"
                    showSidePanel={showSidePanel}
                />
            )
        });
        const manufacturer = uniqueManufacturers.map((manufacturer, index) => {
            return(
                <CheckboxFilterTempate
                    reset={reset}
                    id={`manufacturer-box-${index + 1}`}
                    key={index}
                    type="checkbox"
                    label={manufacturer}
                    data="manufacturer"
                    showSidePanel={showSidePanel}
                    setShowSidePanel={setShowSidePanel}
                />
            )
        });
        setCategoriesCheckboxes(category);
        setManufacturerCheckboxes(manufacturer);
    }

    useEffect(() => {
        if (productData.length > 0) {
            handleCheckboxes();
        }
    }, [productData])

  return <>
    <Offcanvas show={showSidePanel} onHide={handleClose} placement='end' scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>Filter Options</Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="mb-3">
                    <div className="fw-bold">Price range</div>
                    <div className="my-2">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>From</InputGroup.Text>
                        <FormControl
                            aria-label="From" type="number"
                            value={priceFrom}
                            onChange={e => setPriceFrom(e.target.value)}
                        />
                        <InputGroup.Text>To</InputGroup.Text>
                        <FormControl
                            aria-label="To" type="number"
                            value={priceTo}
                            onChange={e => setPriceTo(e.target.value)}
                        />
                    </InputGroup>
                    </div>
                </div>
                <div className="d-flex p-3 bg-light rounded-3 mb-3">
                    <div className="mx-2 w-100">
                        <div className="mb-2 fw-bold">Categories</div>
                        <CheckboxFilterTempate label="All except" data="except-category" />
                        <hr />
                        {categoriesCheckboxes}
                    </div>
                    <div className="mx-2 w-100">
                        <div className="mb-2 fw-bold">Manufacturers</div>
                        <CheckboxFilterTempate label="All except" data="except-manufacturer" />
                        <hr />
                        {manufacturerCheckboxes}
                    </div>
                </div>

            </Offcanvas.Body>
            <div className="shadow-sm" style={{ zIndex: "1000"}}>
                <Offcanvas.Header className="border-top d-block">
                    {
                        (priceFrom && priceTo) &&
                        <div className="small bg-success rounded-3 p-2 mb-2 w-100 text-light overflow-auto">
                            {
                                parseInt(priceFrom) <= parseInt(priceTo) &&
                                <span>From P{parseInt(priceFrom).toLocaleString()} to P{parseInt(priceTo).toLocaleString()} </span>

                            }
                            {
                                parseInt(priceFrom) > parseInt(priceTo) &&
                                <div className="text-center"><em>Invalid price range.</em></div>

                            }
                        </div>
                    }
                    {
                        categoryFilter.length > 0 &&
                        <div className="small bg-dark rounded-3 p-2 my-2 w-100  text-white overflow-auto">
                            <div className="mb-2"><u>Categories</u></div>
                            {categoryFilter.map((item, index) => {
                                return <span key={index}>{item}{index !== categoryFilter.length - 1 && ", "}</span>
                            })}
                        </div>
                    }
                    {
                        manufacturerFilter.length > 0 &&
                        <div className="small bg-danger rounded-3 p-2 my-2 w-100  text-white overflow-auto">
                            <div className="mb-2"><u>Manufacturers</u></div>
                            {manufacturerFilter.map((item, index) => {
                                return <span key={index}>{item}{index !== manufacturerFilter.length - 1 && ", "}</span>
                            })}
                        </div>
                    }
                    <div className="w-100 d-flex justify-content-between">
                        <Button
                            type="reset"
                            variant=""
                            className="p-0 text-muted"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="secondary"
                            className=""
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        {
                            productData.length > 0 &&
                            <Button
                                variant="dark"
                                className=""
                                onClick={handleApply}
                                disabled={((categoryFilter.length === 0 && manufacturerFilter.length === 0) && (!priceTo || !priceFrom)) || (parseInt(priceFrom) > parseInt(priceTo))}
                            >
                                Apply
                            </Button>
                        }
                    </div>
                </Offcanvas.Header>
            </div>
      </Offcanvas>
  </>;
}
