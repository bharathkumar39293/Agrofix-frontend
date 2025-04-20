export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Agrofix</h3>
            <p className="text-sm">
              Your reliable partner for fresh bulk vegetable and fruit orders.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-accent transition-colors">Products</a></li>
              <li><a href="/orders" className="hover:text-accent transition-colors">Track Orders</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <address className="text-sm not-italic">
              <p>Email: support@agrofix.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Farm Road, Veggie City</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-600 text-center text-sm">
          &copy; {new Date().getFullYear()} Agrofix. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 