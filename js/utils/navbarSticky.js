export const toggleSticky = (navbarRef, navBarOffSetTop) => {
    window.scrollY >= navBarOffSetTop ? navbarRef.classList.add("sticky") : navbarRef.classList.remove("sticky");
}