import { Route, Routes } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview'
import './shop.scss'
import Category from '../category/category'
// import { useEffect } from 'react'
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
// import { setCategoriesMap } from '../../store/category/category-action'
// import { useDispatch } from 'react-redux'

function Shop(){
//    const dispatch = useDispatch()
    
//    useEffect(()=>{
//         const getCategoriesMap = async () => {
//             const categoryMap = await getCategoriesAndDocuments('categories')
//             console.log('hello',categoryMap)
//         dispatch(setCategoriesMap(categoryMap))
//         }
//         getCategoriesMap()
//       },[])
   
  
    return(
        <>
           <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
           </Routes>
        </>
    )
}
export default Shop