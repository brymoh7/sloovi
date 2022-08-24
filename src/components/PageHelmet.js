import React from 'react';
import Helmet from 'react-helmet';

const PageHelmet = ({ title }) => {
    return (
        <Helmet>
            <meta name="description" content="sloovi" />
            <title>{title} | Sloovi---Helment</title>
        </Helmet>
    );
};

export default PageHelmet;
