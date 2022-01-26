import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import AppContext from '../AppContext'
import data from '../products.json'

export default function DataTable (props) {
  const { productData, setProductData, setShowSidePanel } = props
  const columns = productData[0] && [..."#", ...Object.keys(productData[0])]
  const [sorted, setSorted] = useState(false)
  const [sortedBy, setSortedBy] = useState('')
  const [averagePrice, setAveragePrice] = useState('')
  const [quantity, setQantity] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [mostExpensiveProduct, setMostExpensiveProduct] = useState('')
  const [cheapestProduct, setCheapestProduct] = useState('')
  const originalProductData = data
  const {
    setReset,
    setCategoryFilter,
    setManufacturerFilter,
    setAllExceptCategory,
    setAllExceptManufacturer,
    setPriceFrom,
    setPriceTo
  } = useContext(AppContext)

  const usePathname = () => {
    const location = useLocation()
    return location.pathname
  }

  const pathname = usePathname();

  const handleSort = key => {
      if (key === "#") return;
    if (sorted && sortedBy === key) {
      setProductData(productData.reverse())
      setSorted(false)
    } else {
      const ascendingOrder = productData.sort((a, b) => {
        if (key === 'category') {
          let x = a[key].toLowerCase()
          let y = b[key].toLowerCase()
          if (x < y) return -1
          if (x > y) return 1
          return 0
        } else {
          let x = a[key]
          let y = b[key]
          if (x < y) return -1
          if (x > y) return 1
          return 0
        }
      })
      setProductData(ascendingOrder)
      setSorted(true)
      setSortedBy(key)
    }
  }

  const handleConvertHeading = string => {
    if (string === 'id') return 'ID'
    const result = string.replace(/([A-Z])/g, ' $1')
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
    return finalResult
  }

  const handleDataStats = () => {
    const quantity = productData.length
    const total = productData
      .map(product => {
        return product.price
      })
      .reduce((prev, curr) => {
        return prev + curr
      })
    const average = total / quantity
    const sortedByPrice = productData.slice().sort((a, b) => {
      let x = a.price
      let y = b.price
      if (x < y) return -1
      if (x > y) return 1
      return 0
    })
    const expensive = `${sortedByPrice[quantity - 1].manufacturer} ${
      sortedByPrice[quantity - 1].name
    } (id: ${sortedByPrice[quantity - 1].id})`
    const cheapest = `${sortedByPrice[0].manufacturer} ${sortedByPrice[0].name} (id: ${sortedByPrice[0].id})`
    setTotalCost(`₱${total.toLocaleString()}`)
    setQantity(quantity)
    setAveragePrice(`₱${average.toLocaleString()}`)
    setMostExpensiveProduct(expensive)
    setCheapestProduct(cheapest)
  }

  const handleReset = () => {
    setReset(true)
    setCategoryFilter([])
    setManufacturerFilter([])
    setProductData(originalProductData)
    setAllExceptCategory(false)
    setAllExceptManufacturer(false)
    setShowSidePanel(false)
    setPriceFrom('')
    setPriceTo('')
  }

  useEffect(() => {
    if (productData.length > 0) {
      handleDataStats()
    }
  }, [productData]);

  useEffect(() => {
    if (!pathname.includes("task-5")) {
        handleReset();
    }
  }, [pathname])

  return (
    <>
      {productData.length > 0 && (
        <div
          className='d-block text-start d-lg-flex justify-content-between mb-4 mx-auto'
          style={{ maxWidth: '1500px' }}
        >
          <div>Total: {totalCost}</div>
          <div>Average: {averagePrice}</div>
          <div>Quantity: {quantity}</div>
          <div>Cheapest: {cheapestProduct}</div>
          <div>Most expensive: {mostExpensiveProduct}</div>
        </div>
      )}
      <Table striped hover responsive cellPadding={0} cellSpacing={0}>
        <thead>
          {productData[0] &&
            columns.map((heading, index) => {
              return (
                <th
                  key={index}
                  onClick={() => handleSort(heading)}
                  className='noselect'
                >
                  {handleConvertHeading(heading)}
                  <span className='ms-2'>
                    {sortedBy === heading ? (sorted ? '▲' : '▼') : null}
                  </span>
                </th>
              )
            })}
        </thead>
        <tbody>
          {productData.map((row, i) => (
            <tr key={i}>
              {columns.map((columns, j) =>
                columns === 'price' ? (
                  <td key={j}>{`₱${row[columns].toLocaleString()}`}</td>
                ) : columns === 'productionDate' ? (
                  <td key={j}>
                    {row[columns].toLocaleString().slice(0, 10)}
                  </td>
                ) : columns === "#" ? (
                    <td key={j}>{i+1}</td>
                ) : (
                  <td key={j}>{row[columns]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {productData.length === 0 && (
        <div className='text-center mt-5 py-5'>
          <div className='my-2'>Filter returned no results.</div>
          <Button variant='secondary' onClick={handleReset} className='my-2'>
            Reset
          </Button>
        </div>
      )}
    </>
  )
}
