import PropTypes from "prop-types";

const InputText = ({ label, type = "text", name, value, onChange, error }) => {
    return (
        <div style={{ marginBottom: "15px" }}>
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        border: error ? "1px solid red" : "1px solid #ccc",
                    }}
                    required
                />
                {error && <p style={{ color: "red" }}> {error}</p>}
            </label>
        </div>
    );
};

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default InputText;
