
export default function FormInput({ type, label, required, error, name, placeholder, onChange, value }) {
    const className = error === '' ? '' : 'error-input';
    const errorSpanId = 'error'+name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <>
            <label htmlFor={name}>
                { label }
                {required && <span className='symbol-required'>*</span>}
            </label>

            <input type={type} placeholder={placeholder} className={className} name={name} id={name} value={value} onChange={onChange}/>
            <span id={errorSpanId} className='errors-text'>{error}</span>
        </>
    )
}