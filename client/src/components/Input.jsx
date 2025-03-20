// Importamos librerías externas.
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

// Función para definir 'autocomplete' basado en el tipo de input.
const getAutocomplete = (type, name) => {
    if (type === 'password') return 'current-password';
    if (name === 'username') return 'username';
    if (name === 'email') return 'email';
    if (name === 'phone') return 'tel';
    if (type === 'search') return 'off';
    return 'on';
};

// Inicializamos el componente Input.
const Input = ({
    label,
    name,
    type = 'text',
    refInput,
    editable = true,
    ...props
}) => {
    // Extraemos solo el método register de react-hook-form, ya que watch y setValue no son necesarios.
    const { register } = useFormContext();

    return (
        <div className="input-group">
            <label htmlFor={name}>{label}:</label>
            {type === 'textarea' ? (
                // Renderizamos un textarea si el tipo es 'textarea'.
                <textarea
                    id={name}
                    autoComplete={
                        props.autoComplete || getAutocomplete(type, name)
                    }
                    disabled={!editable}
                    {...register(name)}
                    {...props}
                ></textarea>
            ) : (
                // Renderizamos un input para otros tipos.
                <input
                    id={name}
                    type={type}
                    ref={type === 'file' ? refInput : undefined}
                    autoComplete={
                        props.autoComplete || getAutocomplete(type, name)
                    }
                    disabled={!editable}
                    {...register(name)}
                    {...props}
                />
            )}
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
    autoComplete: PropTypes.string,
};

export default Input;
