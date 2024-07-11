import React from 'react';
import {Helmet} from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
  
    return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
    </Helmet>
    )
}

Meta.defaultProps ={
    title: 'Welcome to ProShop',
    description: 'We Sell the best products',
    keywords: 'electronicss, by electronics, cheap electronics'
}

export default Meta