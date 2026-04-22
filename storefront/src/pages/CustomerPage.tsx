import { Link } from 'react-router-dom'
import type { User } from '../types'

type CustomerPageProps = {
  user: User
}

export function CustomerPage({ user }: CustomerPageProps) {
  return (
    <main className="auth-layout page-enter">
      <section className="auth-panel account-panel">
        <p className="eyebrow">Trang khách hàng</p>
        <h1>Xin chào {user.name}</h1>
        <p className="detail-copy">
          Bạn đang đăng nhập với quyền <strong>Customer</strong>. Bạn có thể xem sản phẩm, giỏ
          hàng và thanh toán.
        </p>

        <div className="auth-user-card">
          <span>Họ tên</span>
          <strong>{user.name}</strong>
          <span>Email</span>
          <p>{user.email}</p>
          <span>Vai trò</span>
          <div className="role-pill">Khách hàng</div>
        </div>

        <div className="account-actions">
          <Link className="primary-link" to="/">
            Vào trang sản phẩm
          </Link>
          <Link className="primary-link" to="/cart">
            Vào giỏ hàng
          </Link>
        </div>
      </section>
    </main>
  )
}
