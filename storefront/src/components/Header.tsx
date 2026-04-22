import { Link, NavLink } from 'react-router-dom'
import type { User } from '../types'
import { roleLabels } from '../utils/auth'

type HeaderProps = {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">NT</span>
        <div>
          <strong>NovaTech</strong>
          <span>Trải nghiệm mua sắm thông minh</span>
        </div>
      </Link>

      <nav className="nav">
        <NavLink to="/">Trang chủ</NavLink>
        {user?.role === 'admin' ? <NavLink to="/admin">Quản trị</NavLink> : null}
        <NavLink to="/auth">{user ? user.name : 'Đăng nhập'}</NavLink>
      </nav>

      <div className="topbar-actions">
        <div className="mini-stat">
          <span>{user ? roleLabels[user.role] : 'Chưa đăng nhập'}</span>
          <strong>{user ? user.email.split('@')[0] : 'Guest'}</strong>
        </div>
        <Link className="cart-pill" to={user ? '/' : '/auth'}>
          {user ? 'Về trang chủ' : 'Đăng nhập'}
          <span>{user ? 'OK' : '!'}</span>
        </Link>
      </div>
    </header>
  )
}
