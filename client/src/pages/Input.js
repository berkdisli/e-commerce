const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.name}>{props.name}: </label>
            <input {...props} />
        </div>
    )
}

export default Input