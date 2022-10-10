export const NavSection = ({children, className}) => {
    return(<section className={className ?? 'nav-section'}>{children}</section>);
};