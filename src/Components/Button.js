import React from 'react'

function Button({color, textColor, type, children,...rest }) {
    const buttonStyle = {
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '1rem',
        fontWeight: '500',
        height: 'auto',
        overflow: 'hidden',
        padding: '.6rem 0.8rem',
        textDecoration: 'none',
        textTransform: 'capitalize',
        backgroundColor: color,
        color: textColor
    };
    
  return (
    <button type={type === 'button' ? 'button' : 'submit'} {...rest} style={buttonStyle}> {children} </button>
  )
}

function SelectStatusButton({color, textColor, children, ...rest}) {
    const buttonStyle = {
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '1rem',
        fontWeight: '500',
        height: 'auto',
        overflow: 'hidden',
        padding: '.6rem 0.8rem',
        textDecoration: 'none',
        textTransform: 'capitalize',
        backgroundColor: color,
        color: textColor
    };
  return (
    <select style={buttonStyle} {...rest}> {children}   
    </select>
  )
}

export {SelectStatusButton};
export default Button;

