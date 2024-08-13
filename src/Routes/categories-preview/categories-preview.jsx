import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import './categories-preview.styles.scss';
import CategoryPreview from "../../component/category-preview/category-preview";
function CategoriesPreview(){
    const { categoriesMap }= useContext(CategoriesContext)
    return(
        <>
            <div className="category-preview-container">
                {
                 Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return(
                        <CategoryPreview key={title} title={title}
                        products={products}/>
                    )
                 })}
            </div>
        
        
        </>
    )
}
export default CategoriesPreview