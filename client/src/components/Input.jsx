// Importamos librerías externas.
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

// Inicializamos el componente.
const Input = ({
    label,
    name,
    type = 'text',
    refInput,
    editable = true,
    ...props
}) => {
    // Extraemos métodos de `react-hook-form`.
    const { register, watch, setValue } = useFormContext();

    // Obtenemos el valor actual del input.
    const inputValue = watch(name) || '';

    // Función para definir `autocomplete` basado en el tipo de input.
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
                disabled={!editable}
                {...props}
            />
        </div>
    );
};

// Definimos las validaciones de las props.
Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    refInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    editable: PropTypes.bool,
};

export default Input;
