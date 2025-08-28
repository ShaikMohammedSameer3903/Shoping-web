export default function Footer() {
  return (
    <footer>
      <div className="container space-between">
        <div>© {new Date().getFullYear()} ShopHub</div>
        <div>Built with React + Vite • Ready for Spring Boot API</div>
      </div>
    </footer>
  )
}
