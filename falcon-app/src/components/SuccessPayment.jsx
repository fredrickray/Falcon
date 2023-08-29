import React from 'react';

const SuccessPayment = () => {
    const cardStyle = {
        borderRadius: '200px',
        height: '200px',
        width: '200px',
        background: '#F8FAF5',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    };


    const checkmarkStyle = {
        fontSize: '48px',
        color: '#4CAF50',
        marginBottom: '10px',
    };

    return (
        <div>
            <div style={cardStyle}>
                <i className="checkmark" style={checkmarkStyle}>✓</i>
                <h1>Success</h1>
                <p>We received your purchase request;<br />we'll be in touch shortly!</p>
            </div>
        </div>
    );
}

export default SuccessPayment;

