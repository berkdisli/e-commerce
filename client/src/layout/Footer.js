import React from 'react'

const Footer = () => {
    const creatorLink = [
        {
            name: 'Berk Disli',
            link: 'https://github.com/berkdisli',
        },
    ];

    return (
        <footer className='footer'>
            <div className='footer-center flex-centered'>
                All rights are reserved by: {creatorLink.map((creator) => (
                    <a href={creator.link} key={creator.name} target="_blank" rel="noopener noreferrer">{creator.name}</a>
                ))}
            </div>
        </footer>
    );
}


export default Footer