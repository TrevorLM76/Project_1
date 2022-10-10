export const Nav = ({children, className}) => {
    return (<nav className={className ?? 'navbar'}>{children}</nav>);
};