import Logo from '../assets/logo.png'

export default function LogoNav() {
  return (
    <nav className="flex justify-center py-4 bg-white shadow-sm">
      <img
        className="max-w-xs sm:max-w-sm md:max-w-md h-auto"
        src={Logo}
        alt="Logo de la página"
      />
    </nav>
  )
}
