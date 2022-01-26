import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import AppContext from '../AppContext';
import products from "../products.json";

export default function CheckboxFilterTempate(props) {
    const { id,
        label,
        data,
        showSidePanel,
    } = props;

    const {
        categoryFilter,
        setCategoryFilter,
        manufacturerFilter,
        setManufacturerFilter,
        reset,
        setReset,
        setAllExceptCategory,
        setAllExceptManufacturer,
        allExceptCategory,
        allExceptManufacturer
    } = useContext(AppContext);
    const [checked, setChecked] = useState(false);
    
    const handleClick = (value, checked) => {
        if (data === "category") {
            const newArray = [...categoryFilter];
            const index = newArray.findIndex(item => label === item);
            if (allExceptCategory) {
                if (checked) {
                    newArray.splice(index, 1);
                    setCategoryFilter(newArray);
                } else {
                    newArray.push(value);
                    setCategoryFilter(newArray);
                }
            } else {
                if (checked) {
                    newArray.push(value);
                    setCategoryFilter(newArray);
                } else {
                    newArray.splice(index, 1);
                    setCategoryFilter(newArray);
                }
            }
        } else if (data === "manufacturer") {
            const newArray = [...manufacturerFilter];
            const index = newArray.findIndex(item => label === item);
            if (allExceptManufacturer) {
                if (checked) {
                    newArray.splice(index, 1);
                    setManufacturerFilter(newArray);
                } else {
                    newArray.push(value);
                    setManufacturerFilter(newArray);
                }
            } else {
                if (checked) {
                    newArray.push(value);
                    setManufacturerFilter(newArray);
                } else {
                    newArray.splice(index, 1);
                    setManufacturerFilter(newArray);
                }
            }
        } else if (data === "except-category") {
            const uniqueCategories = [...new Set(products.map(product => product.category))]
            const newArray = uniqueCategories;
            if (checked) {
                setCategoryFilter(newArray);
            } else {
                setCategoryFilter([]);
            }
            setAllExceptCategory(checked);
        } else if (data === "except-manufacturer") {
            const uniqueManufacturers = [...new Set(products.map(product => product.manufacturer))];
            const newArray = uniqueManufacturers;
            if (checked) {
                setManufacturerFilter(newArray);
            } else {
                setManufacturerFilter([]);
            }
            setAllExceptManufacturer(checked);
        }
        setChecked(checked);
    }

    useEffect(() => {
        if ((data === "category" && categoryFilter.includes(label) && !allExceptCategory ) || ( data === "manufacturer" && manufacturerFilter.includes(label) && !allExceptManufacturer)) {
            setChecked(true);
        } else if ((data === "except-category" && allExceptCategory) || (data === "except-manufacturer" && allExceptManufacturer)) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [showSidePanel]);

    useEffect(() => {
        if (reset) {
            setChecked(false);
        }
    }, [reset]);

    useEffect(() => {
        if (checked) {
            setReset(false);
        }
    }, [checked])

    useEffect(() => {
        if (data === "category") {
            setChecked(false);
        }
    }, [allExceptCategory])
    useEffect(() => {
        if (data === "manufacturer") {
            setChecked(false);
        }
    }, [allExceptManufacturer])


  return <>
    <Form.Check onChange={e => handleClick(e.target.value, e.target.checked)} checked={checked} value={label} label={label} id={id} />
  </>;
}
