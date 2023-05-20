import React, { useState, useEffect } from 'react'
import Category from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories } from '../../features/categorySlice';
import { getAllCategories } from '../../services/CategoryService';

const Categories = () => {
    const [categories, setCategories] = useState([{ _id: '' }])

    const fetchAllCategories = async () => {
        const result = await getAllCategories();
        setCategories(result.payload.category);
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return (
        <div className='categories'>
            {categories?.length > 0 && categories?.map((category) => <Category key={category?._id} category={category} />)}
        </div>
    );
};

export default Categories;