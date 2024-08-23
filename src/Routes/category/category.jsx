
import {   useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './category.styles.scss'
import ProductCard from '../../component/product-card/product-card.component'
import { CategoriesContext } from '../../context/categories.context'
// import { useSelector } from 'react-redux'
// import { selectCategoriesMap } from '../../store/category/category-selector'

function Category(){
    const {category} = useParams()
    console.log(category)
    const { categoriesMap } = useContext(CategoriesContext);
    console.log(categoriesMap)
    const [products,setProducts] = useState(categoriesMap[category] || [])
    console.log(products)

    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [category,categoriesMap])
    
 
    return(
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
            {
               products && products.map((product)=>
                     <ProductCard key={product.id} product={product}/>)
            }
        </div>
        {/* <div>still running</div> */}
        </>
    )
}
export default Category