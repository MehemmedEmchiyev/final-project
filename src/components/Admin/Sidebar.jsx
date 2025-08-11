import { Link, useNavigate } from "react-router"
import { CgWebsite } from "react-icons/cg";

function Sidebar() {
  const menuItems = [
    { title: "Dashboard", href: '' },
    { title: "Products", href: 'products' },
    { title: "Genres", href: 'genres' },
    { title: "Features", href: 'features' },
    { title: "Events", href: 'events' },
    { title: "Types", href: 'types' },
    { title: "Platforms", href: 'platforms' },
    { title: "Subscription", href: 'subscription' },
    { title: "News", href: 'news' },
    { title: "Users", href: 'users' },
  ]
  const navigator = useNavigate()
  const signOut = () => {
    localStorage.clear()
    navigator('/adminlogin')
  }
  return (
    <>
      <div className="min-h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex flex-col justify-between h-max divide-y dark:divide-gray-300">
          <ul className=" pt-2 pb-4 space-y-1 text-sm">
            {
              menuItems.map((item, index) => <li key={index} className="dark:bg-gray-100 dark:text-gray-900">
                <Link to={item.href} className="flex items-center p-2 space-x-3 rounded-md">
                  <span>{item.title}</span>
                </Link>
              </li>)
            }

          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <Link rel="noopener noreferrer" to='/' className="flex items-center p-2 space-x-3 rounded-md">
                <CgWebsite />
                <span>Go To WebSite</span>
              </Link>
            </li>
            <li>
              <button onClick={signOut} className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar