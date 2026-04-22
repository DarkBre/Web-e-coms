export function AdminPage() {
  return (
    <main className="auth-layout page-enter">
      <section className="auth-panel account-panel">
        <p className="eyebrow">Khu vực quản trị</p>
        <h1>Đây là trang web dành cho admin</h1>
        <p className="detail-copy">
          Trang này chỉ cho phép tài khoản <strong>Admin</strong> truy cập. Tài khoản{' '}
          <strong>Customer</strong> sẽ không xem được trang này.
        </p>
      </section>
    </main>
  )
}
