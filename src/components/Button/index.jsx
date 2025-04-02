import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Button = ({
    type = "button",
    children,
    icon,
    to = "",
    href = "",
    className,
    primary = false,
    secondary = false,
    rounded = false,
    disabled,
    onClick,
    loading = false,
}) => {
    let Component = type;
    const passProps = {};

    if (to) {
        Component = Link;
        passProps.to = to;
    }

    if (href) {
        Component = "a";
        passProps.href = href;
    }

    const handleClick = () => {
        if (disabled || loading) {
            return;
        }
        if (typeof onClick === "function") {
            onClick();
        }
    };

    return (
        <Component
            {...passProps}
            className={clsx(styles.wrappe, className, {
                [styles.primary]: primary,
                [styles.secondary]: secondary,
                [styles.rounded]: rounded,
                [styles.disabled]: disabled || loading,
            })}
            onClick={handleClick}
        >
            {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
                <div>
                    {icon && <FontAwesomeIcon icon={icon} />}
                    <span>{children}</span>
                </div>
            )}
        </Component>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["div", "button"]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.object,
    primary: PropTypes.bool,
    loading: PropTypes.bool,
    secondary: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
