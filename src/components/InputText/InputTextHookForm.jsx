import PropTypes from "prop-types";
const InputTextHookForm = ({ label, type = "text", name, error, ...rest }) => {
    return (
        <div style={{ marginBottom: "15px" }}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                {...rest}
                style={{
                    width: "100%",
                    padding: "8px",
                }}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

InputTextHookForm.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default InputTextHookForm;
