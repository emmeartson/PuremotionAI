import React from "react";

function Button({
  children,
  onClick,
  variant = "",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  href,
  target,
  rel,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#634910] text-white hover:bg-[#6b4e1f]",
    secondary: "bg-[#e9ddcf] text-black hover:bg-[#d6c9b8]",
    transparent: "bg-transparent text-black hover:bg-[#f0e9d2]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const classes = `${base} ${variantClass} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
