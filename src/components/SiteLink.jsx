export default function SiteLink({
  href,
  children,
  className,
  onClick,
  external = false,
  ...rest
}) {
  if (external) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
