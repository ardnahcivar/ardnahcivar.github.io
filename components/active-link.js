import { useRouter } from 'next/router'

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const style = {
    borderBottom: router.asPath === href ? `1px solid black` : null,
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink