import type { User } from '../types'

type MainPageProps = {
  user: User
}

export function MainPage({ user }: MainPageProps) {
  return (
    <main className="auth-layout page-enter">
      <section className="auth-panel account-panel">
        <p className="eyebrow">Trang chính</p>
        <h1>Đây là trang chủ</h1>
        <p className="detail-copy">
          Trang này hiển thị cho cả <strong>Admin</strong> và <strong>Customer</strong> sau khi đăng
          nhập.
        </p>

        <div className="auth-user-card">
          <span>Tài khoản hiện tại</span>
          <strong>{user.name}</strong>
          <span>Email</span>
          <p>{user.email}</p>
          <span>Vai trò</span>
          <div className="role-pill">{user.role === 'admin' ? 'Admin' : 'Customer'}</div>
        </div>
      </section>
    </main>
  )
}
