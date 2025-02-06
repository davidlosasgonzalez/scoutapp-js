import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

const Input = ({
    label,
    name,
    type = 'text',
    refInput,
    editable = true,
    ...props
}) => {
    const { register, watch, setValue } = useFormContext();
    const inputValue = watch(name) || '';

    // Definir `autocomplete` basado en el tipo de input
    const getAutocomplete = (type, name) => {
        if (type === 'password') return 'current-password';
        if (name === 'username') return 'username';
        if (name === 'email') return 'email';
        if (name === 'phone') return 'tel';
        if (type === 'search') return 'off';
        return 'on';
    };

    return (
        <div className="input-group">
            <label htmlFor={name}>{label}:</label>
            <input
                {...register(name)}
                type={type}
                id={name}
                ref={type === 'file' ? refInput : undefined}
                value={inputValue}
                onChange={(e) => setValue(name, e.target.value)}
                autoComplete={getAutocomplete(type, name)}
                disabled={!editable} // Deshabilita el input si editable es false
                {...props}
            />
        </div>
    );
};

// Validación de props con PropTypes
Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    refInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    editable: PropTypes.bool, // Nueva prop para controlar si el input es editable
};

export default Input;
