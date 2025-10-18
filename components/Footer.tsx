import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-white">IOKHUAS TECH Co.</h2>
          <p className="text-sm mt-2">
            Power, Control Systems, Generator Servicing, ATS Panels, Synchronization Panels, Gas Turbines, and more.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase text-gray-400">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase text-gray-400">Contact</h3>
          <p className="mt-2 text-sm">
            Flat 4 Unity Estate, Olambe<br />
            Ogun State, Nigeria<br />
            <span className="block mt-1">📞 +234 803 351 1012</span>
            <span className="block">✉️ info@iotengineering.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} IOT ENGINEERING — All rights reserved.
      </div>
    </footer>
  );
}
