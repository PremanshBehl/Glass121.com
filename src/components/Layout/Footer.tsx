import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#11141e] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-poppins font-bold text-white flex items-center gap-2 mb-4">
              <span className="text-accent-cyan">Glass</span>121
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              The Amazon for glass and building materials. A sophisticated, niche platform connecting the $150B+ global glass industry.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-poppins font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Browse Catalog</Link></li>
              <li><Link href="/rates" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Daily Rates</Link></li>
              <li><Link href="/vendors" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Vendor Directory</Link></li>
              <li><Link href="/partners" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Service Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-poppins font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">AI Glass Matcher</Link></li>
              <li><Link href="/estimates" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Quote Estimator</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Track Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-poppins font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-accent-cyan transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Glass121 Technologies. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social links placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
}
